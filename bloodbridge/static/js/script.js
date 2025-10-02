function togglePassword(id) {
  const input = document.getElementById(id);
  input.type = input.type === "password" ? "text" : "password";
}

document.addEventListener("DOMContentLoaded", () => {
  const loginModal = document.getElementById("loginModal");
  const signupModal = document.getElementById("signupModal");

  const openLogin = document.getElementById("openLogin");
  const closeLogin = document.getElementById("closeLogin");
  const openSignup = document.getElementById("openSignup");
  const closeSignup = document.getElementById("closeSignup");

  function resetForm(modal) {
    const forms = modal.querySelectorAll("form");
    
    forms.forEach(form => {
      form.reset();

      const inputs = form.querySelectorAll("input");
      inputs.forEach(input => {
        if (input.type !== "submit") input.value = "";
      });

      const errors = form.querySelectorAll(".errorlist");
      errors.forEach(e => e.remove());
    });
  }

  // Open / Close Modals
  openLogin.addEventListener("click", () => loginModal.style.display = "flex");

  closeLogin.addEventListener("click", () => {
    loginModal.style.display = "none";
    resetForm(loginModal);
  });

  openSignup.addEventListener("click", () => signupModal.style.display = "flex");
  
  closeSignup.addEventListener("click", () => {
    signupModal.style.display = "none";
    resetForm(signupModal);
  });

  // Click outside modal closes it
  window.addEventListener("click", (e) => {
    if (e.target === loginModal) {
      loginModal.style.display = "none";
      resetForm(loginModal);
    }
    if (e.target === signupModal) {
      signupModal.style.display = "none";
      resetForm(signupModal);
    }
  });

  // Open modal from server-side hint
  const openModal = document.getElementById("openModalHint")?.value;
  if (openModal === "login") loginModal.style.display = "flex";
  if (openModal === "signup") signupModal.style.display = "flex";
});
