DROP EXTENSION IF EXISTS pgcrypto;
CREATE EXTENSION pgcrypto;

DROP TABLE IF EXISTS clientes CASCADE;
CREATE TABLE clientes
(
	cedula VARCHAR(40) NOT NULL UNIQUE,
	nombres VARCHAR(40) NOT NULL,
	apellidos VARCHAR(40) NOT NULL,
	email VARCHAR(40),
	tipo VARCHAR(1),
	via_factura VARCHAR(1),

	CONSTRAINT cliente_pk PRIMARY KEY (cedula)
);

DROP TABLE IF EXISTS usuarios CASCADE;
CREATE TABLE usuarios
(
	cedula VARCHAR(40) NOT NULL UNIQUE,
	nombres VARCHAR(40) NOT NULL,
	apellidos VARCHAR(40) NOT NULL,
	password TEXT NOT NULL,
	estado BIT(1) NOT NULL,
	tipo VARCHAR(1) NOT NULL,

	CONSTRAINT usuario_pk PRIMARY KEY (cedula)
);

DROP TABLE IF EXISTS bancos CASCADE;
CREATE TABLE bancos
(
	id SERIAL NOT NULL UNIQUE,
	nombre VARCHAR(40) NOT NULL UNIQUE,

	CONSTRAINT banco_pk PRIMARY KEY (id)
);


DROP SEQUENCE IF EXISTS bancos_sequence CASCADE;
CREATE SEQUENCE bancos_sequence
  start 1
  increment 1;

DROP TABLE IF EXISTS subestaciones CASCADE;
CREATE TABLE subestaciones
(
	id SERIAL NOT NULL UNIQUE,
	nombre_sector VARCHAR(40) NOT NULL,
	ubicacion JSONB NOT NULL,

	CONSTRAINT subestacion_pk PRIMARY KEY (id)
);


DROP SEQUENCE IF EXISTS subestaciones_sequence CASCADE;
CREATE SEQUENCE subestaciones_sequence
  start 1
  increment 1;

DROP TABLE IF EXISTS transformadores CASCADE;
CREATE TABLE transformadores
(
	id SERIAL NOT NULL UNIQUE,
	nivel_tension INT NOT NULL,
	ubicacion JSONB NOT NULL,	
	id_subestacion INT NOT NULL,

	CONSTRAINT transformador_pk PRIMARY KEY (id),

	CONSTRAINT transformador_fk1 FOREIGN KEY (id_subestacion)
		REFERENCES subestaciones (id) ON DELETE CASCADE
);


DROP SEQUENCE IF EXISTS transformadores_sequence CASCADE;
CREATE SEQUENCE transformadores_sequence
  start 1
  increment 1;

/*DROP TABLE IF EXISTS contadores CASCADE;
CREATE TABLE contadores
(
	id VARCHAR(40) NOT NULL UNIQUE,
	medicion_anterior INT,
	fecha_medicion_anterior DATE,
	medicion_actual NOT NULL INT,
	fecha_medicion_actual NOT NULL DATE,

	CONSTRAINT contador_pk PRIMARY KEY (id)
);*/

DROP TABLE IF EXISTS mediciones CASCADE;
CREATE TABLE mediciones
(
	id SERIAL NOT NULL UNIQUE,
	medicion INT NOT NULL,
	fecha DATE NOT NULL,
	id_transformador INT NOT NULL,
	cedula_cliente VARCHAR(40) NOT NULL,

	CONSTRAINT medicion_pk PRIMARY KEY (id),
	
	CONSTRAINT medicion_fk1 FOREIGN KEY (id_transformador)
		REFERENCES transformadores (id) ON DELETE CASCADE,
	CONSTRAINT medicion_fk2 FOREIGN KEY (cedula_cliente)
		REFERENCES clientes (cedula) ON DELETE CASCADE
);


DROP SEQUENCE IF EXISTS mediciones_sequence CASCADE;
CREATE SEQUENCE mediciones_sequence
  start 1
  increment 1;

DROP TABLE IF EXISTS predios CASCADE;
CREATE TABLE predios
(
	num_contrato SERIAL NOT NULL UNIQUE,
	direccion VARCHAR(80) NOT NULL,
	estrato INT NOT NULL,
	cedula_cliente VARCHAR(40) NOT NULL,
	cedula_usuario VARCHAR(40) NOT NULL,

	CONSTRAINT predio_pk PRIMARY KEY (num_contrato),
	
	CONSTRAINT predio_fk1 FOREIGN KEY (cedula_cliente)
		REFERENCES clientes (cedula) ON DELETE CASCADE,
	CONSTRAINT predio_fk2 FOREIGN KEY (cedula_usuario)
		REFERENCES usuarios (cedula) ON DELETE CASCADE
);


DROP TABLE IF EXISTS facturas CASCADE;
CREATE TABLE facturas
(
	id SERIAL NOT NULL UNIQUE,
	cedula_cliente VARCHAR(40) NOT NULL,
	fecha_expedicion DATE NOT NULL,
	fecha_vencimiento DATE NOT NULL,
	valor INT NOT NULL,
	estado_pago BIT(1),

	CONSTRAINT factura_pk PRIMARY KEY (id),

	CONSTRAINT factura_fk1 FOREIGN KEY (cedula_cliente)
		REFERENCES clientes (cedula) ON DELETE CASCADE
);


DROP SEQUENCE IF EXISTS facturas_sequence CASCADE;
CREATE SEQUENCE facturas_sequence
  start 1
  increment 1;

DROP TABLE IF EXISTS pagos CASCADE;
CREATE TABLE pagos
(
	id SERIAL NOT NULL UNIQUE,
	fecha_pago DATE NOT NULL,
	valor INT NOT NULL,
	medio_pago VARCHAR(1) NOT NULL,
	id_factura INT NOT NULL,
	cedula_usuario VARCHAR(40) NOT NULL,
	id_banco INT,

	CONSTRAINT pagos_pk PRIMARY KEY (id),

	CONSTRAINT predio_fk1 FOREIGN KEY (id_factura)
		REFERENCES facturas (id) ON DELETE CASCADE,
	CONSTRAINT pagos_fk2 FOREIGN KEY (cedula_usuario)
		REFERENCES usuarios (cedula) ON DELETE CASCADE,
	CONSTRAINT predio_fk3 FOREIGN KEY (id_banco)
		REFERENCES bancos (id) ON DELETE CASCADE
);


DROP SEQUENCE IF EXISTS cotizaciones_sequence CASCADE;
CREATE SEQUENCE pagos_sequence
  start 1
  increment 1;
