// Formats Date() in "10:43 PM" format
export const formatToClockTime = (time) => {
  const formatted = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return formatted;
};

// Format Date() in "YYYY-MM-DD" format
export const formatDateToISODate = (time) => {
  return time.toISOString().split("T")[0];
};

/**
 * Get focus time on any specific date
 *
 * @param {dailyFocusTime}  { day: "YYYY-MM-DD", focusTime: timeInSeconds } - The date value (should be a Date object).
 * @param {Date} day - The date value (should be a Date object).
 * @returns {timeInSeconds} Formatted date in YYYY-MM-DD.
 */
export const getFocusTimeOfOnDate = (dailyFocusTime, day) => {
  const todayInISO = formatDateToISODate(day);
  const result = dailyFocusTime?.filter((item) => item.day === todayInISO);
  if (!result || !result.length) return 0;
  return result[0].focusTime ?? 0;
};

// Converts seconds in Hours with Decimal
export const convertSecondsToHrs = (timeInSecs) => {
  const timeInHours = timeInSecs / 3600;
  return Math.ceil(timeInHours * 100) / 100;
};

// Convert to hours and minutes
export const convertToHoursMinutesSeconds = (timeInSeconds) => {
  const seconds = timeInSeconds % 60;
  const timeInHours = timeInSeconds / 3600;
  const timeInMinutes = Math.floor(timeInSeconds / 60) % 60;
  return {
    hours: Math.floor(timeInHours),
    minutes: Math.floor(timeInMinutes),
    seconds: seconds,
  };
};

// convert Seconds to 00:00:00
export const formatTime = (timeInSeconds) => {
  const hrs = String(Math.floor(timeInSeconds / 3600)).padStart(2, "0");
  const mins = String(Math.floor((timeInSeconds % 3600) / 60)).padStart(2, "0");
  const secs = String(timeInSeconds % 60).padStart(2, "0");

  if (timeInSeconds === 0) {
    return "00:00";
  }

  if (timeInSeconds < 60) return timeInSeconds;
  if (timeInSeconds < 3600) return mins + ":" + secs;
  return hrs + ":" + mins + ":" + secs;
};

// how much percent is a of b
export const getPercentage = (a, b) => {
  if (b === 0) return 100;
  return Math.floor((a * 100) / b);
};
