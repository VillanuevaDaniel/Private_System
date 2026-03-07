# Arquitectura del Sistema — Colección Entomológica (UG)

## 1. Diagrama de Componentes (C4 / UML)

```mermaid
C4Context
    title Sistema de Gestión de la Colección Entomológica — Vista General

    Person(usuario, "Usuario del Sistema", "Investigador, capturista, administrador u otro rol")

    System_Boundary(frontend, "Frontend — React + TypeScript (Vite)") {
        Component(login, "Página Login", "Login.tsx", "Formulario de autenticación")
        Component(app, "App & Enrutador", "App.tsx + react-router-dom", "Gestión de rutas y rutas protegidas")
        Component(authCtx, "AuthContext", "AuthContext.tsx", "Estado global de sesión (localStorage)")
        Component(themeCtx, "ThemeContext", "ThemeContext.tsx", "Preferencia de tema oscuro/claro")
        Component(sidebar, "Sidebar", "Sidebar.tsx", "Menú dinámico agrupado por área")
        Component(controlpanel, "Panel de Control", "Controlpanel.tsx", "Vista principal post-login")
        Component(apiSvc, "Servicio API", "api.ts", "Capa de comunicación HTTP con el backend")
    }

    System_Boundary(backend, "Backend — Node.js + Express") {
        Component(indexJs, "Servidor Express", "index.js", "Punto de entrada, CORS, rutas montadas")
        Component(rutasAuth, "Rutas Auth", "rutasAuth.js → POST /api/login", "Manejo del inicio de sesión")
        Component(rutasMod, "Rutas Módulo", "rutasModulo.js → GET /api/modules", "Consulta de módulos activos")
        Component(rutasUsr, "Rutas Usuario", "rutasUsuario.js → GET /api/users", "Consulta de usuarios")
        Component(authCtrl, "AuthControlador", "authControlador.js", "Lógica de autenticación y obtención de permisos")
        Component(modCtrl, "ModuloControlador", "moduloControlador.js", "Lógica de módulos por usuario")
        Component(usrCtrl, "UsuarioControlador", "usuarioControlador.js", "Lógica para listar usuarios")
        Component(usrModel, "UsuarioModelo", "usuarioModelo.js", "Queries: authenticate, getUserPermissions, getAllUsers")
        Component(modModel, "ModuloModelo", "moduloModelo.js", "Queries: getActiveModules por userId")
    }

    System_Boundary(db, "Base de Datos — MySQL (UG)") {
        ComponentDb(dbUser, "Tabla user", "", "idUser, name, last_name, email, password, status")
        ComponentDb(dbModule, "Tabla module", "", "idModule, name, description, area, status")
        ComponentDb(dbProfile, "Tabla profile", "", "idProfile, nickname, key_add/delete/edit/export")
        ComponentDb(dbPerms, "Tabla permissions", "", "idPermission, idUser, idModule, idProfile")
    }

    Rel(usuario, login, "Ingresa credenciales")
    Rel(login, authCtx, "Guarda sesión")
    Rel(login, apiSvc, "POST /api/login")
    Rel(app, authCtx, "Lee isAuthenticated")
    Rel(sidebar, apiSvc, "GET /api/modules?userId=X")
    Rel(apiSvc, indexJs, "HTTP / Proxy Vite")
    Rel(indexJs, rutasAuth, "Monta en /api/login")
    Rel(indexJs, rutasMod, "Monta en /api/modules")
    Rel(indexJs, rutasUsr, "Monta en /api/users")
    Rel(rutasAuth, authCtrl, "Invoca login()")
    Rel(rutasMod, modCtrl, "Invoca getModules()")
    Rel(rutasUsr, usrCtrl, "Invoca getUsers()")
    Rel(authCtrl, usrModel, "authenticate() + getUserPermissions()")
    Rel(modCtrl, modModel, "getActiveModules()")
    Rel(usrCtrl, usrModel, "getAllUsers()")
    Rel(usrModel, dbUser, "SELECT")
    Rel(usrModel, dbPerms, "JOIN permissions → profile")
    Rel(modModel, dbModule, "SELECT + JOIN permissions")
    Rel(modModel, dbPerms, "JOIN")
```

---

## 2. Diagrama de Clases — Capa de Datos (UML)

```mermaid
classDiagram
    class UsuarioModelo {
        +static authenticate(email, password) User|null
        +static getUserPermissions(userId) Permission[]
        +static getAllUsers() User[]
    }

    class ModuloModelo {
        +static getActiveModules(userId) Module[]
    }

    class AuthControlador {
        +static login(req, res) void
    }

    class ModuloControlador {
        +static getModules(req, res) void
    }

    class UsuarioControlador {
        +static getUsers(req, res) void
    }

    class User {
        +idUser : bigint
        +name : varchar
        +last_name : varchar
        +second_last_name : varchar
        +email : varchar
        +password : varchar
        +status : boolean
    }

    class Module {
        +idModule : bigint
        +name : varchar
        +description : varchar
        +area : varchar
        +status : boolean
    }

    class Profile {
        +idProfile : bigint
        +nickname : varchar
        +description : varchar
        +key_add : boolean
        +key_delete : boolean
        +key_edit : boolean
        +key_export : boolean
    }

    class Permissions {
        +idPermission : bigint
        +idUser : bigint
        +idModule : bigint
        +idProfile : bigint
    }

    AuthControlador --> UsuarioModelo : usa
    ModuloControlador --> ModuloModelo : usa
    UsuarioControlador --> UsuarioModelo : usa

    UsuarioModelo ..> User : consulta
    UsuarioModelo ..> Permissions : consulta
    UsuarioModelo ..> Profile : join
    ModuloModelo ..> Module : consulta
    ModuloModelo ..> Permissions : join

    Permissions "N" --> "1" User : idUser
    Permissions "N" --> "1" Module : idModule
    Permissions "N" --> "1" Profile : idProfile
```

---

## 3. Diagrama de Flujo — Autenticación y Carga de Módulos

```mermaid
sequenceDiagram
    actor U as Usuario
    participant L as Login.tsx
    participant AC as AuthContext
    participant API as Express /api/login
    participant AM as AuthControlador
    participant UM as UsuarioModelo
    participant DB as MySQL

    U->>L: Ingresa email y password
    L->>API: POST /api/login { email, password }
    API->>AM: login(req, res)
    AM->>UM: authenticate(email, password)
    UM->>DB: SELECT * FROM user WHERE email=? AND password=?
    DB-->>UM: Fila del usuario (o vacío)
    UM-->>AM: user | null
    alt Credenciales inválidas
        AM-->>API: 401 { error: "Credenciales inválidas" }
        API-->>L: Error
        L-->>U: Mensaje de error
    else Credenciales válidas
        AM->>UM: getUserPermissions(userId)
        UM->>DB: SELECT nickname, idProfile FROM permissions JOIN profile WHERE idUser=?
        DB-->>UM: Permisos del usuario
        UM-->>AM: permissions[]
        AM-->>API: 200 { user: { id, name, email, profileId, profileName } }
        API-->>L: Datos del usuario
        L->>AC: login(user) → guarda en localStorage
        AC-->>L: isAuthenticated = true
        L-->>U: Redirige a /controlpanel
    end

    Note over U,DB: Carga dinámica de módulos en el Sidebar

    participant SB as Sidebar.tsx
    participant MAPI as Express /api/modules
    participant MC as ModuloControlador
    participant MM as ModuloModelo

    L->>SB: Sidebar se monta con userId
    SB->>MAPI: GET /api/modules?userId=X
    MAPI->>MC: getModules(req, res)
    MC->>MM: getActiveModules(userId)
    MM->>DB: SELECT module.* JOIN permissions WHERE status=1 AND idUser=?
    DB-->>MM: Módulos activos del usuario
    MM-->>MC: modules[]
    MC-->>MAPI: 200 modules[]
    MAPI-->>SB: JSON con módulos
    SB-->>U: Menú agrupado por área (Seguridad, Colección, etc.)
```

---

## 4. Justificación de Arquitectura

### 4.1 Patrón General: Cliente-Servidor con Separación de Capas

El sistema adopta una **arquitectura cliente-servidor de dos nodos físicos distintos**: un frontend SPA (Single Page Application) y un backend API REST. Ambos se comunican exclusivamente mediante HTTP/JSON, lo que permite que cada capa evolucione de forma independiente.

Dentro del backend, se aplica el patrón **MVC simplificado**:

| Capa | Responsabilidad | Archivos |
|---|---|---|
| **Rutas (Router)** | Mapeo de endpoints HTTP a controladores | `rutasAuth.js`, `rutasModulo.js`, `rutasUsuario.js` |
| **Controladores** | Orquestación de la lógica de negocio, manejo de req/res | `authControlador.js`, `moduloControlador.js`, `usuarioControlador.js` |
| **Modelos** | Acceso directo a la base de datos, encapsulamiento de queries SQL | `usuarioModelo.js`, `moduloModelo.js` |
| **Base de Datos** | Persistencia relacional | MySQL — esquema `UG` |

Esta separación permite que los **controladores no conozcan SQL** y que los **modelos no conozcan el protocolo HTTP**, lo que incrementa la cohesión y facilita futuras pruebas unitarias.

---

### 4.2 Frontend: React + TypeScript con Vite

Se eligió **React con TypeScript** por las siguientes razones:

- **Tipado estático**: TypeScript previene errores en tiempo de compilación, especialmente relevante en interfaces complejas como los permisos por usuario/módulo/perfil.
- **Componentización**: La UI se divide en piezas reutilizables (`Sidebar`, `Login`, `Controlpanel`, `AccessDeniedModal`, `ErrorBoundary`), facilitando el mantenimiento y escalabilidad.
- **Vite** como bundler garantiza tiempos de compilación y HMR (Hot Module Replacement) extremadamente rápidos durante el desarrollo.
- **React Router DOM** maneja las rutas del lado del cliente con `ProtectedRoute`, asegurando que solo usuarios autenticados accedan a `/controlpanel`.

---

### 4.3 Gestión de Estado Global con Context API

Se utilizan dos contextos React:

- **`AuthContext`**: Mantiene el estado de sesión del usuario (id, nombre, email, profileId, profileName). Persiste en `localStorage` para sobrevivir recargas de página sin necesidad de re-autenticación.
- **`ThemeContext`**: Gestiona la preferencia de tema (oscuro/claro) del usuario de forma global, desacoplando lógica de presentación de los componentes individuales.

Este enfoque se justifica por la **escala actual del sistema**: la Context API es suficiente para la cantidad de datos compartidos sin introducir la complejidad de Redux u otras librerías de estado pesadas.

---

### 4.4 Backend: Node.js + Express

- **Node.js** permite usar JavaScript tanto en frontend como en backend, reduciendo la curva de aprendizaje del equipo y permitiendo reutilizar lógica de validación en el futuro.
- **Express** es minimalista y altamente extensible. El sistema se estructura con rutas modulares montadas en el servidor principal (`index.js`), lo que facilita agregar nuevos dominios (módulos de la colección como Ejemplares, Préstamos, Datos Ecológicos, etc.) sin modificar código existente.
- **CORS habilitado globalmente** permite que el frontend y el backend puedan correr en puertos distintos durante el desarrollo (Vite proxying incluido).
- **Variables de entorno** (`.env` + `dotenv`) para credenciales de base de datos y puerto, siguiendo buenas prácticas de seguridad y portabilidad.

---

### 4.5 Base de Datos: MySQL con Modelo Relacional

El esquema fue diseñado para soportar un **sistema de control de acceso basado en roles por módulo (RBAC granular)**:

- La tabla `permissions` es la **entidad central** que vincula Usuario ↔ Módulo ↔ Perfil, con restricción `UNIQUE (idUser, idModule)`, garantizando que un usuario tenga exactamente un perfil por módulo.
- La tabla `profile` define **permisos funcionales** (agregar, eliminar, editar, exportar), permitiendo granularidad sin necesidad de lógica adicional en el backend.
- Los módulos agrupados por `area` (Seguridad, Administrativo, Colección, Investigación, Sistema) reflejan directamente la **estructura organizacional del dominio entomológico**, simplificando la navegación en el sidebar.

---

### 4.6 Seguridad y Consideraciones Futuras

| Aspecto | Estado actual | Recomendación futura |
|---|---|---|
| Autenticación | Credenciales en texto plano (DB) | Implementar hashing con bcrypt |
| Sesiones | `localStorage` sin expiración | JWT con refresh tokens |
| Autorización en rutas backend | Sin middleware de guards | Middleware de verificación de perfil por endpoint |
| HTTPS | No implementado localmente | Obligatorio en producción |

La arquitectura actual es **adecuada para la etapa de desarrollo y prototipado** del sistema, y fue diseñada de forma que cada una de estas mejoras puede incorporarse de manera incremental sin reescribir la base existente.
