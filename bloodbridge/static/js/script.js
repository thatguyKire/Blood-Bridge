document.getElementById("openSignup").addEventListener("click", function() {
  document.getElementById("signupModal").style.display = "flex";
});

document.getElementById("closeModal").addEventListener("click", function() {
  document.getElementById("signupModal").style.display = "none";
});

// Close modal if you click outside of it
window.addEventListener("click", function(e) {
  if (e.target.id === "signupModal") {
    document.getElementById("signupModal").style.display = "none";
  }
});

function togglePassword(id) {
  const input = document.getElementById(id);
  if (input.type === "password") {
    input.type = "text";
  } else {
    input.type = "password";
  }
}

// Open Login Modal
document.querySelector(".btn-login").addEventListener("click", function() {
  document.getElementById("loginModal").style.display = "flex";
});

// Close Login Modal
document.getElementById("closeLogin").addEventListener("click", function() {
  document.getElementById("loginModal").style.display = "none";
});

// Close login modal if clicked outside
window.addEventListener("click", function(e) {
  if (e.target.id === "loginModal") {
    document.getElementById("loginModal").style.display = "none";
  }
});