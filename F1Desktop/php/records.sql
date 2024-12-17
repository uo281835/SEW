 CREATE DATABASE if not exists 'records';
 
 CREATE TABLE if not exists records.registro (
                        NOMBRE varchar(255) NOT NULL,
                        APELLIDOS varchar(255) NOT NULL,
                        NIVEL float NOT NULL,
                        TIEMPO float NOT NULL
                      ) ;