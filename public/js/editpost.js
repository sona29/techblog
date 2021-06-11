// const form = document.querySelector('.edit-blog');

const updateFormHandler = async (event) => {
  event.preventDefault();
  const title = document.getElementById('blog-name').value.trim();
  const description = document.getElementById('blog-desc').value.trim();
  const id = document.getElementById('blog_id').value.trim();

  const response = await fetch(`/api/blogs/edit/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ title, description }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/profile');
  } else {
    alert(response.statusText);
  }
};

document
  .querySelector('.update-blog-form')
  .addEventListener('submit', updateFormHandler);
