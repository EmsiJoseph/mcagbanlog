document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    
    // Form validation and submission
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      
      // Basic validation
      if (!validateForm(data)) {
        return;
      }
      
      // Get the website input
      let websiteInput = document.getElementById('website');
      let websiteValue = websiteInput.value.trim();
      
      // Add https:// if no protocol is specified
      if (!/^https?:\/\//i.test(websiteValue)) {
          websiteValue = 'https://' + websiteValue;
      }
      
      // Update the input value with the formatted URL
      websiteInput.value = websiteValue;
      
      // Show loading state
      const submitButton = form.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.textContent = 'Sending...';
      submitButton.disabled = true;
      
      try {
        // Simulate form submission (replace with actual API endpoint)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success message
        showMessage('Thank you! I\'ll get back to you soon.', 'success');

        form.reset();
        
      } catch (error) {
        // Show error message
        showMessage('Something went wrong. Please try again.', 'error');
        
      } finally {
        // Reset button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      }
    });
    
    // Optional: Add input event listener for real-time validation
    document.getElementById('website').addEventListener('input', function(e) {
      let value = e.target.value.trim();
      
      // Remove any protocol and www. for validation
      value = value.replace(/^https?:\/\//i, '').replace(/^www\./i, '');
      
      // Update input if needed
      if (value !== e.target.value) {
          e.target.value = value;
      }
    });
    
    // Form validation helper
    function validateForm(data) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const urlRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      
      if (!data.name.trim()) {
        showMessage('Please enter your name', 'error');
        return false;
      }
      
      if (!emailRegex.test(data.email)) {
        showMessage('Please enter a valid email address', 'error');
        return false;
      }
      
      if (!data.challenges) {
        showMessage('Please select your business challenges', 'error');
        return false;
      }
      
      if (!urlRegex.test(data.website)) {
        showMessage('Please enter a valid website URL', 'error');
        return false;
      }
      
      if (!data.privacy) {
        showMessage('Please accept the privacy policy', 'error');
        return false;
      }
      
      return true;
    }
    
    // Message display helper - replace the existing showMessage function
    function showMessage(message, type) {
        // Remove any existing message
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create and show new message
        const messageElement = document.createElement('div');
        messageElement.className = `form-message ${type}`;
        messageElement.textContent = message;
        
        // Insert before the first element in the form
        const form = document.getElementById('contactForm');
        form.insertAdjacentElement('afterbegin', messageElement);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            messageElement.remove();
        }, 5000);
    }
  });