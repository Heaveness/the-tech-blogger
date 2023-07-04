const editPostHandler = async (event) => {
    event.preventDefault();
  
    const postId = event.target.getAttribute('data-id');
    const title = document.querySelector(`#title-${postId}`).value.trim();
    const content = document.querySelector(`#content-${postId}`).value.trim();
  
    if (title && content) {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({
          title: title,
          content: content
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  document.querySelectorAll('.edit-post').forEach((button) => {
    button.addEventListener('click', editPostHandler);
  });
  