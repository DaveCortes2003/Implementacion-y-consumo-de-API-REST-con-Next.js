Esto es un proyecto de prueba de usos de API REST con un frontend basado en next.js

## Ejecutar sin Docker

Primero, instalar el proyecto:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Segundo, para ejecutar el proyecto sin Docker:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Abre [http://localhost:3000](http://localhost:3000) con tu navegador para ver el resultado.

## Ejecutar con Docker

Para ejecutar el proyecto en un contenedor con docker previamente instalado, puedes ejecutar estos comandos:

```bash
docker build -t test-docker-app . # para la creacion de la imagen del contenedor

docker run -p 3000:3000 test-docker-app # para correr el docker
```

Abre [http://localhost:3000](http://localhost:3000) con tu navegador para ver el resultado.

## Decisiones tecnicas tomadas

En el desarrollo del proyecto se tomo la decision de utilizar algunas librerias para ciertas funcionalidades como por ejemplo para los mensajes de exito al momneto de hacer algun cambio en la publicaciones.

## Mejores Propuestas

Quizas como mejores propuestas podrian estar:

- Usar una base de datos para el manejo adecuado de los datos ya que son por defecto.
- Usar una gestion de usuarios para que cada quien tenga acceso a cada uno de sus publicaciones.
- Agregar un login.
- Crear un CRUD completo para dichas publicaciones.