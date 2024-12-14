 CREATE DATABASE if not exists 'records';
 
 CREATE TABLE if not exists registro (
                        NOMBRE varchar(255) NOT NULL,
                        APELLIDOS varchar(255) NOT NULL,
                        NIVEL number(255) NOT NULL,
                        TIEMPO number(255) NOT NULL
                      ) ;