// Define an async function to handle the form submission event.
const newPostHandler = async (event) => {
  event.preventDefault();  // Prevent the default action.

  // Get the title and content from the form.
  const title = document.querySelector('#title').value.trim();
  const content = document.querySelector('#content').value.trim();

  // If there is a title and content, make a POST request to the server to create a new post.
  if (title && content) {
    const response = await fetch('/api/post', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
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
document.querySelector('#new-post-form').addEventListener('submit', newPostHandler);
