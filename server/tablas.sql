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
        'SuperAdmin',
        'Control total del sistema',
        1,
        1,
        1,
        1
    ),
    (
        'Administrador',
        'Administra informacion del modulo',
        1,
        1,
        1,
        1
    ),
    (
        'Editor',
        'Puede registrar y modificar informacion',
        1,
        0,
        1,
        1
    ),
    (
        'Capturista',
        'Solo captura informacion',
        1,
        0,
        1,
        0
    ),
    (
        'Consulta',
        'Solo lectura',
        0,
        0,
        0,
        0
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
        'SinAcceso',
        'Puede iniciar sesion pero no tiene acceso a modulos',
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

#Andrea
insert into permissions (idUser,idModule,idProfile)
select 1, idModule, 1 from module;

#Miguel
insert into permissions (idUser,idModule,idProfile) values
(2,3,3),
(2,4,2),
(2,9,5);

#Fernanda
insert into permissions (idUser,idModule,idProfile) values
(3,4,4),
(3,8,2);

#Jorge
insert into permissions (idUser,idModule,idProfile) values
(4,4,2),
(4,5,3),
(4,8,4);

#Paola
insert into permissions (idUser,idModule,idProfile) values
(5,9,5);

#Ricardo
insert into permissions (idUser,idModule,idProfile)
select 6, idModule, 6 from module;

select * from profile;

select * from user;

select * from module;

select * from permissions;