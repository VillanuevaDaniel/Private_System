create database UG;

USE UG;

create table user (
    idUser bigint not null auto_increment primary key,
    name varchar(100) not null,
    last_name varchar(30),
    second_last_name varchar(30),
    email varchar(150) not null,
    password varchar(64) not null,
    status boolean not null
);

create table module (
    idModule bigint not null auto_increment primary key,
    name varchar(50) not null,
    description varchar(150) not null,
    area varchar(50) not null,
    status boolean not null
);

create table profile (
    idProfile bigint not null auto_increment primary key,
    nickname varchar(50),
    description varchar(300),
    key_add boolean not null,
    key_delete boolean not null,
    key_edit boolean not null,
    key_export boolean not null
);

create table permissions (
    idPermission bigint not null auto_increment primary key,
    idUser bigint not null,
    idModule bigint not null,
    idProfile bigint not null,
    foreign key (idUser) references user (idUser),
    foreign key (idModule) references module (idModule),
    foreign key (idProfile) references profile (idProfile),
    unique (idUser, idModule)
);

insert into
    profile (
        nickname,
        description,
        key_add,
        key_delete,
        key_edit,
        key_export
    )
values (
        'Administrador',
        'Acceso completo: puede agregar, eliminar, editar y exportar en sus módulos asignados',
        1,
        1,
        1,
        1
    ),
    (
        'Editor',
        'Puede registrar, modificar y exportar, pero NO eliminar registros',
        1,
        0,
        1,
        1
    ),
    (
        'Capturista',
        'Solo captura y modifica datos básicos, sin exportar ni eliminar',
        1,
        0,
        1,
        0
    ),
    (
        'Consultor',
        'Solo lectura: puede ver y exportar información, sin modificar',
        0,
        0,
        0,
        1
    ),
    (
        'SinAcceso',
        'Usuario activo en el sistema pero sin permisos operativos en el módulo',
        0,
        0,
        0,
        0
    );

insert into
    module (
        name,
        description,
        area,
        status
    )
values (
        'Usuarios',
        'Administracion de usuarios',
        'Seguridad',
        1
    ),
    (
        'Perfiles',
        'Administracion de perfiles',
        'Seguridad',
        1
    ),
    (
        'Catalogos',
        'Paises, estados, localidades, plantas, citas',
        'Administrativo',
        1
    ),
    (
        'Registro de Ejemplares',
        'Registro del insecto colectado',
        'Coleccion',
        1
    ),
    (
        'Prestamos',
        'Prestamo de ejemplares',
        'Coleccion',
        1
    ),
    (
        'Envio a Determinar',
        'Envio a especialistas',
        'Investigacion',
        1
    ),
    (
        'Datos Ecologicos',
        'Datos taxonomicos y ecologicos',
        'Investigacion',
        1
    ),
    (
        'Fototeca',
        'Imagenes del ejemplar',
        'Coleccion',
        1
    ),
    (
        'Reportes',
        'Consultas y exportaciones',
        'Sistema',
        1
    );

insert into
    user (
        name,
        last_name,
        second_last_name,
        email,
        password,
        status
    )
values (
        'Andrea',
        'Salazar',
        'Mendoza',
        'andrea.salazar@mail.com',
        '123',
        1
    ),
    (
        'Miguel',
        'Torres',
        'Rios',
        'miguel.torres@mail.com',
        '123',
        1
    ),
    (
        'Fernanda',
        'Castillo',
        'Luna',
        'fernanda.castillo@mail.com',
        '123',
        1
    ),
    (
        'Jorge',
        'Vega',
        'Ortega',
        'jorge.vega@mail.com',
        '123',
        1
    ),
    (
        'Paola',
        'Nava',
        'Serrano',
        'paola.nava@mail.com',
        '123',
        1
    ),
    (
        'Ricardo',
        'Dominguez',
        'Cano',
        'ricardo.dominguez@mail.com',
        '123',
        1
    ),
    (
        'Sofia',
        'Pineda',
        'Ruiz',
        'sofia.pineda@mail.com',
        '123',
        1
    ),
    (
        'Luis',
        'Bautista',
        'Mejia',
        'luis.bautista@mail.com',
        '123',
        1
    );

-- Andrea: Administrador en todos los módulos
INSERT INTO
    permissions (idUser, idModule, idProfile)
SELECT 1, idModule, 1
FROM module;

-- Miguel
INSERT INTO
    permissions (idUser, idModule, idProfile)
VALUES (2, 3, 2), -- Catalogos        → Editor
    (2, 4, 2), -- Reg. Ejemplares  → Editor
    (2, 6, 2), -- Envio Determinar → Editor
    (2, 7, 1), -- Datos Ecologicos → Administrador
    (2, 8, 3), -- Fototeca         → Capturista
    (2, 9, 4);
-- Reportes         → Consultor

-- Fernanda
INSERT INTO
    permissions (idUser, idModule, idProfile)
VALUES (3, 3, 3), -- Catalogos        → Capturista
    (3, 4, 3), -- Reg. Ejemplares  → Capturista
    (3, 5, 3), -- Prestamos        → Capturista
    (3, 8, 1), -- Fototeca         → Administrador
    (3, 9, 4);
-- Reportes         → Consultor

-- Jorge
INSERT INTO
    permissions (idUser, idModule, idProfile)
VALUES (4, 3, 3), -- Catalogos        → Capturista
    (4, 4, 2), -- Reg. Ejemplares  → Editor
    (4, 5, 1), -- Prestamos        → Administrador
    (4, 6, 2), -- Envio Determinar → Editor
    (4, 8, 3), -- Fototeca         → Capturista
    (4, 9, 4);
-- Reportes         → Consultor

-- Paola
INSERT INTO
    permissions (idUser, idModule, idProfile)
VALUES (5, 4, 4), -- Reg. Ejemplares  → Consultor
    (5, 5, 4), -- Prestamos        → Consultor
    (5, 7, 4), -- Datos Ecologicos → Consultor
    (5, 9, 4);
-- Reportes         → Consultor

-- Ricardo
INSERT INTO
    permissions (idUser, idModule, idProfile)
SELECT 6, idModule, 5
FROM module;

-- Sofia
INSERT INTO
    permissions (idUser, idModule, idProfile)
VALUES (7, 3, 3), -- Catalogos        → Capturista
    (7, 4, 3), -- Reg. Ejemplares  → Capturista
    (7, 7, 3), -- Datos Ecologicos → Capturista
    (7, 8, 3);
-- Fototeca         → Capturista

-- Luis
INSERT INTO
    permissions (idUser, idModule, idProfile)
VALUES (8, 1, 2), -- Usuarios         → Editor
    (8, 2, 2), -- Perfiles         → Editor
    (8, 3, 1), -- Catalogos        → Administrador
    (8, 9, 4);
-- Reportes         → Consultor

USE UG;

select u.name, m.name as modulo, p.nickname as perfil, p.key_add, p.key_delete, p.key_edit, p.key_export
from
    permissions pe
    join user u on pe.idUser = u.idUser
    join module m on pe.idModule = m.idModule
    join profile p on pe.idProfile = p.idProfile
where
    u.email = 'ricardo.dominguez@mail.com';