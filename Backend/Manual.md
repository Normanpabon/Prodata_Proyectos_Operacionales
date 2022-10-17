
# **Puertos dev**

Asumiendo que se creen en localhost:

Puertos de red:

**API:**
- localhost:8090

**MSProyectos:**
- localhost:8086

**MSUnidades:**
- localhost:8084

**MSUsuarios:**
- localhost:8088

#  **Como ejecutar backend**

1. Ejecutar los pasos del archivo .sql ubicado en la carpeta "BD Config".

2. Ejecutar MSProyectos, verificar que se ejecute bien y no saque mensajes de error.

3. Ejecutar ProdataAPI, contactamos con este servicio directamente.


# **Ejemplos consumo REST API**

## **/PROYECTOS**

- GET - devuelve todos los proyectos

### http://localhost:8090/prodata/API/V1/proyectos/

- GET - Devolver proyecto por id de unidad

### http//localhost:8090/prodata/API/V1/proyectos/unidad/{id unidad}
eje : localhost:8090/prodata/API/V1/proyectos/unidad/1

- GET - Devolver proyecto por id proyecto

### http://localhost:8090/prodata/API/V1/proyectos/{id pro}
eje : http://localhost:8090/prodata/API/V1/proyectos/1


- POST - Crear un nuevo proyecto

### http://localhost:8090/prodata/API/V1/proyectos/{unidad}/{feReg}/{feIni}/{feEnd}/{desc}/{id_estado}/{obs}"
eje: http://localhost:8090/prodata/API/V1/proyectos/2/2020-10-05/2021-10-05/2023-12-05/V2 Proyecto mandado a api desde postman/2/NA

- PUT - Actualizar datos de proyecto
### http://localhost:8090/prodata/API/V1/proyectos/{id}/{unidad}/{feReg}/{feIni}/{feEnd}/{desc}/{id_estado}/{obs}

(Verificar previamente que el ID exista)
eje: http://localhost:8090/prodata/API/V1/proyectos/6/2/2022-10-05/2022-10-05/2023-12-05/ProyectoDesdePostman/2/Modificado con put desde api

## **ESTADOS**

- GET - Obtener estado por id 

### http://localhost:8090/prodata/API/V1/proyectos/estado/{id}

- GET - Obtener todos los estados

### http://localhost:8090/prodata/API/V1/proyectos/estado/all

- POST - Crear un nuevo estado para proyecto

### http://localhost:8090/prodata/API/V1/proyectos/estado/{est}

## **/UNIDADES**

- GET - Obtener todas las unidades

### http://localhost:8090/prodata/API/V1/unidades/

- GET - Obtener unidad por id

### http://localhost:8090/prodata/API/V1/unidades/{id}

eje: http://localhost:8090/prodata/API/V1/unidades/3

- GET - Obtener unidad por uid del jefe a cargo

### http://localhost:8090/prodata/API/V1/unidades/jefe/{uid}

eje: http://localhost:8090/prodata/API/V1/unidades/jefe/22010

- POST - Crear una nueva unidad (esta fallando en el API)

### http://localhost:8090/prodata/API/V1/unidades/{nombre}/{uid_jefe}

- PUT - Actualizar datos de una unidad

### http://localhost:8090/prodata/API/V1/unidades/{id}/{nombre}/{new_uid}

eje: http://localhost:8090/prodata/API/V1/unidades/1/Cambio de datos unidad/11111

## **/USUARIOS**

 POST - Verificar username y pass, devuelve true o false
## borrar  ### http://localhost:8080/MSUsers/V1/usuario/login/{pass}/{username}
