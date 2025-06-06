document.getElementById("loginForm").addEventListener("submit", async function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const mensajeLogin = document.getElementById("mensajeLogin");

  // Validar que los campos no estén vacíos
  if (!email || !password) {
    mensajeLogin.innerText = "⚠️ Por favor, completa todos los campos.";
    mensajeLogin.style.color = "red";
    return;
  }

  // Validar formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    mensajeLogin.innerText = "⚠️ Por favor, ingresa un email válido.";
    mensajeLogin.style.color = "red";
    return;
  }

  try {
    // Mostrar mensaje de carga
    mensajeLogin.innerText = "🔄 Iniciando sesión...";
    mensajeLogin.style.color = "blue";

    const response = await fetch("https://dulce-mae-api.onrender.com/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Login exitoso
      mensajeLogin.innerText = "✅ ¡Inicio de sesión exitoso! Redirigiendo...";
      mensajeLogin.style.color = "green";

      // Guardar el token en localStorage
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      // Guardar información del usuario
      if (data.nombre) {
        localStorage.setItem("nombreUsuario", data.nombre);
      }

      // Guardar información completa del usuario (opcional, por si necesitas más datos)
      if (data.user) {
        localStorage.setItem("usuario", JSON.stringify({
          id: data.user.id || data.user._id,
          nombre: data.user.nombre || data.nombre,
          email: data.user.email || email
        }));
      }

      // Limpiar formulario
      document.getElementById("loginForm").reset();

      // Redirigir a la página de inicio después de 2 segundos (mantengo tu tiempo original)
      setTimeout(() => {
        window.location.href = "index.html"; // Cambiado de "inicio.html" a "index.html"
      }, 2000);

    } else {
      // Error de credenciales
      mensajeLogin.innerText = `⚠️ ${data.message || 'Credenciales incorrectas. Verifica tu email y contraseña.'}`;
      mensajeLogin.style.color = "red";
    }

  } catch (error) {
    console.error("Error en el login:", error);
    mensajeLogin.innerText = "⚠️ Error de conexión. Verifica tu internet e intenta nuevamente.";
    mensajeLogin.style.color = "red";
  }
});

// Aquí se maneja el evento de envío del formulario de inicio de sesión