// Define an async function to handle the form submission event.
const commentFormHandler = async (event) => {
  event.preventDefault();  // Prevent the default action.

  // Get the comment content and post ID from the form.
  const content = document.querySelector('textarea[name="comment-body"]').value.trim();
  const postId = document.querySelector('input[name="post-id"]').value;

  // If there is comment content, make a POST request to the server to create the comment.
  if (content) {
    const response = await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({ postId, content }),
      headers: { 'Content-Type': 'application/json' },
    });

    // If the response is ok, reload the page. Otherwise, alert the user.
    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to comment');
    }
  }
};

// Add an event listener to the comment form's submit event.
document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);

// Get all textarea elements with the class 'autoresizing'.
const textingarea = document.querySelectorAll('.autoresizing');
// Get the element with the ID 'charCount'.
const charCount = document.querySelector('#charCount');

// For each textarea, add an event listener to the input event.
textingarea.forEach(textarea => {
  textarea.addEventListener('input', event => {
    textarea.style.height = 'auto';  // Reset the height.
    textarea.style.height = textarea.scrollHeight + 'px';  // Set the height to the scroll height.

    // Calculate the remaining characters and update the 'charCount' element's text.
    const remaining = 2000 - textarea.value.length;
    charCount.innerText = `${remaining} characters remaining`;
  });
});
