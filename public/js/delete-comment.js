// Get all elements with the class 'delete-comment'.
const deleteButtons = document.querySelectorAll('.delete-comment');

// For each delete button, add an event listener to the click event.
deleteButtons.forEach((button) => {
  button.addEventListener('click', async (event) => {
    // Get the comment ID from the clicked button's data attribute.
    const id = event.target.getAttribute('data-comment-id');

    // Make a DELETE request to the server to delete the comment.
    const response = await fetch(`/api/comment/${id}`, {
      method: 'DELETE',
    });

    // If the response is ok, reload the page. Otherwise, alert the user.
    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to delete comment');
    }
  });
});
