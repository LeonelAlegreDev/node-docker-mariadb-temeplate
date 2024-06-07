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
INSERT INTO rol (nombre) VALUES ('admin'), ('empleado');

--
--  Crear tabla 'usuarios'
--
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    rol INT NOT NULL,
    FOREIGN KEY (rol) REFERENCES roles(id)
) ENGINE=InnoDB;