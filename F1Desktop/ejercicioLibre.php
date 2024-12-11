<!DOCTYPE HTML>
<html lang="es">
<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <title>F1Desktop - Libre PHP</title>
    <meta name="author" content="Juan Gómez Tejeda"/>
    <meta name="description" content="Información acerca del circuito de esta semana"/>
    <meta name="keywords" content="f1, formula1, circuito, carreras"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/> 
    <link rel="stylesheet" type="text/css" href="estilo/estilo.css" />
    <link rel="stylesheet" type="text/css" href="estilo/layout.css" />
    <link rel="icon" href="multimedia/imagenes/favicon.ico"/>
    <?php
        if(session_status()===PHP_SESSION_NONE)
        session_start();

        class Fichajes(){
            private $server;
            private $user;
            private $pass;
            private $dbname;
            private $db;

            public function __construct(){
                $this->server = "localhost";
                $this->user = "DBUSER2024";
                $this->pass = "DBPSWD2024";
                $this->dbname = "fichajes";
                $this->crearDB();
            }

            function crearDB(){
                $this->db = new msqli($this->server, $this->user, $this->pass, $this->dbname);

                if ($this->db->connect_errno) {
                    echo "Error de conexión: " . $this->db->connect_error;
                  } else {
                    echo $this->db->host_info . "\r\n";
                }
            }

            function setup(){
                $this->db->query(
                    "CREATE TABLE if not exists escuderias (
                        NOMBRE varchar(255) NOT NULL,
                        PAISORIGEN varchar(255) NOT NULL,
                        PAISACTUAL varchar(255) NOT NULL,
                        MARCAMOTOR varchar(255) NOT NULL,
                      ) ;"

                );
                $this->db->query(
                    "CREATE TABLE if not exists pilotos (
                        NOMBRECOMPLETO varchar(255) NOT NULL,
                        PAISNACIMIENTO varchar(255) NOT NULL,
                        FECHANACIMIENTO varchar(255) NOT NULL,
                      ) ;"

                );
                $this->db->query(
                    "CREATE TABLE if not exists coches (
                        MODELO varchar(255) NOT NULL,
                        MOTOR varchar(255) NOT NULL,
                        NEUMATICOS varchar(255) NOT NULL,
                      ) ;"
                );

                $this->db->query(
                    "CREATE TABLE if not exists fichado_por (
                        PILOTO varchar(255) NOT NULL,
                        ESCUDERIA varchar(255) NOT NULL,
                      ) ;"
                );

                $this->db->query(
                    "CREATE TABLE if not exists conduce (
                        PILOTO varchar(255) NOT NULL,
                        COCHE varchar(255) NOT NULL,
                      ) ;"
                );
            }
        }
    ?>
</head>

<body>
    <header>
        <h1>F1 Desktop</h1>
        <nav>
            <a href="index.html">Inicio</a>
            <a href="piloto.html">Piloto</a>
            <a href="noticias.html">Noticias</a>
            <a href="calendario.html">Calendario</a>
            <a href="meteorologia.html">Meteorología</a>
            <a href="circuito.html">Cicuito</a>
            <a href="viajes.html">Viajes</a>
            <a href="juegos.html"  class="active">Juegos</a>
        </nav>
    </header>
    <p><a href="index.html">Inicio</a> >> <a href="juegos.html">Juegos</a> >> Minijuego PHP</p>

    <main>
        <h2>Ejercicio Libre PHP</h2>
        <!-- Datos con el contenidos que aparece en el navegador -->
        <p>En desarrollo</p>
    </main>
    
    

    <footer>
        <p>En desarrollo</p>
    </footer>

</body>
</html>