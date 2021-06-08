const newFormHandler = async (event) => {
  event.preventDefault();
  const blog_id = document.querySelector('#blogId').value.trim();
  const description = document.querySelector('#blog-comment').value.trim();

  if (blog_id && description) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ blog_id, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to post comment');
    }
  }
};

document
  .querySelector('.new-comment-form')
  .addEventListener('submit', newFormHandler);
