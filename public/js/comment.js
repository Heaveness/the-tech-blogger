const commentFormHandler = async (event) => {
  event.preventDefault();
  const comment = document.querySelector('textarea[name="comment-body"]').value.trim();
  console.log(comment);

  if (comment) {
    const postIdElement = document.querySelector('input[name="post-id"]');
    if (postIdElement) {
      const postId = postIdElement.value;

      const response = await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({
          comment: comment,
          postId: postId,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        document.location.reload();
      } else {
        alert(response.statusText);
      }
    }
  }
};

const commentForm = document.querySelector('.comment-form');
if (commentForm) {
  commentForm.addEventListener('submit', commentFormHandler);
}
