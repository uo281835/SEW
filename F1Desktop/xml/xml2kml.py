import xml.etree.ElementTree as ET


##EXPRESIONES XPATH
##TODOS LOS TRAMOS : */tramo
##TODOS LOS PUNTOS : */tramo/punto

nombreFichero = "circuito.xml"
nombreSalida = "circuito"


def escrituraPrologo(archivo, nombre):
    result = ""
    """ Escribe en el archivo de salida el prólogo del archivo KML"""

    archivo.write('<?xml version="1.0" encoding="UTF-8"?>\n')
    archivo.write('<kml xmlns="http://www.opengis.net/kml/2.2">\n')
    archivo.write("<Document>\n")
    archivo.write("<Placemark>\n")
    archivo.write("<name> "+nombre+"</name>\n")
    archivo.write("<LineString>\n")
    # la etiqueta <extrude> extiende la línea hasta el suelo
    archivo.write("<extrude>1</extrude>\n")
    # La etiqueta <tessellate> descompone la línea en porciones pequeñas
    archivo.write("<tessellate>1</tessellate>\n")
    archivo.write("<coordinates>\n")
    return result


def escrituraEpilogo(archivo):
    result =""
    """ Escribe en el archivo de salida el epílogo del archivo KML"""

    archivo.write("</coordinates>\n")
    archivo.write("<altitudeMode>relativeToGround</altitudeMode>\n")
    archivo.write("</LineString>\n")
    archivo.write("<Style> id='lineaRoja'>\n")
    archivo.write("<LineStyle>\n")
    archivo.write("<color>#ff0000ff</color>\n")
    archivo.write("<width>5</width>\n")
    archivo.write("</LineStyle>\n")
    archivo.write("</Style>\n")
    archivo.write("</Placemark>\n")
    archivo.write("</Document>\n")
    archivo.write("</kml>\n")
    return result





def tramoToKML(elemento, archivo):
  print(elemento.tag)
  coordenadas = elemento.find('punto/coordenadas')
  print(coordenadas.tag)
  longitud = coordenadas.find('longitud')
  latitud = coordenadas.find('latitud')
  altitud = coordenadas.find('altura')
  print(longitud.text,",",latitud.text,",",altitud.text)
  texto = longitud.text+","+latitud.text+","+altitud.text+ "\n"
  archivo.write(texto)

def main():
  print(main.__doc__)
  ##Abre el archivo xml
  try:
    archivo = open(nombreFichero, 'r')
  except IOError:
    print('No se encuentra el archivo ', nombreFichero)
    exit()

  ##Crea el archivo kml
  try:
    salida = open(nombreSalida + ".kml", 'w')
  except IOError:
    print('No se puede crear el archivo ', nombreSalida + ".kml")
    exit()

  # Escribe la cabecera del archivo de salida
  escrituraPrologo(salida, nombreFichero)

  # Parsea el archivo
  try:
    arbol = ET.parse(nombreFichero)

  except IOError:
    print('No se encuentra el archivo ', nombreFichero)
    exit()

  except ET.ParseError:
    print("Error procesando en el archivo XML = ", nombreFichero)
    exit()

  raiz = arbol.getroot()

  expresionXPath = "*/tramo"

  resultadoExpresion = raiz.findall(expresionXPath)

  # Recorrido de los tramos
  for hijo in resultadoExpresion:
    tramoToKML(hijo, salida)

  escrituraEpilogo(salida)
  salida.close()

if __name__ == "__main__":
    main()
