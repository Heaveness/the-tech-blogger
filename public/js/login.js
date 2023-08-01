const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const identifier = document.querySelector('#identifier').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (identifier && password) {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ identifier, password }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  };
  
document.querySelector('#login-form').addEventListener('submit', loginFormHandler);


  