function togglePassword(id) {
  const input = document.getElementById(id);
  input.type = input.type === "password" ? "text" : "password";
}

function clearModalForm(modal) {
  // Select all input fields inside the modal
  const inputs = modal.querySelectorAll('input');

  inputs.forEach(input => {
    // Skip the CSRF token
    if (input.name === 'csrfmiddlewaretoken') return;

    // Clear text/password/email inputs
    if (['text', 'email', 'password'].includes(input.type)) {
      input.value = '';
    }
  });
  
  // Remove custom error messages
  modal.querySelectorAll('.custom-error, .errorlist').forEach(e => e.remove());
}


document.addEventListener("DOMContentLoaded", () => {
  const loginModal = document.getElementById("loginModal");
  const signupModal = document.getElementById("signupModal");

  const openLogin = document.getElementById("openLogin");
  const closeLogin = document.getElementById("closeLogin");
  const openSignup = document.getElementById("openSignup");
  const closeSignup = document.getElementById("closeSignup");


  // Open / Close Modals
  openLogin.addEventListener("click", () => loginModal.classList.add("show"));

  closeLogin.addEventListener("click", () => {
    loginModal.classList.remove("show");
    clearModalForm(loginModal);
  });

  openSignup.addEventListener("click", () => signupModal.classList.add("show"));

  closeSignup.addEventListener("click", () => {
    signupModal.classList.remove("show");
    clearModalForm(signupModal);
  });
});

  // Click outside modal closes it
window.addEventListener("click", (e) => {
  if (e.target === loginModal) {
    loginModal.classList.remove("show");
    clearModalForm(loginModal);
  }
  if (e.target === signupModal) {
    signupModal.classList.remove("show");
    clearModalForm(signupModal);
  }
});

  // Open modal from server-side hint
const openModal = document.getElementById("openModalHint")?.value;
if (openModal === "login") loginModal.classList.add("show");
if (openModal === "register") signupModal.classList.add("show");
