const deletePostHandler = async (event) => {
  event.preventDefault();
  const postId = event.target.getAttribute('data-post-id');

  const response = await fetch(`/api/posts/${postId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
};

document.querySelectorAll('.delete-post').forEach((button) => {
  button.addEventListener('click', deletePostHandler);
});
