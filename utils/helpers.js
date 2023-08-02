// Define a helper function to format a date.
function formatDate(date) {
  return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
}

// Export the helper functions.
module.exports = {
  formatDate
};
