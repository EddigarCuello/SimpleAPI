# Express API - Arquitectura y Flujo de Middlewares

Este proyecto es una guía práctica para comprender el funcionamiento de los **middlewares** en Express.js, el ciclo de vida de las peticiones HTTP (`req-res`) y el control de flujo utilizando la función callback `next()`.

---

## Arquitectura de Middlewares

Un middleware en Express es una función que intercepta la petición HTTP antes de que llegue a la ruta final. En este proyecto se implementan tres niveles de middlewares:

### 1. Logger Global de Peticiones
* **Tipo:** Global (`app.use`)
* **Propósito:** Registrar en la consola del servidor información en tiempo real sobre cada llamada entrante.
* **Propiedades utilizadas:**
  * `req.url`: Ruta desde la cual se realizó la petición.
  * `req.method`: Método HTTP empleado (`GET`, `POST`, etc.).

### 2. Parseador de JSON
* **Tipo:** Proporcionado por Express (`express.json()`)
* **Propósito:** Transformar el texto con formato JSON enviado en el cuerpo de la petición (`req.body`) en un objeto manipulable de JavaScript.

### 3. Validación de Acceso (`ValidarApiKey`)
* **Tipo:** Middleware de ruta específica
* **Propósito:** Actuar como un filtro de seguridad en endpoints protegidos.
* **Mecanismo:**
  * Lee el parámetro `key` desde la cadena de consulta de la URL (`req.query`).
  * Si el parámetro no coincide con el valor esperado (`12345`), interrumpe el flujo y responde inmediatamente con un estado `401 Unauthorized`.
  * Si es correcto, ejecuta `next()` para dar paso al controlador de la ruta.

---

## Instalación y Ejecución

1. **Clonar el repositorio:**
   ```bash
   git clone <URL_DE_TU_REPOSOTORIO>
   cd simple-api