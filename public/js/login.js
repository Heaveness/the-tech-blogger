// Define an async function to handle the form submission event.
const loginFormHandler = async (event) => {
  event.preventDefault();  // Prevent the default action.

  // Get the identifier and password from the form.
  const identifier = document.querySelector('#identifier').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  // If there is an identifier and password, make a POST request to the server to log in.
  if (identifier && password) {
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({ identifier, password }),
      headers: { 'Content-Type': 'application/json' }
    });

    // If the response is ok, redirect to the dashboard. Otherwise, display the error message.
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      const jsonResponse = await response.json();
      const messageElement = document.querySelector('#error-message');
      messageElement.textContent = jsonResponse.message;
    }
  }
};

// Add an event listener to the form's submit event.
document.querySelector('#login-form').addEventListener('submit', loginFormHandler);


  