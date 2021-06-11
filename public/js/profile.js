var updateLink = document.querySelectorAll('.update');

for (var i = 0; i < updateLink.length; i++) {
  updateLink[i].addEventListener('click', async (event) => {
    console.log('update button clicked');
    const id = event.target.getAttribute('data-update-id');
    console.log(id);
    const response = await fetch(`/blog/edit/${id}`, {
      method: 'GET',
    });

    console.log(response);

    if (response.ok) {
      console.log(response);
      window.location = response.url;
      // document.location.replace(`/blog/${id}`);
    } else {
      alert('Failed to update blog');
    }
  });
}

const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#blog-name').value.trim();

  const description = document.querySelector('#blog-desc').value.trim();

  if (title && description) {
    const response = await fetch(`/api/blogs`, {
      method: 'POST',
      body: JSON.stringify({ title, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create blog');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/blogs/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete blog');
    }
  }
};

const updateButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-update-id')) {
    const id = event.target.getAttribute('data-update-id');
    alert(id);

    const response = await fetch(`/api/blogs/${id}`, {
      method: 'PUT',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete blog');
    }
  }
};

document
  .querySelector('.new-project-form')
  .addEventListener('submit', newFormHandler);

// document.querySelector('.delete').addEventListener('click', delButtonHandler);

document
  .querySelector('.project-list')
  .addEventListener('click', delButtonHandler);

// document
//   .querySelector('.project-list')
//   .addEventListener('click', updateButtonHandler);
