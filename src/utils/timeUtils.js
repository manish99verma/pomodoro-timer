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
  return result[0].focusTime ?? 0;
};

// Converts seconds in Hours with Decimal
export const convertSecondsToHrs = (timeInSecs) => {
  const timeInHours = timeInSecs / 3600;
  return Math.ceil(timeInHours * 100) / 100;
};

// Convert to hours and minutes
export const convertToHoursAndMinutes = (timeInSeconds) => {
  const timeInHours = timeInSeconds / 3600;
  const timeInMinutes = Math.floor(timeInSeconds / 60) % 60;
  return { hours: Math.floor(timeInHours), minutes: Math.floor(timeInMinutes) };
};
