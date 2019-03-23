import Track from "./track";

// In-memory storage for prototype
export const usage: { [key: string]: string[] } = {};

export function setUsage(track: Track) {
  if (track.userId in usage) {
    usage[track.userId].push(track.timestamp);
  } else {
    usage[track.userId] = [track.timestamp];
  }
}

interface UsageReport {
  totalTime: string;
}

function sortDates(dates: string[]) {
  // The getTime here are to convince the typescript compiler
  // that we mean well and wish it no harm
  return dates.sort(
    (a: string, b: string) => new Date(b).getTime() - new Date(a).getTime()
  );
}

export function getUsage(userId: string): UsageReport {
  if (!usage[userId] || usage[userId].length === 1) {
    return {
      totalTime: "unknown"
    };
  }

  const sortedDates = sortDates(usage[userId]);
  const end = new Date(sortedDates[0]).getTime();
  const start = new Date(sortedDates[sortedDates.length - 1]).getTime();

  return {
    totalTime: `${(end - start) / 1000}` // seconds
  };
}
