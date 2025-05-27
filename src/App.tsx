import { invoke } from "@tauri-apps/api/core";
import type React from "react";
import { useEffect, useState } from "react";
import ChatViewer from "./components/chat-viewer";
import SettingsPanel from "./components/settings-pannel";

import { parseChannelUrl } from "./utils/twitch-utils";

function App() {
  const [channel, setChannel] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [alwaysOnTop, setAlwaysOnTop] = useState<boolean>(false);
  const [transparent, setTransparent] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSettingsCollapsed, setIsSettingsCollapsed] = useState<boolean>(false);

  // Load saved state on startup
  useEffect(() => {
    const loadSavedState = async () => {
      try {
        setIsLoading(true);
        const savedState = await invoke("load_state");

        if (savedState) {
          const typedState = savedState as {
            channel: string;
            always_on_top: boolean;
            transparent: boolean;
          };

          if (typedState.channel) {
            setChannel(typedState.channel);
            setInputValue(typedState.channel);
          }

          if (typedState.always_on_top) {
            setAlwaysOnTop(typedState.always_on_top);
            await invoke("set_always_on_top", { alwaysOnTop: typedState.always_on_top });
          }

          if (typedState.transparent !== undefined) {
            setTransparent(typedState.transparent);
            await invoke("set_transparency", { transparent: typedState.transparent });
          }
        }

        // Load collapsed state from localStorage
        const savedCollapsedState = localStorage.getItem("settingsCollapsed");
        if (savedCollapsedState !== null) {
          setIsSettingsCollapsed(JSON.parse(savedCollapsedState));
        }
      } catch (err) {
        console.error("Error loading saved state:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadSavedState();
  }, []);

  // Update window.appState for Rust to access
  useEffect(() => {
    if (typeof window !== "undefined") {
      (
        window as typeof window & {
          appState: { channel: string; alwaysOnTop: boolean; transparent: boolean };
        }
      ).appState = {
        channel,
        alwaysOnTop,
        transparent,
      };
    }
  }, [channel, alwaysOnTop, transparent]);

  const handleChannelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const parsedChannel = parseChannelUrl(inputValue);
      if (parsedChannel) {
        setChannel(parsedChannel);
        invoke("save_state", {
          channel: parsedChannel,
          alwaysOnTop: alwaysOnTop,
          transparent: transparent,
        });
      } else {
        setError("Invalid Twitch URL or channel name");
      }
    } catch (err) {
      setError("Error processing the URL");
      console.error(err);
    }
  };

  const handleAlwaysOnTopChange = async (checked: boolean) => {
    setAlwaysOnTop(checked);
    try {
      await invoke("set_always_on_top", { alwaysOnTop: checked });
      invoke("save_state", {
        channel: channel,
        alwaysOnTop: checked,
        transparent: transparent,
      });
    } catch (err) {
      console.error("Failed to set always-on-top:", err);
    }
  };

  const handleTransparencyChange = async (checked: boolean) => {
    setTransparent(checked);
    try {
      await invoke("set_transparency", { transparent: checked });
      invoke("save_state", {
        channel: channel,
        alwaysOnTop: alwaysOnTop,
        transparent: checked,
      });
    } catch (err) {
      console.error("Failed to set transparency:", err);
    }
  };

  const toggleSettingsCollapsed = () => {
    const newCollapsedState = !isSettingsCollapsed;
    setIsSettingsCollapsed(newCollapsedState);
    localStorage.setItem("settingsCollapsed", JSON.stringify(newCollapsedState));
  };

  return (
    <div
      className={`flex flex-col h-screen text-white ${transparent ? "bg-white/10 transparent-mode" : "bg-neutral-900"}`}
    >
      <SettingsPanel
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleChannelSubmit={handleChannelSubmit}
        alwaysOnTop={alwaysOnTop}
        setAlwaysOnTop={handleAlwaysOnTopChange}
        transparent={transparent}
        setTransparent={handleTransparencyChange}
        error={error}
        isCollapsed={isSettingsCollapsed}
        onToggleCollapse={toggleSettingsCollapsed}
      />

      <div className="flex-grow overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500" />
          </div>
        ) : (
          <ChatViewer channel={channel} transparent={transparent} />
        )}
      </div>
    </div>
  );
}

export default App;
