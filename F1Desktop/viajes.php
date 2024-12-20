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

    <link rel="icon" href="multimedia/imagenes/favicon.ico"/>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <script src="js/viajes.js"></script>
   

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
                    $titulos = $foto->title;
                    $titulo = explode(",", $titulos)[0];
                    $URLfoto = $foto->media->m;
                    echo "<img alt='".$titulo."' src='".$URLfoto."' />";
                }
                echo "<button> &gt; </button>";
                echo "<button> &lt; </button>";
            }
        }
    ?>
    <?php 
        class Moneda{
            private $monedaLocal;
            private $monedaCambio;
            public function __construct($monedaLocal, $monedaCambio){
                $this->monedaLocal = $monedaLocal;
                $this->monedaCambio = $monedaCambio;
            }

            public function getConversion(){
                $req_url = 'https://v6.exchangerate-api.com/v6/666b793aee1fbfb7e66bd140/latest/'.$this->monedaLocal;
                $response_json = file_get_contents($req_url);
                
                // Continuing if we got a result
                if(false !== $response_json) {
                
                    // Try/catch for json_decode operation
                    try {
                
                        // Decoding
                        $response = json_decode($response_json, true);
                
                        // Check for success
                        if('success' === $response["result"]) {
                
                            // YOUR APPLICATION CODE HERE, e.g.
                            $base_price = 1; // Your price in EUR



                            $EUR_price = round(($base_price * $response["conversion_rates"][$this->monedaCambio]), 2);
                            echo '<p>  '.$base_price.' Yen equivale a '.$EUR_price. '€<p>';
                
                        }
                
                    }
                    catch(Exception $e) {
                        echo ''.$e->getMessage().'';
                    }
                
                }
            }
        }
    ?>
</head>

<body>
    <header>
    <h1><a href="index.html">F1 Desktop</a></h1>
        <nav>
            <a href="index.html">Inicio</a>
            <a href="piloto.html" >Piloto</a>
            <a href="noticias.html">Noticias</a>
            <a href="calendario.html">Calendario</a>
            <a href="meteorologia.html">Meteorología</a>
            <a href="circuito.html">Circuito</a>
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
        <label for="mapaEstatico">
            <input id="mapaEstatico" type="button" value="Obtener mapa estatico" onclick="viajes.showMap();">
            Obtener mapa dinamico
        </label>
        <label for="mapaDinamico">
            <input id="mapaDinamico" type="button" value="Obtener mapa dinamico" onclick="viajes.showDynamicMap();">
            Obtener mapa dinamico
        </label>
        <div>
            
        </div>
        
        <script>
            var viajes = new Viajes();
        </script>
        <section>
            <h3>Carrousel</h3>
            <article>
                <h4>Imágenes del carrousel</h4>
                <section>
                    <h5>Pulse los dos botones para cambiar de foto</h5>
                <?php 
                $carrousel = new Carrusel("tokio","japon");
                $carrousel->crearCarrusel(10);
            ?>
                </section>
                
            </article>
           
            <script>
                viajes.inicializarCarrousel();
            </script>
        </section>
        <article>
            <h3>Monedas</h3>
            <?php 
                $moneda = new Moneda("JPY","EUR");
                $moneda->getConversion();
            ?>
        </article>
    </main>

    <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDVkddr_A68D5JGmQs9oomuHKdVAiKBEjc" ></script>

    <footer>
        <p>En desarrollo</p>
    </footer>

</body>
</html>