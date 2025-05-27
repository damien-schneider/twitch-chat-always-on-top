import { useMemo } from "react";

const ChatViewer = ({
  channel,
  transparent = false,
}: {
  channel: string;
  transparent?: boolean;
}) => {
  const chatUrl = useMemo(() => {
    if (!channel) {
      return null;
    }

    // Sanitize the channel name for the iframe URL
    const sanitizedChannel = channel.replace(/\W/g, "");
    const baseUrl = `https://www.twitch.tv/embed/${sanitizedChannel}/chat?parent=localhost&darkpopout`;

    // Add transparency-related parameters when in transparent mode
    if (transparent) {
      return `${baseUrl}&transparent=true`;
    }

    return baseUrl;
  }, [channel, transparent]);

  if (!channel) {
    return (
      <div
        className={`flex items-center justify-center h-full text-neutral-400 p-4 text-center ${
          transparent ? "bg-transparent" : "bg-neutral-800"
        }`}
      >
        <div>
          <p className="mb-2">Enter a Twitch channel to view its chat</p>
          <p className="text-sm opacity-80">The chat will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`h-full ${transparent ? "bg-transparent transparent-mode" : ""}`}>
      {chatUrl ? (
        <iframe
          src={chatUrl}
          className={`w-full h-full border-0 ${transparent ? "bg-transparent transparent-iframe" : ""}`}
          title={`${channel} Twitch Chat`}
          style={transparent ? { background: "transparent" } : {}}
        />
      ) : (
        <div
          className={`flex items-center justify-center h-full text-red-400 ${
            transparent ? "bg-transparent" : "bg-neutral-800"
          }`}
        >
          Invalid channel name
        </div>
      )}
    </div>
  );
};

export default ChatViewer;
