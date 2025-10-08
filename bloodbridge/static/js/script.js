document.addEventListener("DOMContentLoaded", () => {
  const loginModal = document.getElementById("loginModal");
  const signupModal = document.getElementById("signupModal");

  const openLogin = document.getElementById("openLogin");
  const closeLogin = document.getElementById("closeLogin");
  const openSignup = document.getElementById("openSignup");
  const closeSignup = document.getElementById("closeSignup");

  const goToLoginBtn = document.getElementById("goToLogin");
  const overlay = document.getElementById("successOverlay"); // overlay element
  const closeSuccess = document.getElementById("closeSuccess"); // × button

  const toggleIcons = document.querySelectorAll(".toggle");

  // Function to clear forms when modal closes
  function clearModalForm(modal) {
    const inputs = modal.querySelectorAll("input");
    inputs.forEach((input) => {
      if (input.name !== "csrfmiddlewaretoken") {
        input.value = "";
      }
    });
    modal.querySelectorAll(".custom-error, .errorlist").forEach((e) => e.remove());
  }

  // Toggle password visibility
  toggleIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
      const targetId = icon.getAttribute("data-target"); 
      const passwordInput = document.getElementById(targetId);

      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        icon.classList.remove("bi-eye");
        icon.classList.add("bi-eye-slash");
      } else {
        passwordInput.type = "password";
        icon.classList.remove("bi-eye-slash");
        icon.classList.add("bi-eye");
      }
    });
  });

  // Reset password visibility when modal closes
  function resetPasswordVisibility() {
    toggleIcons.forEach((icon) => {
      const targetId = icon.getAttribute("data-target");
      const passwordInput = document.getElementById(targetId);
      passwordInput.type = "password";
      icon.classList.remove("bi-eye-slash");
      icon.classList.add("bi-eye");
    });
  }
    
  // Open / Close modals
  openLogin?.addEventListener("click", () => loginModal.classList.add("show"));
  closeLogin?.addEventListener("click", () => {
    resetPasswordVisibility()
    loginModal.classList.remove("show");
    clearModalForm(loginModal);
  });

  openSignup?.addEventListener("click", () => signupModal.classList.add("show"));
  closeSignup?.addEventListener("click", () => {
    resetPasswordVisibility()
    signupModal.classList.remove("show");
    clearModalForm(signupModal);
  });

  // Click outside modal closes it
  window.addEventListener("click", (e) => {
    if (e.target === loginModal) {
      resetPasswordVisibility()
      loginModal.classList.remove("show");
      clearModalForm(loginModal);
    }
    if (e.target === signupModal) {
      resetPasswordVisibility()
      signupModal.classList.remove("show");
      clearModalForm(signupModal);
    }
  });

  // Open modal based on server-side hint
  const openModal = document.getElementById("openModalHint")?.value;
  if (openModal === "login") loginModal.classList.add("show");
  if (openModal === "register") signupModal.classList.add("show");

  // Handle "Go to Login" in success overlay
  if (goToLoginBtn) {
    goToLoginBtn.addEventListener("click", (e) => {
      e.preventDefault();

      if (overlay) {
        overlay.classList.add("fade-out");
        setTimeout(() => (overlay.style.display = "none"), 400);
      }

      loginModal.classList.add("show");
      clearModalForm(loginModal);
    });
  }

  //  Handle "×" Close button in success overlay
  if (closeSuccess) {
    closeSuccess.addEventListener("click", () => {
      if (overlay) {
        overlay.classList.add("fade-out");
        setTimeout(() => (overlay.style.display = "none"), 400);
      }
    });
  }
});
