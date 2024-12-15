<?php
if(session_status()===PHP_SESSION_NONE)
session_start();

if(isset($_POST["exportar"])){
    $nombre = $_POST["ficheroExportar"];
    $fichajes = new Fichajes();
    $fichajes->exportToCSV($nombre);
}
?>
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
        
        class Fichajes{
            private $server;
            private $user;
            private $pass;
            private $dbname;
            private $db;

            public function __construct(){
                $this->server = "localhost";
                $this->user = "DBUSER2024";
                $this->pass = "DBPSWD2024";
                $this->dbname = "ejerciciolibre";
                $this->crearDB();
            }

            function crearDB(){
                $this->db = new mysqli($this->server, $this->user, $this->pass, $this->dbname);

                if ($this->db->connect_errno) {
                    echo "Error de conexión: " . $this->db->connect_error;
                  }
            }

            function setup(){
                $this->db->query(
                    "CREATE DATABASE if not exists ejerciciolibre;"

                );
                $this->db->query(
                    "CREATE TABLE if not exists ejerciciolibre.escuderias
                        (nombre VARCHAR(255) NOT NULL ,
                        paisorigen VARCHAR(255) NOT NULL , 
                        paisactual VARCHAR(255) NOT NULL ,
                        marcamotor VARCHAR(255) NOT NULL ) 
                        ENGINE = InnoDB;"

                );
                $this->db->query(
                    "   CREATE TABLE if not exists ejerciciolibre.pilotos  
  ( nombrecompleto  VARCHAR(255) NOT NULL , 
   paisnacimiento  VARCHAR(255) NOT NULL , 
   fechanacimiento  VARCHAR(255) NOT NULL ) 
  ENGINE = InnoDB;"

                );
                $this->db->query(
                    "  CREATE TABLE if not exists ejerciciolibre.coches  
  ( modelo  VARCHAR(255) NOT NULL , 
   motor  VARCHAR(255) NOT NULL , 
   neumaticos  VARCHAR(255) NOT NULL ) 
  ENGINE = InnoDB;"
                );

                $this->db->query(
                    " CREATE TABLE if not exists ejerciciolibre.fichado_por  
  ( piloto  VARCHAR(255) NOT NULL , 
   escuderia  VARCHAR(255) NOT NULL )
   ENGINE = InnoDB;"
                );

                $this->db->query(
                    "CREATE TABLE  if not exists ejerciciolibre.conduce  
   ( piloto  VARCHAR(255) NOT NULL ,
    coche  VARCHAR(255) NOT NULL ) 
   ENGINE = InnoDB;"
                );
            }

            function addEscuderia($nombre, $paisorigen,$paisactual,$marcamotor){
                echo "Añadiendo escuderia";
                $consulta = "INSERT INTO ejerciciolibre.escuderias(nombre, paisorigen, paisactual, marcamotor)
                 VALUES (?,?,?,?)";
                $ps = $this->db->prepare($consulta);
                echo "Añadiendo record";
                $ps->bind_param("ssss", $nombre,
                $paisorigen, 
                $paisactual, 
                $marcamotor);
                $ps->execute();

            }

            function addPiloto($nombrecompleto, $paisnacimiento, $fechanacimiento){
                echo "Añadiendo fila";
                $consulta = "INSERT INTO ejerciciolibre.pilotos(nombrecompleto, paisnacimiento, fechanacimiento)
                 VALUES (?,?,?)";
                $ps = $this->db->prepare($consulta);
                echo "Añadiendo record";
                $ps->bind_param("sss", $nombrecompleto,
                $paisnacimiento, 
                $fechanacimiento);
                $ps->execute();
            }
            function addCoche($modelo, $motor, $neumaticos){
                echo "Añadiendo fila";
                $consulta = "INSERT INTO ejerciciolibre.coches(modelo, motor, neumaticos)
                 VALUES (?,?,?)";
                $ps = $this->db->prepare($consulta);
                echo "Añadiendo record";
                $ps->bind_param("sss", $modelo,
                $motor, 
                $neumaticos);
                $ps->execute();
            }

            function fichar($piloto, $escuderia){
                echo "Añadiendo fila";
                $consulta = "INSERT INTO ejerciciolibre.fichado_por(piloto, escuderia)
                 VALUES (?,?)";
                $ps = $this->db->prepare($consulta);
                echo "Añadiendo record";
                $ps->bind_param("ss", $piloto,
                $escuderia);
                $ps->execute();
            }

            function asignar($piloto, $coche){
                echo "Añadiendo fila";
                $consulta = "INSERT INTO ejerciciolibre.conduce(piloto, coche)
                 VALUES (?,?)";
                $ps = $this->db->prepare($consulta);
                echo "Añadiendo record";
                $ps->bind_param("ss", $piloto,
                $coche);
                $ps->execute();
            }
            function importFromCSV(){
                $filename = $_FILES['ficheroCargar']['tmp_name'];
                echo $filename;
                if($_FILES["ficheroCargar"]["size"]>0){
                   
                        $file=fopen( $filename,"r");
                        echo "Se ha subido";
                        while(( $data = fgetcsv($file) ) !== FALSE ) {
                            echo $data[0];
                            $escuderiaNombre = $data[0];
                            $escuderiaOrigen = $data[1];
                            $escuderiaActual = $data[2];
                            $escuderiaMarca = $data[3];
    
                            if($escuderiaOrigen!== ""){
                                $this->addEscuderia($escuderiaNombre,$escuderiaOrigen,$escuderiaActual,$escuderiaMarca);
                            }
    
                            $pilotoNombre= $data[4];
                            $pilotoPais = $data[5];
                            $pilotoFecha = $data[6];
                            if($pilotoNombre !== ""){
                                $this->addPiloto($pilotoNombre,$pilotoPais,$pilotoFecha);
                            }
    
    
                            $cocheModelo = $data[7];
                            $cocheMotor = $data[8];
                            $cocheNeumaticos = $data[9];
                            if($cocheModelo!== ""){
                                $this->addCoche($cocheModelo,$cocheMotor,$cocheNeumaticos);
                            }
    
                            $fichajePiloto = $data[10];
                            $fichajeEscuderia = $data[11];
                            if($fichajePiloto!== ""){
                                $this->fichar($fichajePiloto,$fichajeEscuderia);
                            }
    
                            $asignacionPiloto = $data[12];
                            $asignacionCoche = $data[13];
                            if($asignacionPiloto!== ""){ 
                                $this->asignar($asignacionPiloto,$asignacionCoche);
                            }
                        }
                        fclose($file);
            }
        }
        
        function getCoches(){
            $coches = array();
            $consulta = "SELECT * FROM ejerciciolibre.coches ";
                $ps = $this->db->prepare($consulta);
                $ps->execute();
                $resultado = $ps->get_result();
                while($row = $resultado->fetch_assoc()){
                    $coche = array("modelo"=>$row["modelo"], "motor"=>$row["motor"],"neumaticos"=>$row["neumaticos"]);
                    array_push($coches,$coche);
                }   
                return $coches;
        }
        function getEscuderias(){
            $escuderias = array();
            $consulta = "SELECT * FROM ejerciciolibre.escuderias ";
            $ps = $this->db->prepare($consulta);
            $ps->execute();
            $resultado = $ps->get_result();
            while($row = $resultado->fetch_assoc()){
                $escuderia = array("nombre"=>$row["nombre"], "paisorigen"=>$row["paisorigen"],"paisactual"=>$row["paisactual"],"marcamotor"=>$row["marcamotor"]);
                array_push($escuderias,$escuderia);
            }   
            return $escuderias;
        }
        function getPilotos(){
            $pilotos=array();
            $consulta = "SELECT * FROM ejerciciolibre.pilotos ";
            $ps = $this->db->prepare($consulta);
            $ps->execute();
            $resultado = $ps->get_result();
            while($row = $resultado->fetch_assoc()){
                $piloto = array("nombrecompleto"=>$row["nombrecompleto"], "paisnacimiento"=>$row["paisnacimiento"],"fechanacimiento"=>$row["fechanacimiento"]);
                array_push($pilotos,$piloto);
            }   
            return $pilotos;
        }
        function getFichajes(){
            $fichajes=array();
            $consulta = "SELECT * FROM ejerciciolibre.fichado_por ";
            $ps = $this->db->prepare($consulta);
            $ps->execute();
            $resultado = $ps->get_result();
            while($row = $resultado->fetch_assoc()){
                $fichaje = array("piloto"=>$row["piloto"], "escuderia"=>$row["escuderia"]);
                array_push($fichajes,$fichaje);
            }   
            return $fichajes;
        }
        function getAsignaciones(){
            $asignaciones=array();
            $consulta = "SELECT * FROM ejerciciolibre.conduce ";
            $ps = $this->db->prepare($consulta);
            $ps->execute();
            $resultado = $ps->get_result();
            while($row = $resultado->fetch_assoc()){
                $conduce = array("piloto"=>$row["piloto"], "coche"=>$row["coche"]);
                array_push($asignaciones,$conduce);
            }   
            return $asignaciones;
        }

            function exportToCSV($nombreFichero){
                header('Content-Type: text/csv; charset=utf-8');
                header('Content-Disposition: attachment; filename="'.$nombreFichero.'.csv";');
                
                $output = fopen('php://output',"w");
                $coches = $this->getCoches();
                $escuderias=$this->getEscuderias();
                $pilotos=$this->getPilotos();
                $fichajes=$this->getFichajes();
                $asignaciones = $this->getAsignaciones();

                $maxLength = max(count($coches), count($asignaciones),count($pilotos),count($escuderias), count($fichajes));

                for($i= 0;$i<$maxLength;$i++){
                    $fila = "";
                    if($i<count($escuderias)){
                        $escuderia = $escuderias[$i];
                        $fila.= $escuderia["nombre"].",".$escuderia["paisorigen"].",".$escuderia["paisactual"].",".$escuderia["marcamotor"].",";
                    }else{
                        $fila.=",,,,";
                    }
                    if($i<count($coches)){
                        $escuderia = $coches[$i];
                        $fila.= $escuderia["modelo"].",".$escuderia["motor"].",".$escuderia["neumaticos"].",";
                    }else{
                        $fila.=",,,";
                    }
                    if($i<count($pilotos)){
                        $escuderia = $pilotos[$i];
                        $fila.= $escuderia["nombrecompleto"].",".$escuderia["paisnacimiento"].",".$escuderia["fechanacimiento"].",";
                    }else{
                        $fila.=",,,";
                    }
                    if($i<count($fichajes)){
                        $escuderia = $fichajes[$i];
                        $fila.= $escuderia["piloto"].",".$escuderia["escuderia"].",";
                    }
                    else{
                        $fila.=",,";
                    }
                    if($i<count($asignaciones)){
                        $escuderia = $asignaciones[$i];
                        $fila.= $escuderia["piloto"].",".$escuderia["coche"];
                    }else{
                        $fila.=",";
                    }
                    fwrite($output,$fila."\n");
                }
                fclose($output);
                exit;
            }
            function printInfo(){
                $coches = $this->getCoches();
                $escuderias=$this->getEscuderias();
                $pilotos=$this->getPilotos();
                $fichajes=$this->getFichajes();
                $asignaciones = $this->getAsignaciones();
                echo "<article><h3>Datos</h3>";

                echo "<section><h4> Coches </h4>";
                $this->arrayArrayToList($coches,"ol");
                echo "</section>";
                echo "<section><h4> Pilotos </h4>";
                $this->arrayArrayToList($pilotos,"ol");
                echo "</section>";
                echo "<section><h4> Escuderias </h4>";
                $this->arrayArrayToList($escuderias,"ol");
                echo "</section>";
                echo "<section><h4> Fichajes </h4>";
                $this->arrayArrayToList($fichajes,"ol");
                echo "</section>";
                echo "<section><h4> Asignaciones </h4>";
                $this->arrayArrayToList($asignaciones,"ol");
                echo "</section>";
                echo "</article>";
            }

            function arrayArrayToList($array, $tipo){
                echo "<".$tipo.">";
                for( $i= 0;$i<count($array);$i++){
                    $element =$array[$i];
                    echo "<li>";
                    $this->arrayToDL($element);
                    echo "</li>";
                }
                
                echo "</".$tipo.">";
            }
            function arrayToDL($array){
                echo "<dl>";
                $keys = array_keys($array);
                for ($i=0; $i<count($keys); $i++){
                    $key = $keys[$i];
                    echo "<dt>". $key ."</dt>";
                    echo "<dd>" . $array[$key]."</dd>";
                }
                echo "</dl>";
            }

            
        }
        $fichajes = new Fichajes();
        
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
        <article>
            <h3>Manejo de datos</h3>
            <form method="post" action="#" name="inicializar">
                <label>
                    <input type="submit" name="inicializar">
                    Crear base de datos y tablas
                </label>
            </form>
            <form enctype="multipart/form-data" method="post" action="#" name="cargar">
                <label>
                    <input type="file" name="ficheroCargar" title="ficheroCargar"> 
                    Fichero a cargar
                </label>
                <label>
                    <input type="submit" name="cargar">
                    Cargar
                </label>
            </form>
            <form method="post" action="#" name="exportarDatos">
                <label>
                    <input type="text" name="ficheroExportar" title="ficheroExportar"> 
                    Nombre del fichero
                </label>
                <label>
                    <input type="submit" name="exportar">
                    Exportar
                </label>
            </form>
        </article>
        <?php 
            if(isset($_POST["inicializar"])){
                $fichajes->setup();
            }
            if(isset($_POST["cargar"])){
                $fichajes->importFromCSV();
            }
            
        ?>
        <article>
            <h3>Formulario de fichaje</h3>
            <form method="post" action="#" name="fichar">
                <label>
                    <input type="text" name="pilotofichar" title="pilotofichar"> 
                    Nombre del piloto
                </label>
                <label>
                    <input type="text" name="escuderiafichar" title="escuderiafichar"> 
                    Nombre de la escudería
                </label>
                <label>
                    <input type="submit" name="fichar">
                    Fichar
                </label>
            </form>
        </article>

        <?php 
            if(isset($_POST["fichar"])){
                $piloto = $_POST["pilotofichar"];
                $escuderia = $_POST["escuderiafichar"];
                $fichajes->fichar($piloto,$escuderia);
            }
        ?>

        <article>
            <h3>Formulario de asignación a coche</h3>
            <form method="post" action="#" name="asignar">
                <label>
                    <input type="text" name="pilotoasignar" title="pilotoasignar"> 
                    Nombre del piloto
                </label>
                <label>
                    <input type="text" name="cocheasignar" title="cocheasignar"> 
                    Nombre del coche
                </label>
                <label>
                    <input type="submit" name="asignar">
                    Asignar coche
                </label>
            </form>
        </article>

        <?php 
            if(isset($_POST["asignar"])){
                $piloto = $_POST["pilotoasignar"];
                $coche = $_POST["cocheasignar"];
                $fichajes->asignar($piloto,$coche);
            }
            $fichajes->printInfo();
        ?>
        
        <!-- Datos con el contenidos que aparece en el navegador -->
        <p>En desarrollo</p>
    </main>
    
    

    <footer>
        <p>En desarrollo</p>
    </footer>

</body>
</html>