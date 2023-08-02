// Define an async function to handle the form submission event.
const signupFormHandler = async (event) => {
  event.preventDefault();  // Prevent the default action.

  // Get the username, email, and password from the form.
  const username = document.querySelector('#username').value.trim();
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value.trim();

  // If there is a username, email, and password, make a POST request to the server to create a new user.
  if (username && email && password) {
    const response = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' }
    });

    // If the response is ok, redirect to the dashboard. Otherwise, alert the user.
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

// Add an event listener to the form's submit event.
document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);
