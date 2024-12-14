CREATE DATABASE if not exists  ejerciciolibre ;

CREATE TABLE if not exists ejerciciolibre.escuderias  
( nombre  VARCHAR(255) NOT NULL ,
  paisorigen  VARCHAR(255) NOT NULL , 
  paisactual  VARCHAR(255) NOT NULL ,
   marcamotor  VARCHAR(255) NOT NULL ) 
  ENGINE = InnoDB;

  CREATE TABLE if not exists ejerciciolibre.pilotos  
  ( nombrecompleto  VARCHAR(255) NOT NULL , 
   paisnacimiento  VARCHAR(255) NOT NULL , 
   fechanacimiento  VARCHAR(255) NOT NULL ) 
  ENGINE = InnoDB;

  CREATE TABLE if not exists ejerciciolibre.coches  
  ( modelo  VARCHAR(255) NOT NULL , 
   motor  VARCHAR(255) NOT NULL , 
   neumaticos  VARCHAR(255) NOT NULL ) 
  ENGINE = InnoDB;

  CREATE TABLE if not exists ejerciciolibre.fichado_por  
  ( piloto  VARCHAR(255) NOT NULL , 
   escuderia  VARCHAR(255) NOT NULL )
   ENGINE = InnoDB;

   CREATE TABLE  if not exists ejerciciolibre.conduce  
   ( piloto  VARCHAR(255) NOT NULL ,
    coche  VARCHAR(255) NOT NULL ) 
   ENGINE = InnoDB;