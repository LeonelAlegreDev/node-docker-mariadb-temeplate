CREATE TABLE IF NOT EXISTS roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL UNIQUE
) ENGINE=InnoDB;

INSERT INTO roles (nombre) VALUES ('admin'), ('empleado'), ('cliente');

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    rol VARCHAR(255) NOT NULL,
    deleted_at TIMESTAMP DEFAULT NULL,
    FOREIGN KEY (rol) REFERENCES roles(nombre)
) ENGINE=InnoDB;

INSERT INTO users (nombre, contrasena, email, rol) VALUES ('Admin 1', 'admin_pwd', 'admin1@email.com', 'admin');