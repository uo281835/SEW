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

    <script src="js/semaforo.js"></script>

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
                $this->db = new mysqli($this->server, $this->user, $this->pass, $this->dbname);

                if ($this->db->connect_errno) {
                    echo "Error de conexión: " . $this->db->connect_error;
                  } else {
                }
            }

            function setup(){
                $this->db->query(
                    "CREATE TABLE if not exists records.registro (
                        NOMBRE varchar(255) NOT NULL,
                        APELLIDOS varchar(255) NOT NULL,
                        NIVEL FLOAT NOT NULL,
                        TIEMPO FLOAT NOT NULL
                      ) ;"

                );
            }

            function addRecord(){
                $consulta = "INSERT INTO records.registro(nombre, apellidos, nivel, tiempo)
                 VALUES (?,?,?,?)";
                $ps = $this->db->prepare($consulta);
                $nombre=$_POST["nombre"];
                $apellidos=$_POST["apellidos"];
                $nivel=$_POST["nivel"];
                $tiempo=$_POST["tiempo"];
                $ps->bind_param("ssdd", $nombre,
                $apellidos, 
                $nivel, 
                $tiempo);
                $ps->execute();
            }

            function getRecords(){
                $consulta = "SELECT * FROM records.registro order by tiempo LIMIT 10";
                $ps = $this->db->prepare($consulta);
                $ps->execute();
                $resultado = $ps->get_result();
                $toPrint = "<section> <h3>Resultados</h3><ol>";
                while($row = $resultado->fetch_assoc()){
                    $toPrint .= "<li><p> Nombre " . $row['nombre'] . " - Apellidos: " . $row['apellidos'] . " - Tiempo: " . $row['tiempo']. "</p></li>";
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
            <a href="circuito.html">Circuito</a>
            <a href="viajes.php">Viajes</a>
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
                if(isset($_POST["nombre"])){
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