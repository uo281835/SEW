<!DOCTYPE HTML>
<html lang="es">
<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <title>F1Desktop - Viajes</title>
    <meta name="author" content="Juan Gómez Tejeda"/>
    <meta name="description" content="Reserva de viajes"/>
    <meta name="keywords" content="f1, formula1, viajes, turismo, reserva"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/> 
    <link rel="stylesheet" type="text/css" href="estilo/estilo.css" />
    <link rel="stylesheet" type="text/css" href="estilo/layout.css" />
    <link rel="stylesheet" type="text/css" href="estilo/carrusel.css" />

    <link rel="icon" href="multimedia/imagenes/favicon.ico"/>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <script src="/F1Desktop/js/viajes.js"></script>
   

    <?php 
        class Carrusel{

            private $nombreCapital;
            private $nombrePais;
            private $fotos;

            public function __construct($nombreCapital, $nombrePais){
                $this->nombreCapital = $nombreCapital;
                $this->nombrePais = $nombrePais;
                $this->fotos = array();
            }

            public function getImages($amount){
                $api_key = '0565634739c78dcdbf56368cb0991f0b';
                $tag = $this->nombreCapital.",".$this->nombrePais;
                $perPage = $amount;
                // Fotos públicas recientes
                $url = 'http://api.flickr.com/services/feeds/photos_public.gne?';
                $url.= '&api_key='.$api_key;
                $url.= '&tags='.$tag;
                $url.= '&per_page='.$perPage;
                $url.= '&format=json';
                $url.= '&nojsoncallback=1';
                
                $respuesta = file_get_contents($url);
                $json = json_decode($respuesta);
                
                for($i=0;$i<$perPage;$i++) {
                    $foto = $json->items[$i];
                    array_push($this->fotos, $foto);
                }

                if($json==null) {
                    echo "<h3>Error en el archivo JSON recibido</h3>";
                }
                else {
                    echo "<h3>JSON decodificado correctamente</h3>";
                }
            }

            public function crearCarrusel($amount){
                $this->getImages($amount);
                for($i=0;$i<count($this->fotos);$i++) {
                    $foto = $this->fotos[$i];
                    $titulo = $foto->title;
                    $URLfoto = $foto->media->m;
                    echo "<img alt='".$titulo."' src='".$URLfoto."' />";
                }
                echo "<button> &gt; </button>"
                echo "<button> &lt; </button>"
            }
        }
    ?>
</head>

<body>
    <header>
        <h1>F1 Desktop</h1>
        <nav>
            <a href="index.html">Inicio</a>
            <a href="piloto.html" >Piloto</a>
            <a href="noticias.html">Noticias</a>
            <a href="calendario.html">Calendario</a>
            <a href="meteorologia.html">Meteorología</a>
            <a href="circuito.html">Cicuito</a>
            <a href="viajes.php" class="active">Viajes</a>
            <a href="juegos.html">Juegos</a>
        </nav>
    </header>
    <p><a href="index.html">Inicio</a> >> Viajes</p>

    <h2>Viajes</h2>
    <!-- Datos con el contenidos que aparece en el navegador -->
    <p>En desarrollo</p>
    <main>
        <h3>Mapa</h3>
        <article id="mapa">
            <p>aaa</p>
            <div ></div>
        </article>
        <script>
            var viajes = new Viajes();
        </script>
        <article>
            <h3>Carrousel</h3>
            <?php 
                $carrousel = new Carrousel("tokio","japon");
                $carrousel->crearCarrusel(10);
            ?>
            <script>
                viajes.inicializarCarrousel();
            </script>
        </article>
    </main>

    <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU&callback=viajes.showDynamicMap" ></script>

    <footer>
        <p>En desarrollo</p>
    </footer>

</body>
</html>