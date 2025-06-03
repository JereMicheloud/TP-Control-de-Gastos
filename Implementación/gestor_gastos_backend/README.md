# README.md

# Gestor de Gastos Backend

Este proyecto es la parte backend de la aplicación Gestor de Gastos, que permite a los usuarios gestionar sus ingresos y gastos de manera eficiente.

## Estructura del Proyecto

- **src/app.js**: Punto de entrada de la aplicación backend. Inicializa la aplicación Express, configura middleware y conecta las rutas.
- **src/routes/transactions.js**: Define las rutas relacionadas con las transacciones. Maneja las solicitudes HTTP para crear, leer, actualizar y eliminar transacciones.
- **src/controllers/transactionsController.js**: Contiene la lógica de negocio relacionada con las transacciones, como crear una nueva transacción o recuperar transacciones existentes.
- **src/models/transaction.js**: Define el modelo de `Transaction`, que representa la estructura de una transacción en la base de datos.
- **src/db/index.js**: Configura la conexión a la base de datos y exporta la instancia de conexión.
- **package.json**: Archivo de configuración para npm que lista las dependencias, scripts y metadatos del proyecto.

## Instalación

1. Clona el repositorio:
   ```
   git clone <URL_DEL_REPOSITORIO>
   ```

2. Navega al directorio del proyecto:
   ```
   cd gestor_gastos_backend
   ```

3. Instala las dependencias:
   ```
   npm install
   ```

## Uso

Para iniciar el servidor, ejecuta el siguiente comando:
```
npm start
```

El servidor se ejecutará en `http://localhost:3000`.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir, por favor abre un issue o envía un pull request.

## Licencia

Este proyecto está bajo la Licencia MIT.