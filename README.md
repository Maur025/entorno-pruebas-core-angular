# KernoBI - TESORERIA (App)

## CONTENIDO

- Prerrequisitos
- Configuración Inicial
- Instalación
- Estructura del Proyecto

## PRERREQUISITOS

1. Node 15+
2. Angular Cli 15+

## CONFIGURACIÓN INICIAL

Este proyecto utiliza un repositorio Nexus privado para gestionar las dependencias. Para acceder a este repositorio y autenticarte, cada desarrollador debe realizar el login en npm con sus credenciales personalizadas.

**Sigue los siguientes pasos para configurar tu entorno:**

### 1. Verificar tu archivo `.npmrc`

Antes de proceder con el login, verifica si ya tienes configurado tu token de autenticación en el archivo `.npmrc` de tu directorio de usuario.

- **Linux/MacOS**: Revisa el archivo en `~/.npmrc`.
- **Windows**: Revisa el archivo en `C:\Users\<tu_usuario>\.npmrc`.
- **bash**: `npm config list`

Si ya has iniciado sesión previamente, tu archivo `.npmrc` debería contener una línea similar a esta:

`//registry.kernotec.com/repository/npm-public/:_authToken=tu_token_de_autenticacion`

(Si ya has iniciado sesión y el archivo .npmrc está configurado correctamente, no es necesario seguir el paso 2.)

### 2. Iniciar sesión en Nexus con npm

Para acceder al repositorio de Nexus y descargar las dependencias, debes iniciar sesión en el registro privado. Ejecuta el siguiente comando en tu terminal:

```bash
npm login --registry=https://registry.kernotec.com/repository/npm-public
```

Sigue las instrucciones e ingresa las siguientes credenciales cuando se te solicite:

Username: Tu nombre de usuario de Nexus.
Password: Tu contraseña de Nexus.

Después de ejecutar npm login, el archivo .npmrc debería configurarse automáticamente con tu token de autenticación.

## INSTALACIÓN

### Instalar dependencias

Una vez que hayas configurado tu archivo .npmrc local, puedes proceder a instalar las dependencias del proyecto ejecutando: `npm install`
Esto descargará todas las dependencias necesarias desde el repositorio de Nexus.

### Development server

Run `ng serve` for a dev server.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## ESTRUCTURA DEL PROYECTO

### Plantilla: Skote -  Angular 13 Responsive Admin Dashboard Template

# Clone Proyect 
```
git clone git@github.com:KernoTec/kernobi_tesoreria_ui.git --recursive
```

# Submodulo
```
git submodule add git@referencia
```

