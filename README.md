# 📊 GestorDeGastos - Sistema de Control de Gastos

Una aplicación web full-stack para gestionar gastos personales con autenticación, gráficos interactivos y almacenamiento en base de datos.

## 🚀 Características

- ✅ **Autenticación completa** (registro, login, JWT)
- ✅ **Dashboard interactivo** con gráficos de barras y torta
- ✅ **Gestión de transacciones** (agregar, eliminar, filtrar)
- ✅ **Gestión de categorías** personalizables
- ✅ **Base de datos en la nube** (Supabase PostgreSQL)
- ✅ **Diseño responsive** y moderno
- ✅ **Cálculos automáticos** de saldo y estadísticas

## 🛠️ Stack Tecnológico

### Backend
- **Node.js** + **Express.js**
- **PostgreSQL** (Supabase)
- **Sequelize** (ORM)
- **JWT** para autenticación
- **bcryptjs** para encriptación de contraseñas

### Frontend
- **React** + **Vite**
- **React Router** para navegación
- **Recharts** para gráficos
- **TailwindCSS** para estilos
- **Fetch API** para comunicación con backend

## 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior)
- **npm** (viene con Node.js)
- **Git** (opcional, para clonar el repositorio)

## 🔧 Instalación y Configuración

### 1. Clonar o descargar el proyecto

# Si tienes Git instalado
git clone https://github.com/JereMicheloud/TP-Control-de-Gastos.git
cd "TP Control de Gastos/Implementación"

# O simplemente descarga y extrae el ZIP

### 2. Instalar dependencias del proyecto raiz
# En la carpeta raíz del proyecto (Implementación)
npm install

### 3. Configurar el backend
# Navegar a la carpeta del backend
cd gestor_gastos_backend

# Instalar dependencias del backend
npm install

# Instalar dependencias adicionales si faltan
npm install bcryptjs jsonwebtoken

### 4. Configurar el Frontend
# Navegar a la carpeta del frontend (desde la raíz)
cd gestor_gastos_frontend

# Instalar dependencias del frontend
npm install

# Instalar Recharts para gráficos
npm install recharts

### 5. Configurar Tailwind CSS (si no está configurado)
# En la carpeta del frontend
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

### 6. Configuara Variables de entorno (en un archivo .env)
```
PG_HOST=aws-0-sa-east-1.pooler.supabase.com
PG_PORT=5432
PG_USER=postgres.hgipbefbrxfzlezmewtg
PG_PASSWORD=Jere060904_12
PG_DATABASE=postgres
PORT=3000
JWT_SECRET=algosecreto

DB_URL=postgresql://postgres.hgipbefbrxfzlezmewtg:Jere060904_12@aws-0-sa-east-1.pooler.supabase.com:5432/postgres
```

 ## 🚀 Ejecución del Proyecto
 ### Ejecutar todo junto (Recomendado)
 # Desde la carpeta raíz (Implementación)
npm run dev

```
Implementación/
├── README.md
├── package.json                 # Scripts del proyecto raíz
├── gestor_gastos_backend/       # Servidor Node.js
│   ├── src/
│   │   ├── app.js              # Aplicación principal
│   │   ├── db/                 # Configuración de BD
│   │   ├── models/             # Modelos Sequelize
│   │   ├── routes/             # Rutas de API
│   │   └── controllers/        # Lógica de negocio
│   ├── .env                    # Variables de entorno
│   └── package.json
└── gestor_gastos_frontend/      # Aplicación React
    ├── src/
    │   ├── components/         # Componentes reutilizables
    │   ├── pages/             # Páginas principales
    │   ├── styles/            # Estilos CSS
    │   └── data/              # Datos estáticos
    └── package.json
```


Aclaración: El despliegue de la página en algún host de internet no está dispnible aún, por el momento se debe utilizar en un host local; funcionan los endpoints definidos en la documentación, por lo que se pueden realizar correctamente el testing.
