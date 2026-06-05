# Catálogo web interactivo de discos protoplanetarios a nivel piloto

## Una herramienta pedagógica para explorar la morfología y los procesos físicos asociados a la formación planetaria

[![DOI](https://zenodo.org/badge/1176319104.svg)](https://doi.org/10.5281/zenodo.20513393)

Este repositorio contiene el código fuente del proyecto **Catálogo web interactivo de discos protoplanetarios a nivel piloto: una herramienta pedagógica para explorar la morfología y los procesos físicos asociados a la formación planetaria**.

El proyecto fue desarrollado por **Martina Ignacia Abarca Ibarra** como proyecto de tesis aprobado para la carrera de **Astrofísica con mención en Ciencia de Datos** de la **Universidad de Santiago de Chile**.

El catálogo fue diseñado como un sitio web educativo, interactivo y reproducible para organizar información científica sobre discos protoplanetarios, sus subestructuras, propiedades de gas y polvo, evidencia de formación planetaria, actividades de ciencia de datos y una simulación sintética interactiva.

El trabajo contó con el apoyo del **Proyecto DICYT de la Vicerrectoría de Investigación, Innovación y Creación de la Universidad de Santiago de Chile**.

---

## Sitio web y repositorio

Sitio web del catálogo:

https://martinaabarca.github.io/pilot-protoplanetary-disks-catalog/

Repositorio de GitHub:

https://github.com/martinaAbarca/pilot-protoplanetary-disks-catalog

---

## Registro en Zenodo y DOI

La versión archivada del proyecto está disponible en Zenodo:

https://zenodo.org/records/20515766

DOI de la versión actual:

https://doi.org/10.5281/zenodo.20515766

DOI general del proyecto:

https://doi.org/10.5281/zenodo.20513393

El DOI general agrupa las versiones publicadas del catálogo y puede usarse para citar el proyecto completo.

---

## Cómo citar

Si usas este catálogo, por favor cítalo como:

Abarca Ibarra, M. I. (2026). *Catálogo web interactivo de discos protoplanetarios a nivel piloto: una herramienta pedagógica para explorar la morfología y los procesos físicos asociados a la formación planetaria*. Zenodo. https://doi.org/10.5281/zenodo.20515766

---

## Descripción general

Este catálogo reúne fichas individuales de cinco discos protoplanetarios:

- HL Tau
- AS 209
- HD 163296
- IM Lup
- PDS 70

Para cada sistema se organiza información sobre propiedades generales, morfología, subestructuras radiales, distribución de polvo y gas, evidencia de formación planetaria e interpretación física basada en literatura científica.

El proyecto busca funcionar como una herramienta pedagógica y reproducible, conectando astronomía, formación planetaria, ciencia de datos, visualización interactiva y recursos educativos.

---

## Componentes principales del catálogo

El sitio incluye:

- fichas individuales de discos protoplanetarios;
- tablas de propiedades físicas y morfológicas;
- descripciones sobre gas, polvo y evidencia de formación planetaria;
- imágenes representativas de discos;
- una actividad de ciencia de datos basada en imágenes FITS;
- una simulación sintética interactiva;
- una sección abierta para investigaciones, publicaciones, proyectos y colaboraciones;
- documentación para reproducir, editar y ampliar el proyecto.

---

## Investigaciones, publicaciones y colaboraciones

El catálogo incluye una sección titulada **Investigaciones y publicaciones**, pensada como un espacio abierto para reunir futuras investigaciones, publicaciones, proyectos estudiantiles y aportes relacionados con **discos protoplanetarios**.

Esta sección busca que el catálogo pueda crecer más allá de la muestra piloto inicial, incorporando nuevos sistemas, nuevas referencias científicas, nuevas fichas de discos, nuevas actividades educativas y material complementario desarrollado por otras personas interesadas en el estudio de discos protoplanetarios.

Página de investigaciones y publicaciones:

https://martinaabarca.github.io/pilot-protoplanetary-disks-catalog/investigaciones_publicaciones.html

También se pueden proponer contribuciones directamente desde el repositorio de GitHub:

https://github.com/martinaAbarca/pilot-protoplanetary-disks-catalog

---

## Formas de contribuir

El catálogo está abierto a distintos tipos de aportes relacionados con discos protoplanetarios.

### Nuevas fichas de discos

Se pueden proponer fichas de discos protoplanetarios que no estén incluidos en la muestra piloto inicial.

Estas fichas pueden incluir propiedades generales del sistema, morfología del disco, subestructuras observadas, gas, polvo, evidencia de formación planetaria y referencias principales.

### Investigaciones, publicaciones y proyectos

También se pueden proponer resúmenes o materiales basados en publicaciones científicas, tesis, trabajos de curso, proyectos estudiantiles o investigaciones independientes relacionadas con discos protoplanetarios.

Todo aporte relacionado con discos protoplanetarios es bienvenido, siempre que incluya fuentes claras, créditos correspondientes y una descripción adecuada del contenido propuesto.

### Actividades y recursos educativos

El catálogo también puede ampliarse con actividades de ciencia de datos, notebooks, visualizaciones, esquemas, simulaciones, scripts de análisis o explicaciones pedagógicas sobre gas, polvo, morfología de discos y formación planetaria.

---

## Requisitos generales para contribuir

Para mantener la calidad científica y pedagógica del catálogo, cada aporte debería incluir:

- una descripción clara del contenido propuesto;
- referencias bibliográficas confiables;
- créditos de imágenes, datos o material externo;
- indicación del tipo de aporte: publicación, tesis, proyecto estudiantil, ficha de disco, actividad educativa o material complementario;
- archivos fuente editables cuando corresponda;
- formato compatible con la estructura del catálogo.

Las contribuciones serán revisadas antes de incorporarse al sitio, con el objetivo de mantener la coherencia científica, la claridad pedagógica, la trazabilidad de las fuentes y el formato general del catálogo.

---

## Validación del catálogo web

El catálogo fue validado mediante una encuesta en escala Likert aplicada a nueve personas vinculadas al área de la astrofísica, la astronomía y la docencia. La escala utilizada iba de 1 a 5, donde 1 correspondía a “muy en desacuerdo” y 5 a “muy de acuerdo”.

La encuesta consideró aspectos relacionados con la experiencia de usuario, incluyendo si el sitio web era entendible, cómodo de navegar, visualmente organizado y útil como recurso educativo. También se evaluó la utilidad de las fichas de discos, las imágenes, las tablas, la actividad de ciencia de datos y la simulación interactiva.

---

## Tecnologías utilizadas

Este proyecto fue construido con:

- Quarto
- GitHub Pages
- JavaScript
- Python
- JSON/CSV
- HTML/CSS
- imágenes FITS para actividades de ciencia de datos

---

## Estructura general del repositorio

```text
.
├── _quarto.yml
├── index.qmd
├── as_209.qmd
├── hd_163296.qmd
├── hl_tau.qmd
├── im_lup.qmd
├── pds_70.qmd
├── activity_morphology_es.qmd
├── simulation.qmd
├── sobre_el_proyecto.qmd
├── investigaciones_publicaciones.qmd
├── references.bib
├── styles.css
├── simulation.js
├── data/
├── images/
├── documents/
├── scripts/
├── README.md
├── LICENSE
└── CITATION.cff
```

---

## Cómo ejecutar el sitio localmente

Para previsualizar el sitio localmente:

```bash
quarto preview
```

Para renderizar el sitio completo:

```bash
quarto render
```

Para publicar en GitHub Pages:

```bash
quarto publish gh-pages
```

---

## Cómo editar información existente

Para modificar información ya incluida en el catálogo:

1. Abrir el archivo `.qmd` correspondiente al disco o página que se quiere editar.
2. Actualizar el texto, las tablas, las figuras o los enlaces necesarios.
3. Revisar si también debe actualizarse algún archivo JSON dentro de `data/disks/`.
4. Si se agregan nuevas referencias científicas, actualizar `references.bib`.
5. Ejecutar `quarto preview` o `quarto render` para revisar los cambios antes de publicar.

Ejemplos de páginas de discos:

- `as_209.qmd`
- `hd_163296.qmd`
- `hl_tau.qmd`
- `im_lup.qmd`
- `pds_70.qmd`

---

## Cómo ampliar el catálogo paso a paso

El catálogo fue diseñado para poder ampliarse de manera modular. Esto significa que una persona puede agregar nuevos discos protoplanetarios, nuevas referencias, nuevas imágenes, nuevas actividades, proyectos, investigaciones o publicaciones sin modificar toda la estructura del sitio.

A continuación se describe el flujo recomendado para incorporar nuevo contenido al catálogo.

### 1. Definir el tipo de aporte

Primero se debe identificar qué tipo de contribución se quiere realizar. Puede ser:

- una nueva ficha de disco protoplanetario;
- una actualización de una ficha existente;
- una publicación científica relacionada con discos protoplanetarios;
- una tesis o proyecto estudiantil;
- una actividad educativa;
- un notebook de análisis de datos;
- una visualización o simulación;
- una corrección bibliográfica;
- una mejora visual o técnica del sitio.

### 2. Revisar la literatura científica o fuente principal

Antes de modificar el sitio, se recomienda recopilar información desde artículos científicos publicados, tesis, proyectos académicos, bases de datos o documentación confiable.

Para una nueva ficha de disco, la información mínima sugerida incluye:

- nombre del sistema;
- distancia;
- edad;
- tipo espectral;
- masa estelar;
- inclinación del disco;
- ángulo de posición;
- morfología principal;
- anillos, brechas, cavidades, espirales o asimetrías observadas;
- trazadores de gas y polvo;
- evidencia de formación planetaria;
- referencias bibliográficas.

La información debe extraerse de forma cuidadosa, manteniendo siempre la referencia científica correspondiente.

### 3. Crear o modificar el archivo JSON del disco

Cada disco del catálogo tiene un archivo de datos estructurados dentro de la carpeta:

```text
data/disks/
```

Para agregar un nuevo disco, se debe crear un nuevo archivo JSON siguiendo el mismo formato de los discos existentes. Por ejemplo:

```text
data/disks/nuevo_disco.json
```

Se recomienda usar como plantilla uno de los archivos ya existentes:

```text
data/disks/hl_tau.json
data/disks/as_209.json
data/disks/hd_163296.json
data/disks/im_lup.json
data/disks/pds_70.json
```

El nuevo archivo debe contener las propiedades generales del sistema, las estructuras observadas, la información de gas y polvo, las referencias y los campos necesarios para que el disco pueda integrarse al catálogo.

### 4. Crear una nueva página `.qmd` para el disco

Cada disco tiene una página individual escrita en Quarto. Para agregar un nuevo sistema, se debe crear un archivo `.qmd` en la carpeta principal del proyecto. Por ejemplo:

```text
nuevo_disco.qmd
```

Se recomienda copiar la estructura de una página ya existente y modificar su contenido:

```text
hl_tau.qmd
as_209.qmd
hd_163296.qmd
im_lup.qmd
pds_70.qmd
```

La nueva página puede incluir secciones como:

- descripción general del sistema;
- propiedades generales;
- morfología del disco;
- mediciones morfológicas;
- polvo en el disco;
- gas en el disco;
- evidencia de formación planetaria;
- interpretación física;
- referencias.

### 5. Agregar investigaciones, publicaciones o proyectos

Si el aporte corresponde a una investigación, publicación, tesis, proyecto estudiantil o material complementario, puede integrarse en la página:

```text
investigaciones_publicaciones.qmd
```

En ese caso, se recomienda incluir:

- título del trabajo;
- autoría o responsables;
- tipo de material: publicación, tesis, proyecto, notebook, recurso educativo u otro;
- breve descripción del contenido;
- enlace al trabajo, si está disponible;
- DOI, enlace permanente o repositorio, si existe;
- referencias o créditos correspondientes;
- relación del aporte con discos protoplanetarios.

El objetivo de esta sección es reunir material relacionado con discos protoplanetarios y abrir el catálogo a futuras colaboraciones.

### 6. Agregar imágenes o recursos visuales

Las imágenes asociadas al nuevo sistema o aporte deben guardarse en la carpeta:

```text
images/
```

Se recomienda usar nombres claros y consistentes. Por ejemplo:

```text
images/nuevo_disco_continuum.jpg
images/nuevo_disco_gas.jpg
```

Si las imágenes provienen de artículos científicos, observatorios, archivos públicos o comunicados oficiales, se debe mantener el crédito correspondiente y respetar las condiciones de uso de la fuente original.

### 7. Actualizar la bibliografía

Si el nuevo aporte requiere nuevas referencias científicas, estas deben agregarse al archivo:

```text
references.bib
```

Cada referencia debe incluir una clave bibliográfica clara. Por ejemplo:

```text
Andrews2020
Huang2018
ALMAPartnership2015
```

Luego, esas referencias pueden citarse dentro de las páginas `.qmd` usando el formato de citación de Quarto.

### 8. Enlazar el nuevo contenido desde el sitio

Para que el nuevo contenido aparezca en el sitio web, se debe enlazar desde la página correspondiente.

Si es una nueva ficha de disco, se debe agregar una tarjeta o enlace en:

```text
index.qmd
```

Por ejemplo:

```markdown
[Ver ficha del disco](nuevo_disco.qmd)
```

Si es una investigación, publicación o proyecto, se debe agregar en:

```text
investigaciones_publicaciones.qmd
```

### 9. Actualizar la configuración de Quarto

Si el proyecto usa una lista explícita de archivos a renderizar, se debe agregar la nueva página en el archivo:

```text
_quarto.yml
```

Por ejemplo:

```yaml
render:
  - index.qmd
  - hl_tau.qmd
  - as_209.qmd
  - hd_163296.qmd
  - im_lup.qmd
  - pds_70.qmd
  - nuevo_disco.qmd
  - activity_morphology_es.qmd
  - simulation.qmd
  - sobre_el_proyecto.qmd
  - investigaciones_publicaciones.qmd
```

Esto asegura que Quarto incluya la nueva página cuando se renderice el sitio.

### 10. Revisar que los archivos estén incluidos como recursos

El archivo `_quarto.yml` debe incluir las carpetas de recursos necesarias para que los datos, imágenes, documentos y scripts se copien correctamente al sitio publicado. En este proyecto, las carpetas principales son:

```yaml
resources:
  - data/**
  - images/**
  - documents/**
  - simulation.js
```

Si se agregan nuevas carpetas, también deben incorporarse en esta sección.

### 11. Probar el sitio localmente

Antes de publicar los cambios, se recomienda revisar el sitio en el computador usando:

```bash
quarto preview
```

Esto permite verificar que la nueva página se vea correctamente, que los enlaces funcionen y que no existan errores de formato.

También se puede renderizar el sitio completo con:

```bash
quarto render
```

### 12. Validar los archivos del catálogo

Si se modifican archivos JSON o datos estructurados, se recomienda ejecutar los scripts de validación disponibles en la carpeta:

```text
scripts/
```

Por ejemplo:

```bash
python scripts/validate_catalog.py
```

Esto ayuda a detectar errores de estructura, campos faltantes o problemas en los datos antes de publicar el sitio.

### 13. Subir los cambios a GitHub

Una vez revisados los cambios, se deben guardar y subir al repositorio:

```bash
git add .
git commit -m "Agregar nuevo contenido al catalogo"
git push origin main
```

### 14. Publicar la nueva versión del sitio

Después de subir los cambios, el sitio puede publicarse nuevamente en GitHub Pages usando:

```bash
quarto publish gh-pages
```

También se puede usar el flujo de publicación configurado en GitHub Actions, si está activo en el repositorio.

### 15. Actualizar Zenodo si corresponde

Si la ampliación del catálogo corresponde a una nueva versión importante del proyecto, se recomienda crear una nueva versión en Zenodo. Esto permite conservar un registro permanente y citable de los cambios realizados.

En ese caso, se debe actualizar también:

- el archivo `README.md`;
- el archivo `CITATION.cff`;
- la página `sobre_el_proyecto.qmd`;
- la página `investigaciones_publicaciones.qmd`;
- la descripción del registro en Zenodo, si corresponde.

Con este flujo, el catálogo puede crecer de forma ordenada, manteniendo su estructura reproducible, citable y fácil de actualizar.

---

## Reproducibilidad

Este proyecto fue diseñado para ser:

- **reproducible**, porque el sitio puede renderizarse localmente con Quarto;
- **editable**, porque el contenido está dividido en archivos modulares;
- **ampliable**, porque se pueden agregar nuevos discos, nuevas referencias, nuevas investigaciones, nuevas publicaciones y nuevas actividades;
- **citable**, porque cuenta con un registro permanente en Zenodo y DOI.

---

## Licencia

El código fuente del proyecto se distribuye bajo licencia **MIT**.

El contenido educativo original del catálogo se distribuye bajo licencia **Creative Commons Attribution 4.0 International (CC BY 4.0)**, excepto cuando se indique lo contrario.

Los datos, imágenes astronómicas, archivos FITS, figuras externas, artículos científicos, logos y otros materiales de terceros conservan sus licencias, créditos y condiciones de uso originales.

---

## Contacto

Autora: **Martina Ignacia Abarca Ibarra**  
Institución: **Universidad de Santiago de Chile**  
Carrera: **Astrofísica con mención en Ciencia de Datos**

Correo:

abarca.tina3@gmail.com

Repositorio del proyecto:

https://github.com/martinaAbarca/pilot-protoplanetary-disks-catalog