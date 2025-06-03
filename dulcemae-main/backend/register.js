document.getElementById("registerForm").addEventListener("submit", async function (event) {
  event.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const telefono = document.getElementById("telefono").value;
  const email = document.getElementById("correo").value;
  const password = document.getElementById("contrasena").value;
  const confirmar = document.getElementById("confirmar").value;

  const mensajeRegistro = document.getElementById("mensajeRegistro");

  if (password !== confirmar) {
    mensajeRegistro.innerText = "Las contraseñas no coinciden.";
    mensajeRegistro.style.color = "red";
    return;
  }

  try {
    const response = await fetch("https://dulce-mae-api.onrender.com/api/users/register", {

      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombre, telefono, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      mensajeRegistro.innerText = "¡Registro exitoso! Redirigiendo...";
      mensajeRegistro.style.color = "green";
      document.getElementById("registerForm").reset();

      // Redirigir después de 2 segundos
      setTimeout(() => {
      window.location.href = "inicio.html";
      }, 2000);
    } else {
      mensajeRegistro.innerText = data.message || "Error al registrarse.";
      mensajeRegistro.style.color = "red";
    }
  } catch (error) {
    console.error("Error:", error);
    mensajeRegistro.innerText = "Ocurrió un error en el registro.";
    mensajeRegistro.style.color = "red";
  }
});
