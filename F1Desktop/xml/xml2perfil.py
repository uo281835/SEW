import xml.etree.ElementTree as ET


##EXPRESIONES XPATH
##TODOS LOS TRAMOS : */tramo
##TODOS LOS PUNTOS : */tramo/punto

nombreFichero = "F1Desktop/xml/circuitoEsquema.xml"
nombreSalida = "F1Desktop/xml/perfil"


def escrituraPrologo(archivo, nombre):
    archivo.write('<?xml version="1.0" encoding="UTF-8"?>\n')
    archivo.write('<svg xmlns="http://www.w3.org/2000/svg" version="2.0">\n')
    archivo.write("<polyline points =\"0,100 \n")


def escrituraEpilogo(archivo, distancia):
    archivo.write(str(distancia/10)+",100 \" stroke=\"red\"/>\n")
    archivo.write("</svg>\n")

def tramoToKML(elemento, archivo, distanciaPrevia):
 
  coordenadas = elemento.find('{http://www.uniovi.es}punto/{http://www.uniovi.es}coordenadas')
  altitud = coordenadas.find('{http://www.uniovi.es}altura')
  distancia = elemento.find('{http://www.uniovi.es}distancia')
  distanciaReal = distanciaPrevia + float(distancia.text)
  texto =str(distanciaReal/10)+","+str((-float(altitud.text)/4+100))+" \n"
  archivo.write(texto)
  return float(distancia.text)

def main():
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

  expresionXPath = "*/{http://www.uniovi.es}tramo"

  resultadoExpresion = raiz.findall(expresionXPath)

  distancia =0
  # Recorrido de los tramos
  for hijo in resultadoExpresion:
    distancia+=tramoToKML(hijo, salida, distancia)


  escrituraEpilogo(salida, distancia)
  salida.close()

if __name__ == "__main__":
    main()
