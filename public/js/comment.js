const commentFormHandler = async (event) => {
  event.preventDefault();

  const content = document.querySelector('textarea[name="comment-body"]').value.trim();
  const postId = document.querySelector('input[name="post-id"]').value;

  if (content) {
    const response = await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({ postId, content }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to comment');
    }
  }
};

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);

const textingarea = document.querySelectorAll('.autoresizing');
const charCount = document.querySelector('#charCount');

textingarea.forEach(textarea => {
  textarea.addEventListener('input', event => {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';

    const remaining = 2000 - textarea.value.length;
    charCount.innerText = `${remaining} characters remaining`;
  });
});