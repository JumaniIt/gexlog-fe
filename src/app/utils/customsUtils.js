export const getOperativeSites = () => {
  if (!operativeSitesStr.length) {
    loadOperativeSites();
  }

  return operativeSitesStr;
};

const loadOperativeSites = () => {
  operativeSites.map((os) => {
    const customs = os.ADUANA;
    const aggZerosQty = 3 - customs.length;

    // Add leading zeros to the "CUSTOMS" column
    const customsWithZeros = "0".repeat(aggZerosQty) + customs;

    const osStr = `${os.LUGAR}-${customsWithZeros}-${os.CODIGO}`;
    operativeSitesStr.push(osStr);
  });
};

const operativeSitesStr = [];

const operativeSites = [
  {
    ADUANA: "1",
    CODIGO: "10056",
    LUGAR: "TERMINAL 5",
  },
  {
    ADUANA: "1",
    CODIGO: "10057",
    LUGAR: "TERMINAL 1 2 Y 3",
  },
  {
    ADUANA: "1",
    CODIGO: "10068",
    LUGAR: "TERMINAL. 4",
  },
  {
    ADUANA: "1",
    CODIGO: "10073",
    LUGAR: "TERMINAL SUR",
  },
  {
    ADUANA: "1",
    CODIGO: "11002",
    LUGAR: "AVELLANEDA SUR",
  },
  {
    ADUANA: "1",
    CODIGO: "11003",
    LUGAR: "DEPOSITO MOREIRO HNOS SRL",
  },
  {
    ADUANA: "1",
    CODIGO: "11005",
    LUGAR: "SAF",
  },
  {
    ADUANA: "1",
    CODIGO: "11007",
    LUGAR: "CAPITAN CORTES MADERO",
  },
  {
    ADUANA: "1",
    CODIGO: "11011",
    LUGAR: "S.A.DOCKS",
  },
  {
    ADUANA: "1",
    CODIGO: "11012",
    LUGAR: "FEPORT SA",
  },
  {
    ADUANA: "1",
    CODIGO: "11021",
    LUGAR: "LO PRIMO I",
  },
  {
    ADUANA: "1",
    CODIGO: "11028",
    LUGAR: "UNIV. CARGAS",
  },
  {
    ADUANA: "1",
    CODIGO: "11037",
    LUGAR: "COCO OIL S.A.",
  },
  {
    ADUANA: "1",
    CODIGO: "11044",
    LUGAR: "T.A.G.S.A.",
  },
  {
    ADUANA: "1",
    CODIGO: "11045",
    LUGAR: "Y.P.F. S.A.",
  },
  {
    ADUANA: "1",
    CODIGO: "11050",
    LUGAR: "GARGANO",
  },
  {
    ADUANA: "1",
    CODIGO: "11058",
    LUGAR: "MARUBA SCA.",
  },
  {
    ADUANA: "1",
    CODIGO: "11069",
    LUGAR: "DEP FISCAL DHL",
  },
  {
    ADUANA: "1",
    CODIGO: "11070",
    LUGAR: "TERMINAL PANAMERICANA S.A.",
  },
  {
    ADUANA: "1",
    CODIGO: "11075",
    LUGAR: "EG3 S.A.",
  },
  {
    ADUANA: "1",
    CODIGO: "11079",
    LUGAR: "MATERIA HERMANOS S.A.",
  },
  {
    ADUANA: "1",
    CODIGO: "11080",
    LUGAR: "NTRA. SRA ASUNCION",
  },
  {
    ADUANA: "1",
    CODIGO: "11087",
    LUGAR: "D.A.P.S.A.",
  },
  {
    ADUANA: "1",
    CODIGO: "11089",
    LUGAR: "TRANSTERMINAL SA.",
  },
  {
    ADUANA: "1",
    CODIGO: "11094",
    LUGAR: "COAMTRA S.A.",
  },
  {
    ADUANA: "1",
    CODIGO: "11096",
    LUGAR: "TEFASA I",
  },
  {
    ADUANA: "1",
    CODIGO: "11098",
    LUGAR: "TRANSPORTES PATRON S.A.C.I.F",
  },
  {
    ADUANA: "1",
    CODIGO: "11101",
    LUGAR: "LOGEXPOR",
  },
  {
    ADUANA: "1",
    CODIGO: "11102",
    LUGAR: "SERVIFRIO EZEIZA S.A.",
  },
  {
    ADUANA: "1",
    CODIGO: "11103",
    LUGAR: "GEFCO",
  },
  {
    ADUANA: "1",
    CODIGO: "11107",
    LUGAR: "SOLVAY INDUPA S.A.I.C.",
  },
  {
    ADUANA: "1",
    CODIGO: "11108",
    LUGAR: "PETROLERA DEL CONO SUR S.A.",
  },
  {
    ADUANA: "1",
    CODIGO: "11109",
    LUGAR: "LOGINTER SA",
  },
  {
    ADUANA: "1",
    CODIGO: "11112",
    LUGAR: "LOINEX S.A.",
  },
  {
    ADUANA: "1",
    CODIGO: "11113",
    LUGAR: "TRANSPORTES MONTALVAN S.A.",
  },
  {
    ADUANA: "1",
    CODIGO: "11201",
    LUGAR: "ABBOTT LABORATORIES",
  },
  {
    ADUANA: "1",
    CODIGO: "12023",
    LUGAR: "COLORIN S.A",
  },
  {
    ADUANA: "1",
    CODIGO: "12026",
    LUGAR: "LIBERTADOR MOTORS",
  },
  {
    ADUANA: "1",
    CODIGO: "12031",
    LUGAR: "PRODMET",
  },
  {
    ADUANA: "1",
    CODIGO: "12052",
    LUGAR: "ILVA",
  },
  {
    ADUANA: "1",
    CODIGO: "12090",
    LUGAR: "EDITORIAL PERFIL",
  },
  {
    ADUANA: "1",
    CODIGO: "12106",
    LUGAR: "SAFETY INTERNACIONAL",
  },
  {
    ADUANA: "1",
    CODIGO: "12110",
    LUGAR: "AEROCARGAS ARGENTINAS S.A.",
  },
  {
    ADUANA: "1",
    CODIGO: "42001",
    LUGAR: "TALLERES NAVALES DAR N S.A.",
  },
  {
    ADUANA: "1",
    CODIGO: "42952",
    LUGAR: "DARSENA SUR ESTE (A.G.P)",
  },
  {
    ADUANA: "1",
    CODIGO: "60016",
    LUGAR: "DIV CONTROL Y FISCALIZ OPERATIVA 1",
  },
  {
    ADUANA: "1",
    CODIGO: "60100",
    LUGAR: "MUELLE INT. TIGRE",
  },
  {
    ADUANA: "1",
    CODIGO: "60200",
    LUGAR: "SECC. DIQUE 1 Y DEP. CAPITAL",
  },
  {
    ADUANA: "1",
    CODIGO: "60400",
    LUGAR: "SECC. ZONA SUD Y DEP. FISC. ZON",
  },
  {
    ADUANA: "1",
    CODIGO: "60500",
    LUGAR: "SECC. ZONA TIGRE",
  },
  {
    ADUANA: "1",
    CODIGO: "60600",
    LUGAR: "TERMINAL BUQUEBUS",
  },
  {
    ADUANA: "1",
    CODIGO: "60700",
    LUGAR: "TERMINAL BENITO QUINQUELA MARTIN",
  },
  {
    ADUANA: "1",
    CODIGO: "60800",
    LUGAR: "TERMINAL COLONIA EXPRESS",
  },
  {
    ADUANA: "1",
    CODIGO: "75002",
    LUGAR: "KCK",
  },
  {
    ADUANA: "1",
    CODIGO: "75095",
    LUGAR: "FIAT AUTO ARGENTINA S.A.",
  },
  {
    ADUANA: "1",
    CODIGO: "75111",
    LUGAR: "ABBOTT LABORATORIES ARG. S.A.",
  },
  {
    ADUANA: "1",
    CODIGO: "76034",
    LUGAR: "FORD ARGENTINA S.C.A.",
  },
  {
    ADUANA: "3",
    CODIGO: "60001",
    LUGAR: "CGP ING WHITE MUELLE 17 18",
  },
  {
    ADUANA: "3",
    CODIGO: "60002",
    LUGAR: "CGP ING WHITE MUELLE 19 20",
  },
  {
    ADUANA: "3",
    CODIGO: "60003",
    LUGAR: "CGP ING WHITE MUELLE 5 Y 6",
  },
  {
    ADUANA: "3",
    CODIGO: "60004",
    LUGAR: "CGP ING WHITE MUELLE 7 Y 8",
  },
  {
    ADUANA: "3",
    CODIGO: "60005",
    LUGAR: "CGP ING WHITE MUELLE 9",
  },
  {
    ADUANA: "3",
    CODIGO: "60007",
    LUGAR: "MUELLE CARGILL",
  },
  {
    ADUANA: "3",
    CODIGO: "60009",
    LUGAR: "GLENCORE CEREALES",
  },
  {
    ADUANA: "3",
    CODIGO: "60010",
    LUGAR: "MUELLE PROFERTIL",
  },
  {
    ADUANA: "3",
    CODIGO: "60011",
    LUGAR: "COMPANIA MEGA SA",
  },
  {
    ADUANA: "3",
    CODIGO: "60012",
    LUGAR: "PTO GALVAN SITIO 5",
  },
  {
    ADUANA: "3",
    CODIGO: "60013",
    LUGAR: "PTO GALVAN SITIO 6",
  },
  {
    ADUANA: "3",
    CODIGO: "60014",
    LUGAR: "PTO GALVAN POSTA 1",
  },
  {
    ADUANA: "3",
    CODIGO: "60015",
    LUGAR: "PTO GALVAN POSTA 2",
  },
  {
    ADUANA: "3",
    CODIGO: "60016",
    LUGAR: "OLEGINOSAS MORENO",
  },
  {
    ADUANA: "3",
    CODIGO: "60017",
    LUGAR: "MUELLE UTE",
  },
  {
    ADUANA: "3",
    CODIGO: "60025",
    LUGAR: "MUELLE PUERTO ROSALES",
  },
  {
    ADUANA: "3",
    CODIGO: "60026",
    LUGAR: "MUELLE SITIO 21",
  },
  {
    ADUANA: "3",
    CODIGO: "61021",
    LUGAR: "MONOBOYA 1",
  },
  {
    ADUANA: "3",
    CODIGO: "61022",
    LUGAR: "MONOBOYA 2",
  },
  {
    ADUANA: "3",
    CODIGO: "61023",
    LUGAR: "BOYA 17 FONDEADERO",
  },
  {
    ADUANA: "3",
    CODIGO: "63024",
    LUGAR: "BOYA 11 ZONA ALIJE",
  },
  {
    ADUANA: "3",
    CODIGO: "63032",
    LUGAR: "ZONA ALIJE FARO RINCON",
  },
  {
    ADUANA: "3",
    CODIGO: "65001",
    LUGAR: "BASE NAVAL PUERTO BELGRANO",
  },
  {
    ADUANA: "3",
    CODIGO: "88006",
    LUGAR: "ITALMAX SOCIEDAD ANONIMA",
  },
  {
    ADUANA: "3",
    CODIGO: "88009",
    LUGAR: "GEOMIEL SA",
  },
  {
    ADUANA: "3",
    CODIGO: "88011",
    LUGAR: "DEPOSITO PUBLICO-ZFP",
  },
  {
    ADUANA: "3",
    CODIGO: "88027",
    LUGAR: "PRODUCTOS PAMPEANOS SA",
  },
  {
    ADUANA: "3",
    CODIGO: "88039",
    LUGAR: "CASTRO MARCELO DANIEL",
  },
  {
    ADUANA: "4",
    CODIGO: "12003",
    LUGAR: "DEPOSITO INVAP SE",
  },
  {
    ADUANA: "4",
    CODIGO: "43004",
    LUGAR: "PASO VICENTE PEREZ ROSALES",
  },
  {
    ADUANA: "8",
    CODIGO: "10090",
    LUGAR: "DEPOSITO TERMINAL ZA",
  },
  {
    ADUANA: "8",
    CODIGO: "11012",
    LUGAR: "DEPOSITO COMERCIAL SAN PATRICIO SRL",
  },
  {
    ADUANA: "8",
    CODIGO: "11020",
    LUGAR: "DEPOSITO CARBOCLOR",
  },
  {
    ADUANA: "8",
    CODIGO: "11031",
    LUGAR: "DEPOSITO MARIPASA",
  },
  {
    ADUANA: "8",
    CODIGO: "11050",
    LUGAR: "DEPOSITO EUROAMERICA",
  },
  {
    ADUANA: "8",
    CODIGO: "11060",
    LUGAR: "DEPOSITO VITCO",
  },
  {
    ADUANA: "8",
    CODIGO: "11130",
    LUGAR: "DEPOSITO SERVITRUCK",
  },
  {
    ADUANA: "8",
    CODIGO: "11170",
    LUGAR: "DEPOSITO TAGSA",
  },
  {
    ADUANA: "8",
    CODIGO: "11180",
    LUGAR: "DEPOSITO FISCAL DELTA DOCK",
  },
  {
    ADUANA: "8",
    CODIGO: "11189",
    LUGAR: "TRANSPORTE PADILLA SA",
  },
  {
    ADUANA: "8",
    CODIGO: "11190",
    LUGAR: "DEPOSITO MOLCA",
  },
  {
    ADUANA: "8",
    CODIGO: "11200",
    LUGAR: "PUERTO SECO Y LOGISTICA CHIVILCOY A",
  },
  {
    ADUANA: "8",
    CODIGO: "11250",
    LUGAR: "COLD LAND SA",
  },
  {
    ADUANA: "8",
    CODIGO: "12040",
    LUGAR: "DEPOSITO SIDERCA",
  },
  {
    ADUANA: "8",
    CODIGO: "12080",
    LUGAR: "LA PAPELERA DEL PLATA",
  },
  {
    ADUANA: "8",
    CODIGO: "12140",
    LUGAR: "DEPOSITO TOYOTA ARGENTINA",
  },
  {
    ADUANA: "8",
    CODIGO: "60021",
    LUGAR: "MUELLE CARBOCLOR",
  },
  {
    ADUANA: "8",
    CODIGO: "60030",
    LUGAR: "MUELLE MARIPASA",
  },
  {
    ADUANA: "8",
    CODIGO: "60035",
    LUGAR: "PAE SUCURSAL",
  },
  {
    ADUANA: "8",
    CODIGO: "60041",
    LUGAR: "MUELLE SIDERCA",
  },
  {
    ADUANA: "8",
    CODIGO: "60051",
    LUGAR: "MUELLE EUROAMERICA",
  },
  {
    ADUANA: "8",
    CODIGO: "60061",
    LUGAR: "MUELLE VITCO",
  },
  {
    ADUANA: "8",
    CODIGO: "60071",
    LUGAR: "MUELLE RHASA",
  },
  {
    ADUANA: "8",
    CODIGO: "60091",
    LUGAR: "MUELLE TERMINAL ZARATE",
  },
  {
    ADUANA: "8",
    CODIGO: "60171",
    LUGAR: "MUELLE TAGSA",
  },
  {
    ADUANA: "8",
    CODIGO: "60190",
    LUGAR: "MUELLE DEPSA",
  },
  {
    ADUANA: "8",
    CODIGO: "60195",
    LUGAR: "MUELLE 1 DELTA DOCK",
  },
  {
    ADUANA: "8",
    CODIGO: "60196",
    LUGAR: "MUELLE 2 DELTA DOCK",
  },
  {
    ADUANA: "8",
    CODIGO: "60198",
    LUGAR: "MUELLE 1 MOLCA",
  },
  {
    ADUANA: "8",
    CODIGO: "60204",
    LUGAR: "MUELLE 2 MOLCA",
  },
  {
    ADUANA: "8",
    CODIGO: "64001",
    LUGAR: "RIO PARANA GUAZU KM 171",
  },
  {
    ADUANA: "8",
    CODIGO: "64002",
    LUGAR: "ZONA BRAVO",
  },
  {
    ADUANA: "8",
    CODIGO: "64003",
    LUGAR: "ZONA CHARLIE",
  },
  {
    ADUANA: "8",
    CODIGO: "64004",
    LUGAR: "ZONA COMUN",
  },
  {
    ADUANA: "8",
    CODIGO: "64005",
    LUGAR: "ZONA ALPHA",
  },
  {
    ADUANA: "8",
    CODIGO: "75042",
    LUGAR: "DOMICILIARIA SIDERCA",
  },
  {
    ADUANA: "8",
    CODIGO: "75141",
    LUGAR: "DOMICILIARIA TOYOTA",
  },
  {
    ADUANA: "8",
    CODIGO: "75303",
    LUGAR: "HONDA MOTOR DE ARG SA",
  },
  {
    ADUANA: "10",
    CODIGO: "43001",
    LUGAR: "PASO PUERTO BERMEJO-PUERTO PILAR",
  },
  {
    ADUANA: "10",
    CODIGO: "60001",
    LUGAR: "RESGUARDO PRINCIPAL ZPA",
  },
  {
    ADUANA: "10",
    CODIGO: "60003",
    LUGAR: "MUELLE ELV Y ACOPIO BARRANQUERAS",
  },
  {
    ADUANA: "12",
    CODIGO: "11002",
    LUGAR: "DEPOSITO FISCAL BUENOS AIRES SA",
  },
  {
    ADUANA: "12",
    CODIGO: "43001",
    LUGAR: "PASO PTO PILCOMAYO-PTO ITA ENRAMADA",
  },
  {
    ADUANA: "12",
    CODIGO: "60001",
    LUGAR: "PILCOMAYO",
  },
  {
    ADUANA: "14",
    CODIGO: "11145",
    LUGAR: "ADM PORT DEL PUERTO COMODORO RIVA",
  },
  {
    ADUANA: "14",
    CODIGO: "42111",
    LUGAR: "ZONA PRIMARIA-PTO C RIVADAVIA",
  },
  {
    ADUANA: "14",
    CODIGO: "88007",
    LUGAR: "NOVOMET ARGENTINA SA",
  },
  {
    ADUANA: "14",
    CODIGO: "88008",
    LUGAR: "VENVER SA",
  },
  {
    ADUANA: "14",
    CODIGO: "88009",
    LUGAR: "NRG PATAGONIA SA",
  },
  {
    ADUANA: "14",
    CODIGO: "88148",
    LUGAR: "NESTOR ALVAREZ ZF",
  },
  {
    ADUANA: "14",
    CODIGO: "88152",
    LUGAR: "MACRO-RENT SRL ZF",
  },
  {
    ADUANA: "14",
    CODIGO: "88154",
    LUGAR: "ALAR SUR ALARM ZF",
  },
  {
    ADUANA: "14",
    CODIGO: "88159",
    LUGAR: "ALFREDO GARCIA ZF",
  },
  {
    ADUANA: "14",
    CODIGO: "88168",
    LUGAR: "FABIAN MACAGLIA ZF",
  },
  {
    ADUANA: "14",
    CODIGO: "88175",
    LUGAR: "HALLIBURTON ARG ZF",
  },
  {
    ADUANA: "14",
    CODIGO: "88182",
    LUGAR: "ESTRELLA S PET ZF",
  },
  {
    ADUANA: "14",
    CODIGO: "88183",
    LUGAR: "BAKER HUGHES AR ZF",
  },
  {
    ADUANA: "14",
    CODIGO: "88190",
    LUGAR: "SERVICIOS PETROLEROS DEL GOLFO SA",
  },
  {
    ADUANA: "14",
    CODIGO: "88191",
    LUGAR: "BAHIA BLANCA VIVIENDAS SRL",
  },
  {
    ADUANA: "15",
    CODIGO: "11002",
    LUGAR: "TERMINAL PUERTO CONCEP DEL URUGUAY",
  },
  {
    ADUANA: "15",
    CODIGO: "60015",
    LUGAR: "PUERTO C DEL URUGUAY",
  },
  {
    ADUANA: "15",
    CODIGO: "60020",
    LUGAR: "PUERTO C DEL URUGUAY",
  },
  {
    ADUANA: "15",
    CODIGO: "60023",
    LUGAR: "PUERTO C DEL URUGUAY",
  },
  {
    ADUANA: "16",
    CODIGO: "42001",
    LUGAR: "RESGUARDO AYUI Z P A (C T M)",
  },
  {
    ADUANA: "16",
    CODIGO: "43001",
    LUGAR: "PASO PUERTO CONCORDIA-PUERTO SALTO",
  },
  {
    ADUANA: "17",
    CODIGO: "11001",
    LUGAR: "AEROPUERTOS ARGENTINA 2000 S A",
  },
  {
    ADUANA: "17",
    CODIGO: "11004",
    LUGAR: "TORTONE S A",
  },
  {
    ADUANA: "17",
    CODIGO: "11033",
    LUGAR: "CAROSSIO VAIROLATTI",
  },
  {
    ADUANA: "17",
    CODIGO: "11038",
    LUGAR: "CAMARA DE COMERCIO",
  },
  {
    ADUANA: "17",
    CODIGO: "11046",
    LUGAR: "DF ZOFRACOR SA",
  },
  {
    ADUANA: "17",
    CODIGO: "12023",
    LUGAR: "MWM INT MOTORES SA BOSAL ARG SA",
  },
  {
    ADUANA: "17",
    CODIGO: "12043",
    LUGAR: "ALLADIO E HIJOS SA",
  },
  {
    ADUANA: "17",
    CODIGO: "13040",
    LUGAR: "FABRICA ARG DE AVIONES BRIG SAN MAR",
  },
  {
    ADUANA: "17",
    CODIGO: "20006",
    LUGAR: "ZPCA ZF CORDOBA",
  },
  {
    ADUANA: "17",
    CODIGO: "75007",
    LUGAR: "RENAULT ARGENTINA SA",
  },
  {
    ADUANA: "17",
    CODIGO: "75009",
    LUGAR: "A D VOLKSWAGEN ARGENTINA",
  },
  {
    ADUANA: "17",
    CODIGO: "75037",
    LUGAR: "FIAT AUTO ARGENTINA",
  },
  {
    ADUANA: "17",
    CODIGO: "75042",
    LUGAR: "IVECO ARG SA",
  },
  {
    ADUANA: "17",
    CODIGO: "75777",
    LUGAR: "ARCOR COLONIA CAROYA",
  },
  {
    ADUANA: "17",
    CODIGO: "75778",
    LUGAR: "ARCOR ARROYITO",
  },
  {
    ADUANA: "17",
    CODIGO: "88101",
    LUGAR: "PUBLICO ZOFRACOR",
  },
  {
    ADUANA: "17",
    CODIGO: "88102",
    LUGAR: "ZOFRACOR SA",
  },
  {
    ADUANA: "17",
    CODIGO: "88103",
    LUGAR: "PROMEDON ZONA FRANCA",
  },
  {
    ADUANA: "17",
    CODIGO: "88106",
    LUGAR: "BENIC SA",
  },
  {
    ADUANA: "18",
    CODIGO: "43001",
    LUGAR: "PASO PTO ITATI-ITA CORA",
  },
  {
    ADUANA: "18",
    CODIGO: "43002",
    LUGAR: "PUERTO PASO DE LA PATRIA",
  },
  {
    ADUANA: "18",
    CODIGO: "43003",
    LUGAR: "PASO PTO ITA IBATE-PANCHITO LOPEZ",
  },
  {
    ADUANA: "18",
    CODIGO: "60100",
    LUGAR: "PUERTO DE CORRIENTES",
  },
  {
    ADUANA: "19",
    CODIGO: "11001",
    LUGAR: "DEPOSITO COSTANERA SA",
  },
  {
    ADUANA: "19",
    CODIGO: "11002",
    LUGAR: "DEPOSITO UNEPOSC",
  },
  {
    ADUANA: "19",
    CODIGO: "11003",
    LUGAR: "PLAZOLETA FISCAL UNEPOSC",
  },
  {
    ADUANA: "19",
    CODIGO: "60001",
    LUGAR: "MUELLE PUERTO DESEADO",
  },
  {
    ADUANA: "19",
    CODIGO: "63001",
    LUGAR: "RADA PUERTO DESEADO",
  },
  {
    ADUANA: "20",
    CODIGO: "60001",
    LUGAR: "CARGILL SACI",
  },
  {
    ADUANA: "20",
    CODIGO: "60002",
    LUGAR: "ENTE AUTARQUICO PUERTO DIAMANTE",
  },
  {
    ADUANA: "23",
    CODIGO: "43001",
    LUGAR: "PASO RIO PUELO (FLUVIAL)",
  },
  {
    ADUANA: "24",
    CODIGO: "43001",
    LUGAR: "PASO PTO COLONIA CANO-PTO PILAR",
  },
  {
    ADUANA: "24",
    CODIGO: "43002",
    LUGAR: "PASO PTO FORMOSA-ALBERDI",
  },
  {
    ADUANA: "26",
    CODIGO: "11002",
    LUGAR: "DEPOSITO DEL GUAZU SA",
  },
  {
    ADUANA: "26",
    CODIGO: "60000",
    LUGAR: "PUERTO IBICUY",
  },
  {
    ADUANA: "26",
    CODIGO: "60001",
    LUGAR: "PUERTO DEL GUAZU",
  },
  {
    ADUANA: "26",
    CODIGO: "60003",
    LUGAR: "TERMINAL PORTUARIA DEL GUAZU",
  },
  {
    ADUANA: "29",
    CODIGO: "20001",
    LUGAR: "ZPCA ZF MAYORISTA",
  },
  {
    ADUANA: "29",
    CODIGO: "20002",
    LUGAR: "ZPCA ZF MINORISTA (TIENDA LIBRE)",
  },
  {
    ADUANA: "29",
    CODIGO: "43001",
    LUGAR: "PASO PUERTO IGUAZU-PUERTO MEIRA",
  },
  {
    ADUANA: "29",
    CODIGO: "43002",
    LUGAR: "PASO PTO IGUAZU-PTO TRES FRONTERAS",
  },
  {
    ADUANA: "29",
    CODIGO: "43003",
    LUGAR: "PASO PTO EL DORADO-PTO MAYOR OTANO",
  },
  {
    ADUANA: "29",
    CODIGO: "88001",
    LUGAR: "ZONA FRANCA PUERTO IGUAZU",
  },
  {
    ADUANA: "29",
    CODIGO: "88003",
    LUGAR: "MADERAS DE MESOPOTAMIA SA",
  },
  {
    ADUANA: "31",
    CODIGO: "42001",
    LUGAR: "ZONA PRIMARIA PALPALA",
  },
  {
    ADUANA: "33",
    CODIGO: "1000C",
    LUGAR: "TECPLATA SA",
  },
  {
    ADUANA: "33",
    CODIGO: "11002",
    LUGAR: "DEPO FIS II CABECERA RIO SANTIAGO",
  },
  {
    ADUANA: "33",
    CODIGO: "11005",
    LUGAR: "ICM EICA SA",
  },
  {
    ADUANA: "33",
    CODIGO: "12477",
    LUGAR: "MAFISSA",
  },
  {
    ADUANA: "33",
    CODIGO: "20021",
    LUGAR: "ZONA FRANCA LA PLATA ZFLP",
  },
  {
    ADUANA: "33",
    CODIGO: "60001",
    LUGAR: "SITIO 7 COPETRO",
  },
  {
    ADUANA: "33",
    CODIGO: "60002",
    LUGAR: "SITIO 8 COPETRO",
  },
  {
    ADUANA: "33",
    CODIGO: "60003",
    LUGAR: "SITIO 9 CONSORCIO",
  },
  {
    ADUANA: "33",
    CODIGO: "60004",
    LUGAR: "SITIO 10 YPF",
  },
  {
    ADUANA: "33",
    CODIGO: "60005",
    LUGAR: "SITIO 11 YPF",
  },
  {
    ADUANA: "33",
    CODIGO: "60006",
    LUGAR: "SITIO 12 YPF",
  },
  {
    ADUANA: "33",
    CODIGO: "60007",
    LUGAR: "SITIO 13 YPF",
  },
  {
    ADUANA: "33",
    CODIGO: "60008",
    LUGAR: "SITIO 14 YPF",
  },
  {
    ADUANA: "33",
    CODIGO: "60009",
    LUGAR: "SITIO 15 YPF",
  },
  {
    ADUANA: "33",
    CODIGO: "60010",
    LUGAR: "SITIO 16 YPF",
  },
  {
    ADUANA: "33",
    CODIGO: "60011",
    LUGAR: "SITIO 17 CONSORCIO",
  },
  {
    ADUANA: "33",
    CODIGO: "60012",
    LUGAR: "SITIO 18 CONSORCIO",
  },
  {
    ADUANA: "33",
    CODIGO: "60013",
    LUGAR: "SITIO 19 CONSORCIO",
  },
  {
    ADUANA: "33",
    CODIGO: "60014",
    LUGAR: "SITIO 20 CONSORCIO",
  },
  {
    ADUANA: "33",
    CODIGO: "60015",
    LUGAR: "SITIO 23 ARS",
  },
  {
    ADUANA: "33",
    CODIGO: "60016",
    LUGAR: "PTO ROCA SIDERAR",
  },
  {
    ADUANA: "33",
    CODIGO: "64000",
    LUGAR: "ZONA DE ALIJE",
  },
  {
    ADUANA: "33",
    CODIGO: "64001",
    LUGAR: "ZONA ALFA",
  },
  {
    ADUANA: "33",
    CODIGO: "64002",
    LUGAR: "ZONA BRAVO",
  },
  {
    ADUANA: "33",
    CODIGO: "64003",
    LUGAR: "ZONA CHARLIE",
  },
  {
    ADUANA: "33",
    CODIGO: "88005",
    LUGAR: "MURUA GUILLERMINA ADRIANA",
  },
  {
    ADUANA: "33",
    CODIGO: "88006",
    LUGAR: "DIXTRA SA",
  },
  {
    ADUANA: "33",
    CODIGO: "88007",
    LUGAR: "ZONA LOGISTICA LOTE 2 Y 15",
  },
  {
    ADUANA: "33",
    CODIGO: "88009",
    LUGAR: "FRANCA IMPEX SA",
  },
  {
    ADUANA: "33",
    CODIGO: "88013",
    LUGAR: "AMERICA INTERCORP SRL",
  },
  {
    ADUANA: "33",
    CODIGO: "88014",
    LUGAR: "AMIPORT SA",
  },
  {
    ADUANA: "33",
    CODIGO: "88037",
    LUGAR: "CANAL SANTIAGO SA",
  },
  {
    ADUANA: "33",
    CODIGO: "88055",
    LUGAR: "COVIALSA S.A.",
  },
  {
    ADUANA: "33",
    CODIGO: "88060",
    LUGAR: "IGARRETA MAQUINAS SA",
  },
  {
    ADUANA: "33",
    CODIGO: "88064",
    LUGAR: "COTIA ALMACENES LA PLATA SA 2",
  },
  {
    ADUANA: "33",
    CODIGO: "88068",
    LUGAR: "EMBASSY ZONA FRANCA SA",
  },
  {
    ADUANA: "33",
    CODIGO: "88069",
    LUGAR: "EMPRENDIMIENTO ZONA FRANCA SA",
  },
  {
    ADUANA: "33",
    CODIGO: "88070",
    LUGAR: "ENSENADA TRAIDING COMPANY SA",
  },
  {
    ADUANA: "33",
    CODIGO: "88074",
    LUGAR: "EURO FRANC SA",
  },
  {
    ADUANA: "33",
    CODIGO: "88083",
    LUGAR: "FIZ SA",
  },
  {
    ADUANA: "33",
    CODIGO: "88086",
    LUGAR: "FREE WAY CORP SA",
  },
  {
    ADUANA: "33",
    CODIGO: "88093",
    LUGAR: "GUIME SA",
  },
  {
    ADUANA: "33",
    CODIGO: "88099",
    LUGAR: "IMPACT CORP SRL",
  },
  {
    ADUANA: "33",
    CODIGO: "88104",
    LUGAR: "INTEGRAL DEPOSITOS SA",
  },
  {
    ADUANA: "33",
    CODIGO: "88112",
    LUGAR: "JORGE E PHOTIADES SA",
  },
  {
    ADUANA: "33",
    CODIGO: "88114",
    LUGAR: "JUAN A BARTOLOME SRL",
  },
  {
    ADUANA: "33",
    CODIGO: "88125",
    LUGAR: "LA PLATA OFF SHORE SA",
  },
  {
    ADUANA: "33",
    CODIGO: "88134",
    LUGAR: "LOGISTICA INTEGRAL DE CARGAS SA",
  },
  {
    ADUANA: "33",
    CODIGO: "88135",
    LUGAR: "LOGISTICA ZONA FRANCA SA (1)",
  },
  {
    ADUANA: "33",
    CODIGO: "88150",
    LUGAR: "MARGUS TRADING SA",
  },
  {
    ADUANA: "33",
    CODIGO: "88164",
    LUGAR: "NUMBER ONE EXPORT SRL",
  },
  {
    ADUANA: "33",
    CODIGO: "88168",
    LUGAR: "PATRICA S A",
  },
  {
    ADUANA: "33",
    CODIGO: "88171",
    LUGAR: "PLAZA FRANCA SA",
  },
  {
    ADUANA: "33",
    CODIGO: "88176",
    LUGAR: "PROPATO HNOS SAIC",
  },
  {
    ADUANA: "33",
    CODIGO: "88179",
    LUGAR: "RACKLATINA SA",
  },
  {
    ADUANA: "33",
    CODIGO: "88181",
    LUGAR: "RED IMPORT SRL",
  },
  {
    ADUANA: "33",
    CODIGO: "88184",
    LUGAR: "RODAMET SACI",
  },
  {
    ADUANA: "33",
    CODIGO: "88191",
    LUGAR: "SERVICIOS DE LOGISTICA SA (1)",
  },
  {
    ADUANA: "33",
    CODIGO: "88192",
    LUGAR: "SERVICIOS DE LOGISTICA SA (2)",
  },
  {
    ADUANA: "33",
    CODIGO: "88203",
    LUGAR: "SISTEMA EN COMERCIO EXTERIOR S.R.L.",
  },
  {
    ADUANA: "33",
    CODIGO: "88218",
    LUGAR: "TOTAL FRANC SA (1)",
  },
  {
    ADUANA: "33",
    CODIGO: "88221",
    LUGAR: "TRADE UP SRL",
  },
  {
    ADUANA: "33",
    CODIGO: "88232",
    LUGAR: "WORKHOUSE SERVICE SA",
  },
  {
    ADUANA: "33",
    CODIGO: "88239",
    LUGAR: "ENTE ADMIN ASTILLERO RIO SANTIAGO",
  },
  {
    ADUANA: "33",
    CODIGO: "88244",
    LUGAR: "LA PLATA STORE SA",
  },
  {
    ADUANA: "33",
    CODIGO: "88245",
    LUGAR: "BAZFLP PLAYA N 6",
  },
  {
    ADUANA: "33",
    CODIGO: "88246",
    LUGAR: "LOS PINOS ZONA FRANCA SA",
  },
  {
    ADUANA: "33",
    CODIGO: "88253",
    LUGAR: "PA SANTIAGO Y RD SANTIAGO (SH)",
  },
  {
    ADUANA: "33",
    CODIGO: "88261",
    LUGAR: "TOTAL FRANC SA (3)",
  },
  {
    ADUANA: "33",
    CODIGO: "88263",
    LUGAR: "SERVICIOS DE LOGISTICA SA (3)",
  },
  {
    ADUANA: "33",
    CODIGO: "88268",
    LUGAR: "SERVICIO INTEGRAL ZONA FRANCA SA",
  },
  {
    ADUANA: "33",
    CODIGO: "88270",
    LUGAR: "JLG SOC COLECTIVA",
  },
  {
    ADUANA: "33",
    CODIGO: "88480",
    LUGAR: "BERMEJO JULIO CESAR",
  },
  {
    ADUANA: "33",
    CODIGO: "88481",
    LUGAR: "DESIA HERNAN FRANCISCO",
  },
  {
    ADUANA: "33",
    CODIGO: "88482",
    LUGAR: "UNITED LOGISTIC COMPANY SA",
  },
  {
    ADUANA: "33",
    CODIGO: "88483",
    LUGAR: "MOSCONI JUAN CARLOS",
  },
  {
    ADUANA: "33",
    CODIGO: "88484",
    LUGAR: "LOGRO ZONA FRANCA SA",
  },
  {
    ADUANA: "33",
    CODIGO: "88487",
    LUGAR: "GRUPO ASES EMP L1 M1 SI",
  },
  {
    ADUANA: "33",
    CODIGO: "88488",
    LUGAR: "MARRAC SRL",
  },
  {
    ADUANA: "33",
    CODIGO: "88489",
    LUGAR: "GSB SERVICIOS ESPECIALES SA",
  },
  {
    ADUANA: "33",
    CODIGO: "88490",
    LUGAR: "SA DE GIACOMO",
  },
  {
    ADUANA: "33",
    CODIGO: "88491",
    LUGAR: "SELODIAL SA",
  },
  {
    ADUANA: "33",
    CODIGO: "88494",
    LUGAR: "SABINUR SII M10 L6B",
  },
  {
    ADUANA: "33",
    CODIGO: "88499",
    LUGAR: "LOGISTICA AZ SA",
  },
  {
    ADUANA: "33",
    CODIGO: "88700",
    LUGAR: "ACEBEY SA",
  },
  {
    ADUANA: "33",
    CODIGO: "88703",
    LUGAR: "REALTEX S A",
  },
  {
    ADUANA: "33",
    CODIGO: "88704",
    LUGAR: "IMPRESOS VELOX SA",
  },
  {
    ADUANA: "33",
    CODIGO: "88705",
    LUGAR: "ALL TRADE COMEX S.R.L.",
  },
  {
    ADUANA: "33",
    CODIGO: "88706",
    LUGAR: "ZONA PRODUCTIVA S A",
  },
  {
    ADUANA: "33",
    CODIGO: "88707",
    LUGAR: "BUILDING TIME SA",
  },
  {
    ADUANA: "33",
    CODIGO: "88708",
    LUGAR: "BUILDING TIME S A",
  },
  {
    ADUANA: "33",
    CODIGO: "88709",
    LUGAR: "BUILDING TIME S A",
  },
  {
    ADUANA: "33",
    CODIGO: "88711",
    LUGAR: "SAI SERVICIOS AERONAUTICOS INTERA S",
  },
  {
    ADUANA: "33",
    CODIGO: "88712",
    LUGAR: "JIDOKA SRL",
  },
  {
    ADUANA: "33",
    CODIGO: "88713",
    LUGAR: "INTERNATIONAL CHARGE SA",
  },
  {
    ADUANA: "33",
    CODIGO: "88714",
    LUGAR: "RZ SERVICIOS LOGISTICOS SRL",
  },
  {
    ADUANA: "33",
    CODIGO: "88715",
    LUGAR: "LOGISTICA INTEGRAL ZONA FRANCA SA",
  },
  {
    ADUANA: "37",
    CODIGO: "11003",
    LUGAR: "FRIO POLAR SA",
  },
  {
    ADUANA: "37",
    CODIGO: "60001",
    LUGAR: "PTO MAR DEL PLATA-TERM 2",
  },
  {
    ADUANA: "37",
    CODIGO: "60002",
    LUGAR: "PTO MAR DEL PLATA-TERM 3",
  },
  {
    ADUANA: "37",
    CODIGO: "60004",
    LUGAR: "TERMINAL 1",
  },
  {
    ADUANA: "37",
    CODIGO: "60005",
    LUGAR: "MUELLE 10",
  },
  {
    ADUANA: "37",
    CODIGO: "60006",
    LUGAR: "ESPIGON 7",
  },
  {
    ADUANA: "37",
    CODIGO: "60007",
    LUGAR: "POSTA DE INFLAMABLES",
  },
  {
    ADUANA: "37",
    CODIGO: "65003",
    LUGAR: "BASE NAVAL MAR DEL PLATA",
  },
  {
    ADUANA: "37",
    CODIGO: "75002",
    LUGAR: "MC CAIN ARGENTINA SA",
  },
  {
    ADUANA: "38",
    CODIGO: "11001",
    LUGAR: "INST DESARR IND TECN SERV (IDITS)",
  },
  {
    ADUANA: "38",
    CODIGO: "11016",
    LUGAR: "MULTIMODAL S.A.C.I.A",
  },
  {
    ADUANA: "38",
    CODIGO: "11018",
    LUGAR: "AEROPUERTOS ARGENTINA 2000 S A",
  },
  {
    ADUANA: "38",
    CODIGO: "19006",
    LUGAR: "ANDREU E HIJO SA",
  },
  {
    ADUANA: "38",
    CODIGO: "19021",
    LUGAR: "BANSHE S.A. (EX OSCAR PARLANTI)",
  },
  {
    ADUANA: "38",
    CODIGO: "20100",
    LUGAR: "ZPCA ZF MENDOZA",
  },
  {
    ADUANA: "38",
    CODIGO: "88118",
    LUGAR: "SIA ING SA",
  },
  {
    ADUANA: "38",
    CODIGO: "88204",
    LUGAR: "PORTA SUR SA",
  },
  {
    ADUANA: "40",
    CODIGO: "42002",
    LUGAR: "ZONA PRIMARIA TRES ARROYOS",
  },
  {
    ADUANA: "40",
    CODIGO: "60001",
    LUGAR: "SITIO 1 -ZPA MARGEN QUEQUEN",
  },
  {
    ADUANA: "40",
    CODIGO: "60002",
    LUGAR: "SITIO 2 -ZPA MARGEN QUEQUEN",
  },
  {
    ADUANA: "40",
    CODIGO: "60003",
    LUGAR: "SITIO 3 -ZPA MARGEN QUEQUEN",
  },
  {
    ADUANA: "40",
    CODIGO: "60004",
    LUGAR: "SITIO 4 Y 5 ZPA MARGEN QUEQUEN",
  },
  {
    ADUANA: "40",
    CODIGO: "60005",
    LUGAR: "SITIO 6-ZPA MARGEN QUEQUEN",
  },
  {
    ADUANA: "40",
    CODIGO: "60006",
    LUGAR: "SITIO 7 Y 8-MARGEN NECOCHEA",
  },
  {
    ADUANA: "40",
    CODIGO: "60007",
    LUGAR: "SITIO 9 Y 10-MARGEN NECOCHEA",
  },
  {
    ADUANA: "40",
    CODIGO: "60008",
    LUGAR: "SITIO 11-MARGEN DE NECOCHEA",
  },
  {
    ADUANA: "40",
    CODIGO: "60009",
    LUGAR: "SITIO 12-MARGEN NECOCHEA",
  },
  {
    ADUANA: "41",
    CODIGO: "42001",
    LUGAR: "ZPA-PTO PARANA PPAL",
  },
  {
    ADUANA: "41",
    CODIGO: "60003",
    LUGAR: "PUERTO MARQUEZ",
  },
  {
    ADUANA: "41",
    CODIGO: "60004",
    LUGAR: "TERMINAL DE SOLIDOS A GRANEL HERNAD",
  },
  {
    ADUANA: "41",
    CODIGO: "60005",
    LUGAR: "MUELLE PUEBLO BRUGO",
  },
  {
    ADUANA: "41",
    CODIGO: "60100",
    LUGAR: "MUELLE EL MANA PUERTO BUEY SA",
  },
  {
    ADUANA: "42",
    CODIGO: "11100",
    LUGAR: "DEPOSITO FISCAL TRANSLIBRES SRL",
  },
  {
    ADUANA: "42",
    CODIGO: "43001",
    LUGAR: "PASO PTO MONTE CASERO-BELLA UNION",
  },
  {
    ADUANA: "42",
    CODIGO: "43002",
    LUGAR: "PASO PUERTO ALVEAR-ITAQUI",
  },
  {
    ADUANA: "46",
    CODIGO: "42002",
    LUGAR: "DESTACAMENTO YACYRETA",
  },
  {
    ADUANA: "46",
    CODIGO: "43001",
    LUGAR: "PASO PUERTO RICO-PUERTO TRIUNFO",
  },
  {
    ADUANA: "46",
    CODIGO: "43002",
    LUGAR: "PASO PTO MANI-PTO BELLA VISTA SUR",
  },
  {
    ADUANA: "46",
    CODIGO: "43003",
    LUGAR: "PASO PTO POSADAS-PTO PACU CUA",
  },
  {
    ADUANA: "47",
    CODIGO: "11001",
    LUGAR: "ADMINISTRACION DE PUERTO MADRYN",
  },
  {
    ADUANA: "47",
    CODIGO: "11003",
    LUGAR: "MAREA PATAGONICA SA",
  },
  {
    ADUANA: "47",
    CODIGO: "60001",
    LUGAR: "MUELLE ALTE STORNI SITIO 1",
  },
  {
    ADUANA: "47",
    CODIGO: "60002",
    LUGAR: "MUELLE LUIS PIEDRABUENA",
  },
  {
    ADUANA: "48",
    CODIGO: "11002",
    LUGAR: "DEFISA SA",
  },
  {
    ADUANA: "48",
    CODIGO: "62007",
    LUGAR: "CAM2 ENAP SIPETROL ARG POSEIDON",
  },
  {
    ADUANA: "49",
    CODIGO: "11006",
    LUGAR: "TERMINAL LOGISTICA RIO GRANDE",
  },
  {
    ADUANA: "49",
    CODIGO: "11011",
    LUGAR: "PLAZOLETA TERMINAL LOGISTICA",
  },
  {
    ADUANA: "49",
    CODIGO: "11012",
    LUGAR: "TERMINAL LOGIST. FGNA S.A.",
  },
  {
    ADUANA: "49",
    CODIGO: "61001",
    LUGAR: "MONOBOYA CRUZ DEL SUR (SAN SEBASTIA",
  },
  {
    ADUANA: "49",
    CODIGO: "61009",
    LUGAR: "TOTAL AUSTRAL - RIO CULLEN",
  },
  {
    ADUANA: "49",
    CODIGO: "62001",
    LUGAR: "HIDRA NORTE OP TOTAL AUSTRAL",
  },
  {
    ADUANA: "49",
    CODIGO: "62002",
    LUGAR: "HIDRA CENTRO OP TOTAL AUSTRAL",
  },
  {
    ADUANA: "49",
    CODIGO: "62003",
    LUGAR: "CARINA OP TOTAL AUSTRAL",
  },
  {
    ADUANA: "49",
    CODIGO: "62004",
    LUGAR: "ARIES OP TOTAL AUSTRAL",
  },
  {
    ADUANA: "49",
    CODIGO: "75004",
    LUGAR: "AD DOM FAPESA D FISC",
  },
  {
    ADUANA: "49",
    CODIGO: "75005",
    LUGAR: "AD DOM MIRGOR D FISC",
  },
  {
    ADUANA: "49",
    CODIGO: "82007",
    LUGAR: "PUNTA QUILLA RES 3232 86",
  },
  {
    ADUANA: "52",
    CODIGO: "11003",
    LUGAR: "DEPOSITO GRAL TPR SA",
  },
  {
    ADUANA: "52",
    CODIGO: "60003",
    LUGAR: "MUELLE UNIDAD VI -SERV PORTUARIOS",
  },
  {
    ADUANA: "52",
    CODIGO: "60005",
    LUGAR: "MUELLE CARGILL VILLA GDOR GALVEZ",
  },
  {
    ADUANA: "52",
    CODIGO: "60006",
    LUGAR: "MUELLE CARGILL EN PUNTA ALVEAR",
  },
  {
    ADUANA: "52",
    CODIGO: "60007",
    LUGAR: "MUELLE DREYFUS -GRAL LAGOS",
  },
  {
    ADUANA: "52",
    CODIGO: "60008",
    LUGAR: "MUELLE TOEPFER EN ARROYO SECO",
  },
  {
    ADUANA: "52",
    CODIGO: "60010",
    LUGAR: "TERMINAL PTO ROS MUELLE NOR A-C",
  },
  {
    ADUANA: "52",
    CODIGO: "60011",
    LUGAR: "TERMINAL PTO ROS MUELLE CENTRO F-J",
  },
  {
    ADUANA: "52",
    CODIGO: "60012",
    LUGAR: "TERMINAL PTO MUELLE PLAZOLETA",
  },
  {
    ADUANA: "52",
    CODIGO: "60013",
    LUGAR: "TERMINAL PTO ROS MUELLE SUR",
  },
  {
    ADUANA: "52",
    CODIGO: "60014",
    LUGAR: "TERMINAL PTOROS MUELLE GUIDE",
  },
  {
    ADUANA: "52",
    CODIGO: "60015",
    LUGAR: "MUELLE SHELL CAPSA - ARROYO SECO",
  },
  {
    ADUANA: "52",
    CODIGO: "60016",
    LUGAR: "MUELLE CARGILL BARCAZAS",
  },
  {
    ADUANA: "52",
    CODIGO: "64001",
    LUGAR: "RADA PRINCIPAL",
  },
  {
    ADUANA: "52",
    CODIGO: "64002",
    LUGAR: "RADA SECUNDARIA",
  },
  {
    ADUANA: "52",
    CODIGO: "64003",
    LUGAR: "RADA AUXILIAR",
  },
  {
    ADUANA: "52",
    CODIGO: "64004",
    LUGAR: "RADA RESERVA",
  },
  {
    ADUANA: "52",
    CODIGO: "64005",
    LUGAR: "RADA ALVEAR",
  },
  {
    ADUANA: "52",
    CODIGO: "64006",
    LUGAR: "RADA GENERAL LAGOS",
  },
  {
    ADUANA: "53",
    CODIGO: "11004",
    LUGAR: "COZOFRA SA",
  },
  {
    ADUANA: "53",
    CODIGO: "20004",
    LUGAR: "ZPCA ZF SALTA",
  },
  {
    ADUANA: "53",
    CODIGO: "88006",
    LUGAR: "AGV MAQUINAS SRL",
  },
  {
    ADUANA: "53",
    CODIGO: "88007",
    LUGAR: "MOLINO PAMPA BLANCA SA",
  },
  {
    ADUANA: "53",
    CODIGO: "88008",
    LUGAR: "CONSTRUCTORA ODEBRETCH SA",
  },
  {
    ADUANA: "54",
    CODIGO: "43001",
    LUGAR: "PASO DE LA BARCA-PORTO XAVIER",
  },
  {
    ADUANA: "55",
    CODIGO: "11002",
    LUGAR: "MUNICIPALIDAD DE SARMIENTO",
  },
  {
    ADUANA: "55",
    CODIGO: "11603",
    LUGAR: "CONOSUR SA",
  },
  {
    ADUANA: "55",
    CODIGO: "75002",
    LUGAR: "PEQAFLOR SA",
  },
  {
    ADUANA: "57",
    CODIGO: "11004",
    LUGAR: "NOBLE ARGENTINA SA",
  },
  {
    ADUANA: "57",
    CODIGO: "11500",
    LUGAR: "PAGODA S.A.",
  },
  {
    ADUANA: "57",
    CODIGO: "11501",
    LUGAR: "TERMINAL 6 SA",
  },
  {
    ADUANA: "57",
    CODIGO: "11502",
    LUGAR: "CARGILL SACI",
  },
  {
    ADUANA: "57",
    CODIGO: "11503",
    LUGAR: "VICENTIN SAIC",
  },
  {
    ADUANA: "57",
    CODIGO: "11504",
    LUGAR: "ADM AGRO SRL",
  },
  {
    ADUANA: "57",
    CODIGO: "11505",
    LUGAR: "LDC ARGENTINA S A",
  },
  {
    ADUANA: "57",
    CODIGO: "60003",
    LUGAR: "PUERTO DE CABOTAJE LA BARQUITA",
  },
  {
    ADUANA: "57",
    CODIGO: "60004",
    LUGAR: "MUELLE 2 ACA",
  },
  {
    ADUANA: "57",
    CODIGO: "60005",
    LUGAR: "PROFERTIL SA",
  },
  {
    ADUANA: "57",
    CODIGO: "60006",
    LUGAR: "PUERTO RENOVA TIMBUES",
  },
  {
    ADUANA: "57",
    CODIGO: "60008",
    LUGAR: "MUELLE FERTILIZANTES NIDERA",
  },
  {
    ADUANA: "57",
    CODIGO: "60009",
    LUGAR: "ALFRED TOEPFER (BARCAZAS)",
  },
  {
    ADUANA: "57",
    CODIGO: "60101",
    LUGAR: "MINERA ALUMBRERA SA",
  },
  {
    ADUANA: "57",
    CODIGO: "60102",
    LUGAR: "MUELLE ACA",
  },
  {
    ADUANA: "57",
    CODIGO: "60103",
    LUGAR: "ARAUCO SA",
  },
  {
    ADUANA: "57",
    CODIGO: "60105",
    LUGAR: "MOSAIC ARGENTINA SA",
  },
  {
    ADUANA: "57",
    CODIGO: "60106",
    LUGAR: "PETROBRAS ENERGIA",
  },
  {
    ADUANA: "57",
    CODIGO: "60107",
    LUGAR: "NIDERA SA",
  },
  {
    ADUANA: "57",
    CODIGO: "60108",
    LUGAR: "ALFRED C TOEPFER SA",
  },
  {
    ADUANA: "57",
    CODIGO: "60109",
    LUGAR: "BUNGE ARGENTINA DEMPA",
  },
  {
    ADUANA: "57",
    CODIGO: "60110",
    LUGAR: "BUNGE ARGENTINA PAMPA",
  },
  {
    ADUANA: "57",
    CODIGO: "60111",
    LUGAR: "YPF SA",
  },
  {
    ADUANA: "57",
    CODIGO: "60113",
    LUGAR: "PETROBRAS ENERGIA SA REFISAN",
  },
  {
    ADUANA: "57",
    CODIGO: "60114",
    LUGAR: "TERMINAL 6 SA",
  },
  {
    ADUANA: "57",
    CODIGO: "60118",
    LUGAR: "MOLINOS RIO DE LA PLATA SA",
  },
  {
    ADUANA: "57",
    CODIGO: "60119",
    LUGAR: "NOBLE ARGENTINA SA",
  },
  {
    ADUANA: "57",
    CODIGO: "60120",
    LUGAR: "LOUIS DREYFUS C ARGENTINA SA",
  },
  {
    ADUANA: "57",
    CODIGO: "60121",
    LUGAR: "TERMOELECTRICA SAN MARTIN SA",
  },
  {
    ADUANA: "57",
    CODIGO: "60122",
    LUGAR: "NOBLE ARGENTINA SA-FERTILIZANTE",
  },
  {
    ADUANA: "57",
    CODIGO: "60123",
    LUGAR: "BG PUERTO DE CABOTAJE",
  },
  {
    ADUANA: "57",
    CODIGO: "60209",
    LUGAR: "VICENTIN SAIC",
  },
  {
    ADUANA: "57",
    CODIGO: "60318",
    LUGAR: "CARGILL SACI",
  },
  {
    ADUANA: "57",
    CODIGO: "64300",
    LUGAR: "RADA SAN LORENZO",
  },
  {
    ADUANA: "57",
    CODIGO: "64301",
    LUGAR: "ZONA CHARLY",
  },
  {
    ADUANA: "58",
    CODIGO: "12002",
    LUGAR: "PETROPLASTIC SA",
  },
  {
    ADUANA: "59",
    CODIGO: "11002",
    LUGAR: "P.A.M.S.A.",
  },
  {
    ADUANA: "59",
    CODIGO: "11014",
    LUGAR: "PONAL SA",
  },
  {
    ADUANA: "59",
    CODIGO: "12004",
    LUGAR: "REFRACTARIOS ARGENTINOS SAICYM.",
  },
  {
    ADUANA: "59",
    CODIGO: "12006",
    LUGAR: "SIDERSA SA",
  },
  {
    ADUANA: "59",
    CODIGO: "12007",
    LUGAR: "LA EMILIA SA",
  },
  {
    ADUANA: "59",
    CODIGO: "12010",
    LUGAR: "SIDERAR SAICM - MATERIAS PRIMAS",
  },
  {
    ADUANA: "59",
    CODIGO: "12011",
    LUGAR: "VALE LOGISTICA DE ARGENTINA S A",
  },
  {
    ADUANA: "59",
    CODIGO: "60001",
    LUGAR: "MLLE FISCAL PUERTO NUEVO DPAP",
  },
  {
    ADUANA: "59",
    CODIGO: "60002",
    LUGAR: "MLLE.EX J.N.G. - DPAP",
  },
  {
    ADUANA: "59",
    CODIGO: "60003",
    LUGAR: "MLLE CTSN SA",
  },
  {
    ADUANA: "59",
    CODIGO: "60004",
    LUGAR: "MLLE COMERCIAL SIDERAR SAICM",
  },
  {
    ADUANA: "59",
    CODIGO: "60005",
    LUGAR: "MLLE CARBON SIDERAR SAICM",
  },
  {
    ADUANA: "59",
    CODIGO: "60006",
    LUGAR: "MLLE MINERALES SIDERAR SAICM",
  },
  {
    ADUANA: "59",
    CODIGO: "60007",
    LUGAR: "MLLE AUTODESCARGA SIDERAR SAICM",
  },
  {
    ADUANA: "59",
    CODIGO: "60008",
    LUGAR: "ASTILLEROS MARTINS - UABL",
  },
  {
    ADUANA: "59",
    CODIGO: "60009",
    LUGAR: "MLLE ELEVADOR BUNGE RAMALLO",
  },
  {
    ADUANA: "59",
    CODIGO: "60015",
    LUGAR: "MUELLE FERTILIZANTE BUNGE",
  },
  {
    ADUANA: "59",
    CODIGO: "63001",
    LUGAR: "ZONAS ALIJE ALFA-BRAVO-CHARLIE",
  },
  {
    ADUANA: "60",
    CODIGO: "11003",
    LUGAR: "RUTA 9 GROUP LOGISTICA SRL",
  },
  {
    ADUANA: "60",
    CODIGO: "60001",
    LUGAR: "ZPA MUELLE CABECERA FRUTA",
  },
  {
    ADUANA: "60",
    CODIGO: "60002",
    LUGAR: "ZPA MUELLE ELEVADOR GRANOS",
  },
  {
    ADUANA: "61",
    CODIGO: "12612",
    LUGAR: "TOTAL AUSTRAL SA",
  },
  {
    ADUANA: "61",
    CODIGO: "43004",
    LUGAR: "LAGO SAN MARTIN - O HIGGINS",
  },
  {
    ADUANA: "61",
    CODIGO: "60001",
    LUGAR: "MUELLE PUERTO PUNTA QUILLA",
  },
  {
    ADUANA: "61",
    CODIGO: "60002",
    LUGAR: "MUELLE PUERTO SAN JULIAN",
  },
  {
    ADUANA: "62",
    CODIGO: "11001",
    LUGAR: "SERV PORTUARIOS SA",
  },
  {
    ADUANA: "62",
    CODIGO: "60001",
    LUGAR: "PUERTO STA FE - DIQUE 1 OESTE",
  },
  {
    ADUANA: "62",
    CODIGO: "60002",
    LUGAR: "PUERTO STA FE ELEVADOR DE GRANOS",
  },
  {
    ADUANA: "62",
    CODIGO: "60003",
    LUGAR: "PUERTO STA FE MUELLE SHELL CAPSA",
  },
  {
    ADUANA: "66",
    CODIGO: "42001",
    LUGAR: "Z P A SEDE CENTRAL AD TINOG",
  },
  {
    ADUANA: "66",
    CODIGO: "42002",
    LUGAR: "Z.P.A. RESGUARDO REG.EL PANTANILLO",
  },
  {
    ADUANA: "66",
    CODIGO: "42003",
    LUGAR: "Z.P.A. RESG. JURISD. LAS GRUTAS",
  },
  {
    ADUANA: "67",
    CODIGO: "11001",
    LUGAR: "DEPOSITO FISCAL DPP",
  },
  {
    ADUANA: "67",
    CODIGO: "11003",
    LUGAR: "DEPOSITOS FISCALES AUSTRALES SA",
  },
  {
    ADUANA: "67",
    CODIGO: "43004",
    LUGAR: "PASO PUERTO ALMANZA",
  },
  {
    ADUANA: "69",
    CODIGO: "11004",
    LUGAR: "DEPOSITO FISCAL GRAL PTO V CONSTIT",
  },
  {
    ADUANA: "69",
    CODIGO: "11005",
    LUGAR: "CELIMEX SA",
  },
  {
    ADUANA: "69",
    CODIGO: "12001",
    LUGAR: "DEPOSITO GRAL ACINDAR",
  },
  {
    ADUANA: "69",
    CODIGO: "12003",
    LUGAR: "PLAZOLETA ACINDAR",
  },
  {
    ADUANA: "69",
    CODIGO: "60001",
    LUGAR: "MUELLE MINERALERO ACINDAR SA",
  },
  {
    ADUANA: "69",
    CODIGO: "60002",
    LUGAR: "PUERTO ACEVEDO ACINDAR SA",
  },
  {
    ADUANA: "69",
    CODIGO: "60003",
    LUGAR: "MUELLE S PORTUARIOS UNIDAD II",
  },
  {
    ADUANA: "69",
    CODIGO: "60004",
    LUGAR: "MUELLE VILLA CONSTITUCION SRL (U3)",
  },
  {
    ADUANA: "73",
    CODIGO: "4,20E+02",
    LUGAR: "OPERATIVA Y REGISTRAL",
  },
  {
    ADUANA: "73",
    CODIGO: "11001",
    LUGAR: "BODEGA IMPO/EXPO EZEIZA",
  },
  {
    ADUANA: "73",
    CODIGO: "11002",
    LUGAR: "PISTA / D.A..P EZEIZA",
  },
  {
    ADUANA: "73",
    CODIGO: "11088",
    LUGAR: "AEROPARQUE J NEWVERY",
  },
  {
    ADUANA: "73",
    CODIGO: "12003",
    LUGAR: "INTERBAIRES",
  },
  {
    ADUANA: "73",
    CODIGO: "13006",
    LUGAR: "DEPOS FRANCO AER ARG",
  },
  {
    ADUANA: "74",
    CODIGO: "11007",
    LUGAR: "Deposito Fiscal Gral. Aeropuerto",
  },
  {
    ADUANA: "74",
    CODIGO: "11502",
    LUGAR: "MERCOTUC S R L",
  },
  {
    ADUANA: "74",
    CODIGO: "88008",
    LUGAR: "DEP GRAL CONSORCIO ZONA FRANCA",
  },
  {
    ADUANA: "75",
    CODIGO: "11007",
    LUGAR: "DEP FISCAL Y ADUANERO DEL NEUQUEN S",
  },
  {
    ADUANA: "76",
    CODIGO: "43001",
    LUGAR: "PASO PTO CHALANAS-BERMEJO",
  },
  {
    ADUANA: "79",
    CODIGO: "42002",
    LUGAR: "ZONA PRIMARIA LA RIOJA",
  },
  {
    ADUANA: "80",
    CODIGO: "60001",
    LUGAR: "MUELLE SAN ANTONIO ESTE",
  },
  {
    ADUANA: "80",
    CODIGO: "60002",
    LUGAR: "MUELLE PUNTA COLORADA",
  },
  {
    ADUANA: "83",
    CODIGO: "11001",
    LUGAR: "ENTE COORDINADOR ZF,ZAL Y COMERCIOR",
  },
  {
    ADUANA: "83",
    CODIGO: "11002",
    LUGAR: "ZAL VILLA MERCEDES",
  },
  {
    ADUANA: "83",
    CODIGO: "20003",
    LUGAR: "ZPCA ZF JULIO DARACT",
  },
  {
    ADUANA: "85",
    CODIGO: "42001",
    LUGAR: "ZPA ADUANA VILLA REGINA",
  },
  {
    ADUANA: "86",
    CODIGO: "43001",
    LUGAR: "PASO PANAMBI-VERACRUZ",
  },
  {
    ADUANA: "86",
    CODIGO: "43002",
    LUGAR: "PASO ALBA POSSE-PORTO MAUA",
  },
  {
    ADUANA: "86",
    CODIGO: "43003",
    LUGAR: "PASO EL SOBERBIO-PORTO SOBERBO",
  },
  {
    ADUANA: "87",
    CODIGO: "60001",
    LUGAR: "MUELLE CALETA PAULA",
  },
  {
    ADUANA: "87",
    CODIGO: "61001",
    LUGAR: "MONOBOYA CALETA OLIVIA",
  },
  {
    ADUANA: "88",
    CODIGO: "11002",
    LUGAR: "POLO LOGISTICO GRAL DEHEZA",
  },
  {
    ADUANA: "88",
    CODIGO: "12020",
    LUGAR: "INGERSOL",
  },
  {
    ADUANA: "88",
    CODIGO: "12026",
    LUGAR: "BARBUY-BPB SA-DOWEL",
  },
  {
    ADUANA: "88",
    CODIGO: "12044",
    LUGAR: "BPB MEDITERRANEA SA",
  },
  {
    ADUANA: "88",
    CODIGO: "12045",
    LUGAR: "BPB SA -PEER BEARIN",
  },
  {
    ADUANA: "89",
    CODIGO: "42001",
    LUGAR: "ZPA LA BANDA",
  },
  {
    ADUANA: "91",
    CODIGO: "10056",
    LUGAR: "TERMINAL 5",
  },
  {
    ADUANA: "91",
    CODIGO: "10068",
    LUGAR: "TERMINAL. 4",
  },
  {
    ADUANA: "91",
    CODIGO: "11007",
    LUGAR: "CAPITAN CORTES",
  },
  {
    ADUANA: "91",
    CODIGO: "11012",
    LUGAR: "FEPORT SA",
  },
  {
    ADUANA: "91",
    CODIGO: "11050",
    LUGAR: "GARGANO",
  },
  {
    ADUANA: "91",
    CODIGO: "11070",
    LUGAR: "TERMINAL PANAMERICANA S.A.",
  },
  {
    ADUANA: "91",
    CODIGO: "11103",
    LUGAR: "GEFCO",
  },
  {
    ADUANA: "91",
    CODIGO: "12023",
    LUGAR: "COLORIN S.A",
  },
  {
    ADUANA: "91",
    CODIGO: "12052",
    LUGAR: "ILVA",
  },
  {
    ADUANA: "91",
    CODIGO: "12106",
    LUGAR: "SAFETY INTERNACIONAL",
  },
  {
    ADUANA: "91",
    CODIGO: "12110",
    LUGAR: "AEROCARGAS ARGENTINAS S.A.",
  },
  {
    ADUANA: "91",
    CODIGO: "60100",
    LUGAR: "MUELLE INT. TIGRE",
  },
  {
    ADUANA: "91",
    CODIGO: "60500",
    LUGAR: "SECC. ZONA TIGRE",
  },
  {
    ADUANA: "91",
    CODIGO: "75002",
    LUGAR: "KCK",
  },
  {
    ADUANA: "91",
    CODIGO: "76034",
    LUGAR: "FORD ARGENTINA S.C.A.",
  },
  {
    ADUANA: "92",
    CODIGO: "10057",
    LUGAR: "TERMINAL 1, 2 y 3",
  },
  {
    ADUANA: "92",
    CODIGO: "11002",
    LUGAR: "AVELLANEDA SUR",
  },
  {
    ADUANA: "92",
    CODIGO: "11003",
    LUGAR: "DEPOSITO MOREIRO HNOS SRL",
  },
  {
    ADUANA: "92",
    CODIGO: "11005",
    LUGAR: "S.A.F.",
  },
  {
    ADUANA: "92",
    CODIGO: "11011",
    LUGAR: "S.A.DOCKS",
  },
  {
    ADUANA: "92",
    CODIGO: "11021",
    LUGAR: "LO PRIMO I",
  },
  {
    ADUANA: "92",
    CODIGO: "11028",
    LUGAR: "UNIV. CARGAS",
  },
  {
    ADUANA: "92",
    CODIGO: "11037",
    LUGAR: "COCO OIL S.A.",
  },
  {
    ADUANA: "92",
    CODIGO: "11042",
    LUGAR: "ORVOL S.A.",
  },
  {
    ADUANA: "92",
    CODIGO: "11044",
    LUGAR: "T.A.G.S.A.",
  },
  {
    ADUANA: "92",
    CODIGO: "11045",
    LUGAR: "Y.P.F. S.A.",
  },
  {
    ADUANA: "92",
    CODIGO: "11058",
    LUGAR: "MARUBA SCA.",
  },
  {
    ADUANA: "92",
    CODIGO: "11069",
    LUGAR: "DEP.FISCAL DHL",
  },
  {
    ADUANA: "92",
    CODIGO: "11075",
    LUGAR: "EG3 S.A.",
  },
  {
    ADUANA: "92",
    CODIGO: "11079",
    LUGAR: "MATERIA HERMANOS S.A.",
  },
  {
    ADUANA: "92",
    CODIGO: "11080",
    LUGAR: "NTRA. SRA ASUNCION",
  },
  {
    ADUANA: "92",
    CODIGO: "11087",
    LUGAR: "D.A.P.S.A.",
  },
  {
    ADUANA: "92",
    CODIGO: "11089",
    LUGAR: "TRANSTERMINAL SA.",
  },
  {
    ADUANA: "92",
    CODIGO: "11094",
    LUGAR: "COAMTRA S.A.",
  },
  {
    ADUANA: "92",
    CODIGO: "11096",
    LUGAR: "TEFASA I",
  },
  {
    ADUANA: "92",
    CODIGO: "11098",
    LUGAR: "TRANSPORTES PATRON S.A.C.I.F",
  },
  {
    ADUANA: "92",
    CODIGO: "11101",
    LUGAR: "LOGEXPOR",
  },
  {
    ADUANA: "92",
    CODIGO: "11102",
    LUGAR: "SERVIFRIO EZEIZA S.A.",
  },
  {
    ADUANA: "92",
    CODIGO: "11107",
    LUGAR: "SOLVAY INDUPA S.A.I.C.",
  },
  {
    ADUANA: "92",
    CODIGO: "11108",
    LUGAR: "PETROLERA DEL CONO SUR S.A.",
  },
  {
    ADUANA: "92",
    CODIGO: "11109",
    LUGAR: "LOGINTER SA.",
  },
  {
    ADUANA: "92",
    CODIGO: "11112",
    LUGAR: "LOINEX S.A.",
  },
  {
    ADUANA: "92",
    CODIGO: "11113",
    LUGAR: "TRANSPORTES MONTALVAN S.A.",
  },
  {
    ADUANA: "92",
    CODIGO: "11201",
    LUGAR: "ABBOTT LABORATORIES",
  },
  {
    ADUANA: "92",
    CODIGO: "12026",
    LUGAR: "LIBERTADOR MOTORS",
  },
  {
    ADUANA: "92",
    CODIGO: "12031",
    LUGAR: "PRODMET",
  },
  {
    ADUANA: "92",
    CODIGO: "12090",
    LUGAR: "EDITORIAL PERFIL",
  },
  {
    ADUANA: "92",
    CODIGO: "42001",
    LUGAR: "TALLERES NAVALES DAR N S.A.",
  },
  {
    ADUANA: "92",
    CODIGO: "42952",
    LUGAR: "DARSENA SUR ESTE (A.G.P)",
  },
  {
    ADUANA: "92",
    CODIGO: "60200",
    LUGAR: "SECC. DIQUE 1 Y DEP. CAPITAL",
  },
  {
    ADUANA: "92",
    CODIGO: "60400",
    LUGAR: "SECC. ZONA SUD Y DEP. FISC. ZON",
  },
  {
    ADUANA: "92",
    CODIGO: "60600",
    LUGAR: "TERMINAL BUQUEBUS",
  },
  {
    ADUANA: "92",
    CODIGO: "60700",
    LUGAR: "TERMINAL BENITO QUINQUELA MARTIN",
  },
  {
    ADUANA: "92",
    CODIGO: "60800",
    LUGAR: "TERMINAL COLONIA EXPRESS",
  },
  {
    ADUANA: "92",
    CODIGO: "75095",
    LUGAR: "FIAT AUTO ARGENTINA S.A.",
  },
  {
    ADUANA: "92",
    CODIGO: "75111",
    LUGAR: "ABBOTT LABORATORIES",
  },
  {
    ADUANA: "93",
    CODIGO: "12004",
    LUGAR: "VMC REFRIG D FISCAL",
  },
  {
    ADUANA: "258",
    CODIGO: "88006",
    LUGAR: "ITALMAX SA",
  },
  {
    ADUANA: "258",
    CODIGO: "88009",
    LUGAR: "GEOMIEL SA",
  },
  {
    ADUANA: "258",
    CODIGO: "88011",
    LUGAR: "SERVICIOS Y TEC AEROPORTUARIA SA",
  },
  {
    ADUANA: "258",
    CODIGO: "88027",
    LUGAR: "PRODUCTOS PAMPEANOS SA",
  },
  {
    ADUANA: "258",
    CODIGO: "88039",
    LUGAR: "CASTRO MARIO DANIEL",
  },
  {
    ADUANA: "266",
    CODIGO: "20002",
    LUGAR: "ZPCA ZFBBCR",
  },
  {
    ADUANA: "267",
    CODIGO: "20002",
    LUGAR: "ZPCA C DEL URUGUAY",
  },
  {
    ADUANA: "267",
    CODIGO: "88002",
    LUGAR: "USUD INTERNATIONAL STAR SA",
  },
  {
    ADUANA: "268",
    CODIGO: "20002",
    LUGAR: "ZONA FRANCA VILLA CONSTITUCION",
  },
  {
    ADUANA: "268",
    CODIGO: "88002",
    LUGAR: "PTP WARRANT SA",
  },
  {
    ADUANA: "269",
    CODIGO: "20002",
    LUGAR: "SUB ZONA FRANCA PUERTO GALVA",
  },
  {
    ADUANA: "269",
    CODIGO: "88002",
    LUGAR: "ZONA FRANCA BUENOS AIRES SUR SA",
  },
  {
    ADUANA: "",
    CODIGO: "11Z08",
    LUGAR: "GEMEZ SA BARRACAS",
  },
  {
    ADUANA: "",
    CODIGO: "11Z09",
    LUGAR: "GEMEZ SA",
  },
];
