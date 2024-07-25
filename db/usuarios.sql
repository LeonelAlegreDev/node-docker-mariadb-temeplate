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
    contrasena VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    rol VARCHAR(255) NOT NULL,
    deleted_at TIMESTAMP DEFAULT NULL,
    FOREIGN KEY (rol) REFERENCES roles(nombre)
) ENGINE=InnoDB;