class SignUpForm {
  constructor() {
    this.form = document.getElementById("signupForm");
    this.usernameInput = document.getElementById("username");
    this.emailInput = document.getElementById("email");
    this.passwordInput = document.getElementById("password");
    this.password2Input = document.getElementById("password2");

    this.form.addEventListener("submit", this.handleSubmit.bind(this));
  }

  async handleSubmit(e) {
    e.preventDefault();

    const username = this.usernameInput.value;
    const email = this.emailInput.value;
    const password = this.passwordInput.value;
    const password2 = this.password2Input.value;

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password, password2 }),
      });

      if (response.ok) {
        window.location.href = "/home";
      } else {
        const errorData = await response.json();
        console.error(errorData.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
}

export default SignUpForm;
