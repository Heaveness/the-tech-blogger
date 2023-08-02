// Define an async function to handle the form submission event.
const editPostHandler = async (event) => {
  event.preventDefault();  // Prevent the default action.

  // Get the post ID, title, and content from the form.
  const postId = event.currentTarget.getAttribute('data-post-id');
  const title = document.querySelector('#post-title').value.trim();
  const content = document.querySelector('#post-content').value.trim();

  // If there is a title and content, make a PUT request to the server to update the post.
  if (title && content) {
    const response = await fetch(`/api/post/${postId}`, {
      method: 'PUT',
      body: JSON.stringify({
        title: title,
        content: content
      }),
      headers: {
        'Content-Type': 'application/json'
      }
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
document.querySelector('.edit-post-form').addEventListener('submit', editPostHandler);
