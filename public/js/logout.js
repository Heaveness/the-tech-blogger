// Define an async function to handle the logout process.
const logoutHandler = async () => {
  // Make a POST request to the server to log out.
  const response = await fetch('/api/user/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  });

  // If the response is ok, redirect to the homepage. Otherwise, alert the user.
  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
};

// Get the logout button and add an event listener to it if it exists.
const logoutButton = document.querySelector('#logout');
if (logoutButton) {
  logoutButton.addEventListener('click', logout);
}
