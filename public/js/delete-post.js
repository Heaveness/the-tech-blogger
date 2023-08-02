// Define an async function to handle the delete button click event.
const deletePostHandler = async (event) => {
  event.preventDefault();  // Prevent the default action.

  // Get the post ID from the clicked button's data attribute.
  const postId = event.target.getAttribute('data-post-id');

  // Make a DELETE request to the server to delete the post.
  const response = await fetch(`/api/post/${postId}`, {
    method: 'DELETE',
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
};

// Add an event listener to the click event of each delete button.
document.querySelectorAll('.delete-post').forEach((button) => {
  button.addEventListener('click', deletePostHandler);
});
