const applicationForm = document.getElementById('application-form');

applicationForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());

  fetch('/api/apply', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data }),
  }).then((response) => {
    if (response.status === 200) {

    }
  });
});
