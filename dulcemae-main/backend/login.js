document.getElementById("loginForm").addEventListener("submit", async function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("https://dulce-mae-api.onrender.com/api/usuarios/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      // Guardar el token en localStorage
      localStorage.setItem("token", data.token);

      // Redireccionar a la página de inicio o dashboard
      window.location.href = "inicio.html"; // Puedes cambiar esto por tu página principal
    } else {
      alert("Error al iniciar sesión: " + data.message);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Ocurrió un error al intentar iniciar sesión.");
  }
});
