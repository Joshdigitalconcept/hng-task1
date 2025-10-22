document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();

  // Reset previous states
  const successMessage = document.getElementById('success-message');
  successMessage.classList.add('hidden');
  document.querySelectorAll('.error').forEach((el) => {
    el.classList.add('hidden');
    el.textContent = '';
  });
  document.querySelectorAll('input, textarea').forEach((el) => {
    el.removeAttribute('aria-invalid');
  });

  // Get form values
  const formData = {
    name: document.getElementById('contact-name').value.trim(),
    email: document.getElementById('contact-email').value.trim(),
    subject: document.getElementById('contact-subject').value.trim(),
    message: document.getElementById('contact-message').value.trim(),
  };

  // Validation
  let hasErrors = false;
  const errors = {};

  if (!formData.name) {
    errors.name = 'Full name is required.';
    hasErrors = true;
  }
  if (!formData.email) {
    errors.email = 'Email is required.';
    hasErrors = true;
  } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
    errors.email = 'Please enter a valid email address (e.g., name@example.com).';
    hasErrors = true;
  }
  if (!formData.subject) {
    errors.subject = 'Subject is required.';
    hasErrors = true;
  }
  if (!formData.message) {
    errors.message = 'Message is required.';
    hasErrors = true;
  } else if (formData.message.length < 10) {
    errors.message = 'Message must be at least 10 characters long.';
    hasErrors = true;
  }

  // Display errors
  if (hasErrors) {
    for (const field in errors) {
      const errorEl = document.getElementById(`contact-error-${field}`);
      const inputEl = document.getElementById(`contact-${field}`);
      errorEl.textContent = errors[field];
      errorEl.classList.remove('hidden');
      inputEl.setAttribute('aria-invalid', 'true');
    }
    return;
  }

  // Success: Show message and reset form
  successMessage.classList.remove('hidden');
  document.getElementById('contact-form').reset();
  // In a real app: fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) });
});

// Clear errors on input change
document.querySelectorAll('input, textarea').forEach((input) => {
  input.addEventListener('input', function () {
    const field = this.name;
    const errorEl = document.getElementById(`contact-error-${field}`);
    if (errorEl.textContent) {
      errorEl.textContent = '';
      errorEl.classList.add('hidden');
      this.removeAttribute('aria-invalid');
    }
  });
});