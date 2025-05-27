/**
 * Parses a Twitch URL or channel name into a standardized channel name
 *
 * @param input User input string (URL or channel name)
 * @returns Parsed channel name or null if invalid
 */
export const parseChannelUrl = (input: string): string | null => {
  if (!input || input.trim() === "") {
    return null;
  }

  // Remove whitespace
  const trimmed = input.trim();

  // If it's a direct channel name without URL
  if (!trimmed.includes("/") && !trimmed.includes(".")) {
    return trimmed.toLowerCase();
  }

  try {
    // Try to parse as URL
    let url: URL;

    // Add protocol if missing
    if (!trimmed.startsWith("http")) {
      url = new URL(`https://${trimmed}`);
    } else {
      url = new URL(trimmed);
    }

    // Check if it's a Twitch domain
    if (
      url.hostname === "twitch.tv" ||
      url.hostname === "www.twitch.tv" ||
      url.hostname.endsWith(".twitch.tv")
    ) {
      // Get the first path segment which should be the channel name
      const pathParts = url.pathname.split("/").filter(Boolean);
      if (pathParts.length > 0) {
        return pathParts[0].toLowerCase();
      }
    }

    return null;
  } catch (e) {
    console.error("Failed to parse Twitch URL:", e);
    // If URL parsing fails, assume it's a direct channel name
    if (!trimmed.includes(" ") && !trimmed.includes(".")) {
      return trimmed.toLowerCase();
    }
    return null;
  }
};
