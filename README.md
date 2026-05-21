# BMR Group Web (Next.js)

## Mercado Pago

### 1) Obtener credenciales
- Ingresá al panel de desarrolladores de Mercado Pago: https://www.mercadopago.com.ar/developers/panel
- Copiá tu **Production Access Token** y cargalo como `MP_ACCESS_TOKEN`.
- `MP_PUBLIC_KEY` es opcional por ahora (útil si luego integrás Bricks).

### 2) Configurar variables en Vercel
1. Abrí tu proyecto en Vercel.
2. Andá a **Settings → Environment Variables**.
3. Cargá las variables con scope **Production** (y opcional Preview/Development):
   - `MP_ACCESS_TOKEN`
   - `MP_PUBLIC_KEY` (opcional)
   - `MP_WEBHOOK_SECRET` (opcional)
   - `NEXT_PUBLIC_SITE_URL` (ejemplo: `https://webpage-bmrgroup-danibentans-projects.vercel.app`)

### 3) Probar checkout/sandbox
- El backend `POST /api/checkout` devuelve `init_point` y `sandbox_init_point`.
- Para pruebas, usá el `sandbox_init_point` y cuentas de test de Mercado Pago.
- Podés crear usuarios de prueba y tarjetas de test desde el panel de developers.

### 4) Webhook
- Registrá el webhook en el panel de Mercado Pago apuntando a:
  - `https://TU_DOMINIO/api/mercadopago/webhook`
- El endpoint está preparado para recibir notificaciones de pagos, validar firma (si `MP_WEBHOOK_SECRET` está configurado) y loguear estado.


## Formularios de contacto (mail de consultas)

### 1) Crear remitente en Resend
- Creá una cuenta en https://resend.com y verificá tu dominio de empresa.
- Configurá SPF y DKIM en el DNS del dominio para mejorar entregabilidad.
- Definí un remitente válido (por ejemplo `web@tuempresa.com`).

### 2) Variables de entorno
Cargá estas variables en local (`.env.local`) y en Vercel (Production/Preview):
- `RESEND_API_KEY`
- `CONTACT_FROM_EMAIL` (remitente verificado en Resend)
- `CONTACT_TO_EMAIL` (mail de la empresa que recibe consultas)

### 3) Qué ya hace el proyecto
- `POST /api/contact` envía por email tanto el formulario de asesoramiento como el formulario corporativo.
- El backend valida campos requeridos según tipo de formulario.
- El `reply-to` se configura con el email del usuario para responder directo desde tu bandeja.

### 4) Probar
- Completá ambos formularios en la web y enviá.
- Verificá que llega el correo a `CONTACT_TO_EMAIL`.
- Revisá en Resend el estado de entrega (delivered/bounced).
