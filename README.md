# Pilot Catalog of Protoplanetary Disks / Catálogo piloto de discos protoplanetarios

---

# Quick Start / Inicio rápido

## English

If you only want to open, review, and edit the project quickly, follow these steps:

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
cd YOUR_REPOSITORY_NAME
```

### 2. Open the folder in Visual Studio Code

Open the cloned folder in **Visual Studio Code**.

### 3. Make sure the required tools are installed

You should have:

- **Git**
- **Quarto**
- **Visual Studio Code**
- **Python**

You can check Quarto with:

```bash
quarto check
```

### 4. Preview the website locally

```bash
quarto preview
```

This command opens a local preview of the website and refreshes automatically when files change.

### 5. Edit the project

The main files to edit are:

- `.qmd` files for the text and layout of each disk page
- `data/disks/*.json` for structured disk information
- `references.bib` for bibliography
- `images/` for figures
- `scripts/` for validation and catalog utilities

### 6. Render the full website

```bash
quarto render
```

### 7. Publish to GitHub Pages

```bash
quarto publish gh-pages
```

---

## Español

Si solo se quiere abrir, revisar y editar el proyecto rápidamente, hay que seguir estos pasos:

### 1. Clonar el repositorio

```bash
git clone YOUR_REPOSITORY_URL
cd YOUR_REPOSITORY_NAME
```

### 2. Abrir la carpeta en Visual Studio Code

Abrir la carpeta clonada en **Visual Studio Code**.

### 3. Verificar que las herramientas necesarias están instaladas

Se debe tener instalado:

- **Git**
- **Quarto**
- **Visual Studio Code**
- **Python**

Quarto puede verificarse con:

```bash
quarto check
```

### 4. Previsualizar el sitio localmente

```bash
quarto preview
```

Este comando abre una vista local del sitio y se actualiza automáticamente cuando cambian los archivos.

### 5. Editar el proyecto

Los archivos principales para editar son:

- archivos `.qmd` para el texto y la estructura de cada página
- `data/disks/*.json` para la información estructurada de cada disco
- `references.bib` para la bibliografía
- `images/` para las figuras
- `scripts/` para validación y utilidades del catálogo

### 6. Renderizar el sitio completo

```bash
quarto render
```

### 7. Publicar en GitHub Pages

```bash
quarto publish gh-pages
```

---

# Español

## Descripción general

Este repositorio contiene un **catálogo piloto, editable y reproducible de discos protoplanetarios** construido con **Quarto**, **Visual Studio Code**, **GitHub** y **Python**.

El proyecto fue diseñado para organizar información científica sobre una pequeña muestra inicial de discos protoplanetarios en un formato claro, pedagógico y ampliable. Su objetivo no es solo presentar propiedades y subestructuras de discos de manera ordenada, sino también hacer que el catálogo sea fácil de **actualizar, revisar, reproducir y expandir**.

Esto significa que otras personas pueden:

- actualizar información científica,
- corregir o mejorar explicaciones,
- agregar nuevos discos,
- agregar nuevas imágenes y referencias,
- incluir nuevas secciones educativas,
- y crear nuevas actividades de ciencia de datos.

Por eso, el catálogo busca funcionar tanto como una **herramienta de comunicación científica** como una **base reproducible** para trabajo colaborativo futuro.

---

## Objetivos principales

Los objetivos principales de este proyecto son:

- centralizar información sobre discos protoplanetarios en un solo lugar,
- presentar propiedades y subestructuras de los discos de forma clara y pedagógica,
- mantener un flujo de trabajo reproducible y editable,
- permitir que futuras personas colaboradoras amplíen el catálogo,
- y conectar el contenido astronómico con actividades educativas y de ciencia de datos.

---

## Tecnologías utilizadas

Este proyecto utiliza:

- **Quarto** para generar el sitio web,
- **Visual Studio Code** para editar los archivos,
- **GitHub** para control de versiones y colaboración,
- **Python** para scripts relacionados con validación y generación del catálogo.

---

## Estructura del repositorio

A continuación se muestra una versión simplificada de la estructura del repositorio:

```text
.
├── _quarto.yml
├── index.qmd
├── references.bib
├── styles.css
├── images/
├── data/
│   └── disks/
│       ├── as_209.json
│       ├── hd_163296.json
│       ├── im_lup.json
│       ├── pds_70.json
│       └── ...
├── scripts/
│   ├── build_master_catalog.py
│   ├── build_catalog_table.py
│   └── validate_catalog.py
├── as_209.qmd
├── hd_163296.qmd
├── im_lup.qmd
├── pds_70.qmd
└── ...
```

### Componentes principales

**1. Archivos `.qmd`**  
Estos archivos contienen las páginas que se muestran en el sitio web. Incluyen explicaciones científicas, tablas, figuras y actividades educativas.

**2. `data/disks/*.json`**  
Estos archivos contienen la información estructurada de cada disco. Ayudan a mantener el catálogo ordenado y facilitan futuras ampliaciones.

**3. `references.bib`**  
Este archivo contiene la bibliografía usada a lo largo del catálogo.

**4. `images/`**  
Esta carpeta almacena las imágenes utilizadas en el sitio.

**5. `scripts/`**  
Esta carpeta contiene scripts en Python usados para validar y organizar la información estructurada del catálogo.

**6. `_quarto.yml`**  
Este archivo contiene la configuración global del sitio en Quarto.

---

## Requisitos

Antes de ejecutar o editar el proyecto, hay que asegurarse de tener instaladas estas herramientas:

- **Git**
- **Quarto**
- **Visual Studio Code**
- **Python**

Opcional pero recomendado:

- un entorno virtual de Python,
- los paquetes de Python requeridos por los scripts.

---

## Cómo clonar y abrir el proyecto

### Paso 1. Clonar el repositorio

```bash
git clone YOUR_REPOSITORY_URL
cd YOUR_REPOSITORY_NAME
```

### Paso 2. Abrir el proyecto en Visual Studio Code

Abrir la carpeta clonada en **Visual Studio Code**.

### Paso 3. Verificar que Quarto está instalado

```bash
quarto check
```

Si Quarto está instalado correctamente, este comando mostrará el estado del entorno.

---

## Cómo ejecutar el sitio web localmente

### Modo de previsualización

Para previsualizar el sitio localmente y actualizarlo automáticamente cuando cambien los archivos:

```bash
quarto preview
```

### Render completo

Para renderizar el sitio completo:

```bash
quarto render
```

---

## Cómo editar contenido existente

Si se quiere **corregir, mejorar o actualizar información que ya forma parte del catálogo**, hay que seguir estos pasos:

### Paso 1. Editar la página correspondiente

Abrir el archivo `.qmd` del disco que se quiere modificar.

Ejemplos:

- `as_209.qmd`
- `hd_163296.qmd`
- `im_lup.qmd`
- `pds_70.qmd`

Estos archivos contienen:

- títulos,
- texto de las secciones,
- figuras,
- tablas,
- actividades educativas.

### Paso 2. Editar el archivo JSON correspondiente

Abrir el archivo JSON asociado dentro de:

```text
data/disks/
```

Por ejemplo:

- `data/disks/as_209.json`
- `data/disks/pds_70.json`

Estos archivos contienen los parámetros estructurados de cada objeto.

### Paso 3. Actualizar la bibliografía si es necesario

Si se agregan o cambian referencias científicas, hay que actualizar:

```text
references.bib
```

### Paso 4. Revisar el resultado

Ejecutar:

```bash
quarto preview
```

o:

```bash
quarto render
```

---

## Cómo agregar un nuevo disco

Este repositorio fue diseñado para que nuevos discos puedan incorporarse de manera clara y reproducible.

### Paso 1. Crear un nuevo archivo JSON

Dentro de:

```text
data/disks/
```

crear un archivo nuevo, por ejemplo:

```text
data/disks/new_disk.json
```

Este archivo debe contener la información estructurada del objeto, por ejemplo:

- nombre del objeto,
- nombres alternativos,
- región,
- distancia,
- propiedades estelares,
- cantidades relacionadas con la morfología,
- propiedades del gas y del polvo,
- información sobre planetas,
- referencias principales.

### Paso 2. Crear una nueva página QMD

Crear un archivo nuevo para la página del disco, por ejemplo:

```text
new_disk.qmd
```

Este archivo debe contener el contenido explicativo que se mostrará en la interfaz, por ejemplo:

- nombres del objeto,
- ubicación,
- descripción general del sistema,
- propiedades del sistema,
- morfología del disco,
- mediciones morfológicas,
- polvo en el disco,
- gas en el disco,
- evidencia de formación planetaria,
- interpretación física,
- actividad educativa.

### Paso 3. Agregar las imágenes

Si el nuevo disco utiliza figuras, hay que colocarlas en:

```text
images/
```

### Paso 4. Agregar la bibliografía

Si se usan artículos nuevos, hay que agregarlos en:

```text
references.bib
```

### Paso 5. Vincular la nueva página dentro del catálogo

Hay que asegurarse de que la nueva página quede enlazada desde la página principal o desde la sección correspondiente del sitio.

### Paso 6. Validar y renderizar

Si es necesario, ejecutar:

```bash
python scripts/build_master_catalog.py
python scripts/validate_catalog.py
quarto render
```

---

## Cómo agregar o modificar una actividad de ciencia de datos

Este catálogo también incluye contenido educativo vinculado con astronomía y ciencia de datos.

Para agregar una nueva actividad o editar una existente:

### Paso 1. Abrir la página del disco correspondiente

Abrir el archivo `.qmd` del disco.

### Paso 2. Ubicar la sección de actividad

Buscar la sección de actividad ya existente o crear una nueva al final de la página.

### Paso 3. Redactar la actividad con claridad

Una buena actividad debe explicar:

- qué datos se van a usar,
- qué debe hacer el estudiante,
- qué resultado se espera,
- y cómo la actividad se conecta con la interpretación física del disco.

### Paso 4. Si se usan datos externos, documentarlos claramente

Por ejemplo, conviene indicar:

- el formato del archivo,
- de dónde vienen los datos,
- y cómo deben cargarse.

### Ejemplos de actividades adecuadas

Ejemplos de actividades posibles:

- cargar y visualizar imágenes FITS,
- calcular perfiles radiales de brillo,
- identificar anillos, brechas o cavidades,
- comparar trazadores de polvo y gas,
- interpretar subestructuras del disco mediante análisis simples.

---

## Cómo validar y organizar el catálogo

Este repositorio incluye scripts en Python para ayudar a mantener la información estructurada.

Dependiendo de la versión del proyecto, se pueden usar los siguientes scripts:

```bash
python scripts/build_master_catalog.py
python scripts/build_catalog_table.py
python scripts/validate_catalog.py
```

Estos scripts pueden servir para:

- validar la estructura interna del catálogo,
- regenerar tablas resumen,
- y mantener organizada la información estructurada.

Si un script devuelve un error, conviene revisar:

- nombres de archivos,
- estructura de los JSON,
- referencias faltantes,
- o rutas inválidas.

---

## Cómo publicar el sitio web

Si el sitio se publica con GitHub Pages mediante Quarto, se puede usar:

```bash
quarto publish gh-pages
```

Este comando publica la versión actual del sitio en GitHub Pages.

Antes de ejecutarlo, conviene asegurarse de que:

- el proyecto renderiza correctamente,
- todos los cambios están guardados,
- el repositorio está correctamente conectado con GitHub,
- y GitHub Pages está configurado para el repositorio.

---

## Flujo de colaboración recomendado

Hay dos formas principales de colaborar con este proyecto.

### Opción 1. Solo revisión

La persona colaboradora puede:

1. clonar el repositorio,
2. revisar los archivos,
3. ejecutar el sitio localmente,
4. y enviar comentarios o sugerencias por separado.

Esta es la opción más simple si el objetivo es solo recibir retroalimentación.

### Opción 2. Contribuir usando Git

Esta es la opción recomendada si la persona colaboradora va a editar el proyecto directamente.

#### Paso 1. Crear una nueva rama

```bash
git checkout -b your-branch-name
```

#### Paso 2. Hacer las ediciones

Modificar los archivos `.qmd`, `.json`, imágenes, bibliografía o scripts que sean necesarios.

#### Paso 3. Guardar los cambios

```bash
git add .
git commit -m "Describe your changes"
```

#### Paso 4. Subir la rama

```bash
git push origin your-branch-name
```

#### Paso 5. Abrir un pull request

Abrir un pull request en GitHub para revisar los cambios propuestos antes de incorporarlos a la rama principal.

---

## Recomendaciones para editar el catálogo

Al editar el catálogo, conviene tener en cuenta estos principios:

- conservar la estructura general del proyecto,
- mantener las afirmaciones científicas asociadas a referencias confiables,
- preservar la consistencia entre cada página `.qmd` y su archivo `.json`,
- escribir con claridad y de forma pedagógica,
- y mantener el proyecto reproducible y fácil de ampliar.

---

## Reproducibilidad

Este proyecto fue pensado para ser:

- **reproducible**, porque el sitio puede renderizarse localmente con Quarto,
- **editable**, porque el contenido está dividido en archivos modulares,
- y **ampliable**, porque se pueden agregar nuevos discos y actividades siguiendo la misma estructura.

---

## Retroalimentación

Si alguien está revisando este proyecto, se agradecen especialmente comentarios sobre:

- claridad científica,
- organización,
- redacción en inglés,
- reproducibilidad,
- valor pedagógico,
- y estructura del código.

---

# English

## Overview

This repository contains a **pilot, editable, and reproducible web catalog of protoplanetary disks** built with **Quarto**, **Visual Studio Code**, **GitHub**, and **Python**.

The project was designed to organize scientific information about a small initial sample of protoplanetary disks in a clear, pedagogical, and expandable format. Its purpose is not only to present disk properties and substructures in an organized way, but also to make the catalog easy to **update, review, reproduce, and expand**.

This means that collaborators can:

- update scientific information,
- improve or rewrite explanations,
- add new disks,
- add new images and references,
- include new educational sections,
- and create new data science activities.

This catalog is therefore intended as both a **scientific communication tool** and a **reproducible foundation** for future collaborative work.

---

## Main goals

The main goals of this project are:

- to centralize information about protoplanetary disks in one place,
- to present disk properties and substructures in a clear and pedagogical way,
- to maintain a reproducible and editable workflow,
- to allow future contributors to expand the catalog,
- and to connect astronomy content with educational and data science activities.

---

## Technologies used

This project uses:

- **Quarto** to generate the website,
- **Visual Studio Code** to edit the files,
- **GitHub** for version control and collaboration,
- **Python** for scripts related to validation and catalog generation.

---

## Repository structure

A simplified version of the repository structure is shown below:

```text
.
├── _quarto.yml
├── index.qmd
├── references.bib
├── styles.css
├── images/
├── data/
│   └── disks/
│       ├── as_209.json
│       ├── hd_163296.json
│       ├── im_lup.json
│       ├── pds_70.json
│       └── ...
├── scripts/
│   ├── build_master_catalog.py
│   ├── build_catalog_table.py
│   └── validate_catalog.py
├── as_209.qmd
├── hd_163296.qmd
├── im_lup.qmd
├── pds_70.qmd
└── ...
```

### Main components

**1. `.qmd` files**  
These files contain the pages shown on the website. They include scientific explanations, tables, figures, and educational activities.

**2. `data/disks/*.json`**  
These files contain the structured information for each disk. They help keep the catalog organized and make future expansion easier.

**3. `references.bib`**  
This file contains the bibliography used across the catalog.

**4. `images/`**  
This folder stores the images used in the website.

**5. `scripts/`**  
This folder contains Python scripts used to validate and organize the structured information of the catalog.

**6. `_quarto.yml`**  
This file contains the global configuration of the Quarto website.

---

## Requirements

Before running or editing the project, make sure the following tools are installed:

- **Git**
- **Quarto**
- **Visual Studio Code**
- **Python**

Optional but recommended:

- a Python virtual environment,
- the Python packages required by the scripts.

---

## How to clone and open the project

### Step 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
cd YOUR_REPOSITORY_NAME
```

### Step 2. Open the project in Visual Studio Code

Open the cloned folder in **Visual Studio Code**.

### Step 3. Check that Quarto is installed

```bash
quarto check
```

If Quarto is installed correctly, this command will display the environment status.

---

## How to run the website locally

### Preview mode

To preview the website locally and automatically refresh it when files change:

```bash
quarto preview
```

### Full render

To render the full website:

```bash
quarto render
```

---

## How to edit existing content

If you want to **correct, improve, or update information already included in the catalog**, follow these steps:

### Step 1. Edit the corresponding page

Open the `.qmd` file of the disk you want to modify.

Examples:

- `as_209.qmd`
- `hd_163296.qmd`
- `im_lup.qmd`
- `pds_70.qmd`

These files contain:

- titles,
- section text,
- figures,
- tables,
- educational activities.

### Step 2. Edit the corresponding JSON file

Open the matching JSON file inside:

```text
data/disks/
```

For example:

- `data/disks/as_209.json`
- `data/disks/pds_70.json`

These files contain the structured parameters of each object.

### Step 3. Update the bibliography if needed

If you add or modify scientific references, update:

```text
references.bib
```

### Step 4. Review the result

Run:

```bash
quarto preview
```

or:

```bash
quarto render
```

---

## How to add a new disk

This repository was designed so that new disks can be added in a clear and reproducible way.

### Step 1. Create a new JSON file

Inside:

```text
data/disks/
```

create a new file, for example:

```text
data/disks/new_disk.json
```

This file should contain the structured information of the object, such as:

- object name,
- alternative names,
- region,
- distance,
- stellar properties,
- morphology-related quantities,
- gas and dust properties,
- planet-related information,
- main references.

### Step 2. Create a new QMD page

Create a new file for the disk page, for example:

```text
new_disk.qmd
```

This file should contain the explanatory content shown in the interface, such as:

- object names,
- location,
- general description of the system,
- system properties,
- disk morphology,
- morphology measurements,
- dust in the disk,
- gas in the disk,
- evidence of planet formation,
- physical interpretation,
- educational activity.

### Step 3. Add the images

If the new disk uses figures, place them in:

```text
images/
```

### Step 4. Add the bibliography

If you use new papers, add them to:

```text
references.bib
```

### Step 5. Link the disk page from the catalog

Make sure the new page is linked from the main page or from the corresponding section of the website.

### Step 6. Validate and render

If needed, run:

```bash
python scripts/build_master_catalog.py
python scripts/validate_catalog.py
quarto render
```

---

## How to add or modify a data science activity

This catalog also includes educational content connected to astronomy and data science.

To add a new activity or edit an existing one:

### Step 1. Open the corresponding disk page

Open the `.qmd` file of the disk.

### Step 2. Locate the activity section

Find the existing activity section, or create a new one near the end of the page.

### Step 3. Write the activity clearly

A good activity should explain:

- what data will be used,
- what the student should do,
- what result is expected,
- and how the activity is connected to the physical interpretation of the disk.

### Step 4. If external data are used, document them clearly

For example, indicate:

- the file format,
- where the data came from,
- and how they should be loaded.

### Examples of suitable activities

Examples include:

- loading and visualizing FITS images,
- computing radial brightness profiles,
- identifying rings, gaps, or cavities,
- comparing dust and gas tracers,
- interpreting disk substructures using simple analysis.

---

## How to validate and organize the catalog

This repository includes Python scripts to help maintain the structured information.

Depending on the project version, the following scripts may be used:

```bash
python scripts/build_master_catalog.py
python scripts/build_catalog_table.py
python scripts/validate_catalog.py
```

These scripts can be used to:

- validate the internal structure of the catalog,
- regenerate summary tables,
- and keep the structured information organized.

If a script returns an error, review:

- file names,
- JSON structure,
- missing references,
- or invalid paths.

---

## How to publish the website

If the website is published with GitHub Pages through Quarto, use:

```bash
quarto publish gh-pages
```

This command publishes the current version of the website to GitHub Pages.

Before running it, make sure that:

- the project renders correctly,
- all changes have been saved,
- the repository is correctly connected to GitHub,
- and GitHub Pages is configured for the repository.

---

## Recommended collaboration workflow

There are two main ways to collaborate with this project.

### Option 1. Review only

A collaborator can:

1. clone the repository,
2. inspect the files,
3. run the website locally,
4. and send comments or suggestions separately.

This is the simplest option if the goal is only feedback.

### Option 2. Contribute using Git

This is the recommended option if the collaborator will edit the project directly.

#### Step 1. Create a new branch

```bash
git checkout -b your-branch-name
```

#### Step 2. Make the edits

Edit the necessary `.qmd`, `.json`, image, bibliography, or script files.

#### Step 3. Save the changes

```bash
git add .
git commit -m "Describe your changes"
```

#### Step 4. Push the branch

```bash
git push origin your-branch-name
```

#### Step 5. Open a pull request

Open a pull request on GitHub to review the proposed changes before merging them into the main branch.

---

## Editing guidelines

When editing the catalog, please keep the following principles in mind:

- preserve the overall structure of the project,
- keep scientific claims tied to reliable references,
- maintain consistency between each `.qmd` page and its `.json` file,
- write clearly and pedagogically,
- and keep the project reproducible and easy to expand.

---

## Reproducibility

This project is intended to be:

- **reproducible**, because the site can be rendered locally with Quarto,
- **editable**, because the content is divided into modular files,
- and **expandable**, because new disks and activities can be added following the same structure.

---

## Feedback

If you are reviewing this project, feedback is especially welcome on:

- scientific clarity,
- organization,
- English writing,
- reproducibility,
- pedagogical value,
- and code structure.

## Project Map / Mapa del proyecto

### English

This section explains the role of the main files and folders in the repository. It is especially useful for collaborators who want to review, edit, or expand the catalog in **Visual Studio Code**.

- **`index.qmd`**  
  Main homepage of the catalog. It introduces the project and serves as the main entry point to the website.

- **`as_209.qmd`, `hd_163296.qmd`, `hl_tau.qmd`, `im_lup.qmd`, `pds_70.qmd`**  
  Individual pages for each protoplanetary disk. These files contain the explanatory text, scientific sections, tables, and educational content shown on the website.

- **`activities.qmd`**  
  Page dedicated to the educational or data science activities included in the catalog.

- **`simulation.qmd`**  
  Page containing the disk simulation presented in the website interface.

- **`simulation.js`**  
  JavaScript file used by the simulation page. It controls the logic and behavior of the interactive simulation.

- **`data/disks/*.json`**  
  Structured data files for each disk. These files store object properties in an organized format and support the reproducibility and future expansion of the catalog.

- **`images/`**  
  Folder containing the figures and images used throughout the catalog, including disk images, gallery images, and interface illustrations.

- **`references.bib`**  
  Main bibliography file used by the catalog pages. New scientific references should be added here.

- **`styles.css`**  
  Custom styling file for the website. It controls visual aspects such as layout, spacing, fonts, and table appearance.

- **`scripts/`**  
  Folder containing Python scripts used to validate the catalog structure, build summary tables, and organize the structured information.

- **`_quarto.yml`**  
  Global Quarto configuration file for the website. It controls site-wide settings such as navigation, format, rendering behavior, and overall structure.

- **`.github/workflows/`**  
  Contains GitHub Actions workflows related to deployment and automation.

### Español

Esta sección explica la función de los principales archivos y carpetas del repositorio. Es especialmente útil para personas colaboradoras que quieran revisar, editar o ampliar el catálogo en **Visual Studio Code**.

- **`index.qmd`**  
  Página principal del catálogo. Introduce el proyecto y funciona como punto de entrada al sitio web.

- **`as_209.qmd`, `hd_163296.qmd`, `hl_tau.qmd`, `im_lup.qmd`, `pds_70.qmd`**  
  Páginas individuales de cada disco protoplanetario. Estos archivos contienen el texto explicativo, las secciones científicas, las tablas y el contenido educativo que se muestra en la web.

- **`activities.qmd`**  
  Página dedicada a las actividades educativas o de ciencia de datos incluidas en el catálogo.

- **`simulation.qmd`**  
  Página que contiene la simulación del disco presentada en la interfaz del sitio web.

- **`simulation.js`**  
  Archivo JavaScript utilizado por la página de simulación. Controla la lógica y el comportamiento de la simulación interactiva.

- **`data/disks/*.json`**  
  Archivos de datos estructurados para cada disco. Estos archivos almacenan las propiedades de cada objeto de forma organizada y apoyan la reproducibilidad y la futura expansión del catálogo.

- **`images/`**  
  Carpeta que contiene las figuras e imágenes usadas a lo largo del catálogo, incluyendo imágenes de discos, imágenes de galería e ilustraciones de la interfaz.

- **`references.bib`**  
  Archivo principal de bibliografía usado por las páginas del catálogo. Las nuevas referencias científicas deben agregarse aquí.

- **`styles.css`**  
  Archivo de estilos personalizados del sitio web. Controla aspectos visuales como la disposición, los espacios, las fuentes y la apariencia de las tablas.

- **`scripts/`**  
  Carpeta que contiene scripts en Python usados para validar la estructura del catálogo, construir tablas resumen y organizar la información estructurada.

- **`_quarto.yml`**  
  Archivo global de configuración de Quarto para el sitio web. Controla aspectos generales como la navegación, el formato, el renderizado y la estructura global del proyecto.

- **`.github/workflows/`**  
  Contiene los workflows de GitHub Actions relacionados con despliegue y automatización.