// for display view count as 1k, 1m, 1b
export const formatNumber = (num) => {
  if (num === null || num === undefined) return "";

  const number = Number(num);

  if (number < 1000) return number.toString();

  if (number < 1_000_000) {
    return (number / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  }

  if (number < 1_000_000_000) {
    return (
      (number / 1_000_000)
        .toFixed(2)
        .replace(/\.00$/, "")
        .replace(/(\.\d)0$/, "$1") + "m"
    );
  }

  return (
    (number / 1_000_000_000)
      .toFixed(2)
      .replace(/\.00$/, "")
      .replace(/(\.\d)0$/, "$1") + "b"
  );
};

//for display duration of video
export function formatYtDuration(isoDuration) {
  if (!isoDuration) return "0:00";

  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);

  const hours = parseInt(match?.[1] || 0);
  const minutes = parseInt(match?.[2] || 0);
  const seconds = parseInt(match?.[3] || 0);

  const pad = (num) => String(num).padStart(2, "0");

  if (hours > 0) {
    return `${hours}:${pad(minutes)}:${pad(seconds)}`;
  }

  return `${minutes}:${pad(seconds)}`;
}

// for display when video is uploaded
export function timeAgo(dateString) {
  if (!dateString) return "";

  const now = new Date();
  const published = new Date(dateString);

  const seconds = Math.floor((now - published) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
  ];

  for (let i of intervals) {
    const count = Math.floor(seconds / i.seconds);
    if (count >= 1) {
      return `${count} ${i.label}${count > 1 ? "s" : ""} ago`;
    }
  }

  return "Just now";
}
