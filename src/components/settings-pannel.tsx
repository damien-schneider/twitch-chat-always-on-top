import { ArrowRight, ChevronDown, Settings } from "lucide-react";
import type React from "react";

interface SettingsPanelProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  handleChannelSubmit: (e: React.FormEvent) => void;
  alwaysOnTop: boolean;
  setAlwaysOnTop: (checked: boolean) => void;
  transparent: boolean;
  setTransparent: (checked: boolean) => void;
  error: string | null;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  inputValue,
  setInputValue,
  handleChannelSubmit,
  alwaysOnTop,
  setAlwaysOnTop,
  transparent,
  setTransparent,
  error,
  isCollapsed,
  onToggleCollapse,
}) => {
  return (
    <div
      className={`overflow-hidden transition-all duration-500 ease-in-out ${
        isCollapsed ? "max-h-14" : "max-h-80"
      }`}
    >
      {/* Header with toggle button */}
      <div className="px-4 py-3 flex items-center justify-between" data-tauri-drag-region>
        <div className="flex items-center space-x-3">
          <div className={`transition-all duration-300 ${isCollapsed ? "scale-90" : "scale-100"}`}>
            <Settings className="h-5 w-5 text-white" />
          </div>
          <h2
            className={`text-lg font-medium transition-all duration-300 ${
              isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100 w-auto"
            }`}
          >
            Settings
          </h2>
        </div>
        <button
          type="button"
          onClick={onToggleCollapse}
          className="text-neutral-400 hover:text-white transition-all duration-200 hover:scale-110 hover:bg-neutral-700/50 rounded-full p-1"
          aria-label={isCollapsed ? "Expand settings" : "Collapse settings"}
        >
          <div
            className={`transition-transform duration-300 ${isCollapsed ? "rotate-0" : "rotate-180"}`}
          >
            <ChevronDown className="h-4 w-4" />
          </div>
        </button>
      </div>

      {/* Collapsible content with smooth animation */}
      <div
        className={`transition-all duration-500 ease-in-out ${
          isCollapsed
            ? "opacity-0 max-h-0 transform -translate-y-2"
            : "opacity-100 max-h-64 transform translate-y-0"
        }`}
      >
        <div className="px-4 pb-4">
          <div className="space-y-4">
            <form onSubmit={handleChannelSubmit} className="flex flex-col space-y-3">
              <div className="relative group">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter Twitch channel URL or name"
                  className="w-full px-3 py-2.5 bg-neutral-800 border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-white placeholder-neutral-400 group-hover:border-neutral-600"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-600 hover:bg-purple-700 rounded-lg p-2 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
                  aria-label="Load channel"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              {error && (
                <div className="animate-in slide-in-from-top duration-300">
                  <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
                    {error}
                  </p>
                </div>
              )}

              <p className="text-xs text-neutral-400 leading-relaxed">
                Enter a Twitch URL (twitch.tv/channel) or just the channel name
              </p>
            </form>

            <div className="flex items-center space-x-3 pt-2">
              <div className="relative">
                <input
                  type="checkbox"
                  id="always-on-top"
                  checked={alwaysOnTop}
                  onChange={(e) => setAlwaysOnTop(e.target.checked)}
                  className="h-4 w-4 rounded border-neutral-700 text-purple-600 focus:ring-purple-500 bg-neutral-800 transition-all duration-200 hover:scale-110"
                />
              </div>
              <label
                htmlFor="always-on-top"
                className="text-sm cursor-pointer hover:text-purple-300 transition-all duration-200 select-none"
              >
                Always on top
              </label>
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <div className="relative">
                <input
                  type="checkbox"
                  id="transparent"
                  checked={transparent}
                  onChange={(e) => setTransparent(e.target.checked)}
                  className="h-4 w-4 rounded border-neutral-700 text-purple-600 focus:ring-purple-500 bg-neutral-800 transition-all duration-200 hover:scale-110"
                />
              </div>
              <label
                htmlFor="transparent"
                className="text-sm cursor-pointer hover:text-purple-300 transition-all duration-200 select-none"
              >
                Transparent mode{" "}
                <span className="text-xs text-neutral-400">(work in progress)</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
