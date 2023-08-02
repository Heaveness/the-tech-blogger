const deleteButtons = document.querySelectorAll('.delete-comment');

deleteButtons.forEach((button) => {
  button.addEventListener('click', async (event) => {
    const id = event.target.getAttribute('data-comment-id');

    const response = await fetch(`/api/comment/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to delete comment');
    }
  });
});