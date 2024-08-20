--
--  Crear tabla 'roles' 
--
CREATE TABLE IF NOT EXISTS roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL
) ENGINE=InnoDB;

--
--  Insertar valores 'admin' y 'empleado' en la tabla 'rol'
--
INSERT INTO rol (nombre) VALUES ('admin'), ('empleado'), ('cliente');

--
--  Crear tabla 'users'
--
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    rol VARCHAR(255) NOT NULL,
    deleted_at TIMESTAMP DEFAULT NULL,
    hash VARCHAR(128) NOT NULL,
    salt VARCHAR(64) NOT NULL,
    FOREIGN KEY (rol) REFERENCES roles(nombre),
) ENGINE=InnoDB;

ALTER TABLE users
ADD not_archived BOOLEAN
GENERATED ALWAYS AS (IF(deleted_at IS NULL, 1, NULL)) VIRTUAL;

ALTER TABLE users
ADD CONSTRAINT UNIQUE (email, not_archived);

INSERT INTO users (nombre,email,rol,hash,salt)
VALUES ('nombre1','email@email.com','cliente','hash','salt');