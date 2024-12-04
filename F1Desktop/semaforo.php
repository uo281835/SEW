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

    if(session_status()===PHP_SESSION_NONE)
        session_start();

        class Record{

            private $server;
            private $user;
            private $pass;
            private $dbname;
            private $db;

            public function __construct(){
                $this->server = "localhost";
                $this->user = "DBUSER2024";
                $this->pass = "DBPSWD2024";
                $this->dbname = "records";
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
                    "CREATE TABLE if not exists records (
                        NOMBRE varchar(255) NOT NULL,
                        APELLIDOS varchar(255) NOT NULL,
                        NIVEL number(255) NOT NULL,
                        TIEMPO number(255) NOT NULL
                      ) ;"

                );
            }

            function addRecord(){
                $consulta = "INSERT INTO records(nombre, apellidos, nivel, tiempo) VALUES (?,?,?,?)";
                $ps = $this->db->prepare($consulta);
                $ps->bind_param("ssnn", $_POST["nombre"],$_POST["apellidos"], $_POST["nivel"], $_POST["tiempo"]);
                $ps->execute();
            }

            function getRecords(){
                $consulta = "SELECT * FROM records LIMIT ?";
                $ps = $this->db->prepare($consulta);
                $ps->bind_param("n", 10);
                $ps->execute();
                $resultado = $ps->get_result();
                $toPrint = "<section> <h3>Resultados</h3><ol>";
                while($row = $resultado->fetch_assoc()){
                    $toPrint .= "<li><p> Nombre " . $row['NOMBRE'] . " - Apellidos: " . $row['Apellidos'] . " - Tiempo: " . $row['Tiempo']. "</p></li>";
                }                
                $toPrint .= "</ol></section>";

                echo $toPrint;
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
        <?php 
            $_SESSION['record'] = new Record();
            $_SESSION['record']->setup();

            if(count($_POST)>0){
                if(isset($_POST["record"])){
                    $_SESSION['record']->addRecord();
                    $_SESSION['record']->getRecords();
                }
              }
        ?>
    </main>
    <footer>
        <p>Plantilla para F1Desktop</p>
    </footer>

    
</body>
</html>