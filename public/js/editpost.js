const form = document.querySelector('.edit-post');

const logValue = async (event) => {
  event.preventDefault();
  const title = document.getElementById('post-title').value.trim();
  const description = document.getElementById('post-description').value.trim();
  const id = document.querySelector('.edit-post').dataset.id;

  const response = await fetch(`/api/post/edit/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ title, description }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
};

form.addEventListener('submit', logValue);
