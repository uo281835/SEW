import xml.etree.ElementTree as ET

def escrituraPrologo():
    result = ""

    return result

def escrituraEpilogo():
    result =""

    return result

def escrituraRuta():
    lista = [1,2,4,5]
    result =""
    for i in lista:
        result+=escrituraPunto(i)
    return result

def escrituraPunto(punto):
    result =""

    return result

def crearSVG():
    result =""
    result+=escrituraPrologo()
    result+=escrituraRuta()
    result+=escrituraEpilogo()
    return result

def main():
    resultado = crearSVG()
    print(resultado)