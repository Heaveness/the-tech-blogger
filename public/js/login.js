const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const identifier = document.querySelector('#identifier').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (identifier && password) {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({ identifier, password }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        const jsonResponse = await response.json();
        const messageElement = document.querySelector('#error-message');
        messageElement.textContent = jsonResponse.message;
      }
    }
  };
  
document.querySelector('#login-form').addEventListener('submit', loginFormHandler);



  