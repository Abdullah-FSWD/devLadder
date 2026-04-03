/**
 * Returns today's date as YYYY-MM-DD string in UTC.
 * Used for test attempt daily rate-limiting.
 */
function todayDateString() {
  return new Date().toISOString().split("T")[0];
}

module.exports = { todayDateString };
