<!DOCTYPE HTML>
<html lang="es">
<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <title>F1Desktop</title>
    <meta name="author" content="Juan Gómez Tejeda"/>
    <meta name="description" content="Descripción del documento"/>
    <meta name="keywords" content="Palabras clave del documento"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/> 
    <link rel="stylesheet" type="text/css" href="estilo/estilo.css" />
    <link rel="stylesheet" type="text/css" href="estilo/layout.css" />
    <link rel="stylesheet" type="text/css" href="estilo/semaforo.css" />
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>

    <script src="/F1Desktop/js/semaforo.js"></script>

    <?php

        class Record{

            private $server;
            private $user;
            private $pass;
            private $dbname;

            public function __construct(){
                $this->server = "localhost";
                $this->user = "DBUSER2024";
                $this->pass = "DBPSWD2024";
                $this->dbname = "records";
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
    <p><a href="index.html">Inicio</a> >> <a href="juegos.html">Juegos</a> >> Juego de Semáforo</p>
    <!-- Datos con el contenidos que aparece en el navegador -->
    <p>Plantilla para F1Desktop</p>
    

    <main>
        <script>
            var semaforo = new Semaforo();
        </script>
    </main>
    <footer>
        <p>Plantilla para F1Desktop</p>
    </footer>
</body>
</html>