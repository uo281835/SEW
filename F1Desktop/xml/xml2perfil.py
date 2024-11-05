import xml.etree.ElementTree as ET


##EXPRESIONES XPATH
##TODOS LOS TRAMOS : */tramo
##TODOS LOS PUNTOS : */tramo/punto

nombreFichero = "circuito.xml"
nombreSalida = "circuito"


def escrituraPrologo(archivo, nombre):
    archivo.write('<?xml version="1.0" encoding="UTF-8"?>\n')
    archivo.write('<svg xmlns="http://www.w3.org/2000/svg" version="2.0">\n')
    archivo.write("<polyline points =\"0,0 \n")


def escrituraEpilogo(archivo):
    archivo.write("0,0 \" stroke=\"red\"/>\n")
    archivo.write("</svg>\n")

def tramoToKML(elemento, archivo):
  print(elemento.tag)
 
  coordenadas = elemento.find('punto/coordenadas')
  print(coordenadas.tag)
  altitud = coordenadas.find('altura')
  distancia = archivo.find('distancia')
  texto =distancia.text+","+altitud.text+" \n"
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
    salida = open(nombreSalida + ".svg", 'w')
  except IOError:
    print('No se puede crear el archivo ', nombreSalida + ".svg")
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
