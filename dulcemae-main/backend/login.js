document.getElementById("loginForm").addEventListener("submit", async function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const mensajeLogin = document.getElementById("mensajeLogin");

  try {
    const response = await fetch("https://dulce-mae-api.onrender.com/api/users/login", {
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
      localStorage.setItem("nombreUsuario", data.nombre);
      mensajeLogin.innerText = "¡Inicio de sesión exitoso! Redirigiendo...";
      mensajeLogin.style.color = "green";
      // Redireccionar a la página de inicio
      setTimeout(() => {
      window.location.href = "inicio.html";
      }, 2000);
    } else {
      mensajeLogin.innerText = "Error al iniciar sesión: " + (data.message || "Intenta nuevamente.");
      mensajeLogin.style.color = "red";
    }
  } catch (error) {
    console.error("Error:", error);
    mensajeLogin.innerText = "Ocurrió un error al intentar iniciar sesión.";
    mensajeLogin.style.color = "red";
  }
});
// Aquí se maneja el evento de envío del formulario de inicio de sesión