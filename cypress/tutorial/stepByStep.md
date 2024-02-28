Cypress tutorial

PROYECTO NUEVO FROM SCRATCH

0. crear un repo en github y clonarlo. asi ya queda conectado al remoto. 

1. npm init para instalar el package.json
Este archivo es esencial en el desarrollo de aplicaciones Node.js y es utilizado por el sistema de gestión de paquetes npm para instalar dependencias, ejecutar scripts y gestionar otros aspectos del proyecto.

para remover el node:
rm -rf ./node_modules

1.2 git config --global user.name
      git config --global user.email

1.3 npm install instala las dependencies del package.json

2. npm install cypress --save-dev cypress instala la ultima de cypress 
  * una vez se colgaba y use esto
you need to downgrade npm version
npm install -g npm@6
https://github.com/cypress-io/cypress/issues/19675

3. npm i npx instala npx (Npx es una herramienta de cli que nos permite ejecutar paquetes de npm de forma mucho más sencilla.)
podes abrir con npx cypress open

4.crear en la raiz el archivo .gitignore y adentro poner node_modules

4.1 abrir cypress y correr para que cree el framework
npx cypress open

5. en cypress.config.js agregar dentro de e2e
specPattern: "cypress/e2e/**/*.js"

"cypress/e2e": Representa la ruta base, que es cypress/e2e.
/**/: Representa cualquier número de directorios dentro de la ruta.
*: Representa cualquier nombre de archivo.
.js: Esto indica que el patrón debe coincidir con archivos que tengan una extensión ".js".

esto hace que cypress reconozca estos specs (tests)

npm install eslint-plugin-cypress -D
avisa de posibles errores y mejora 

en package.json agregar
"eslintConfig": {
"env": {
"cypress/globals": true
},
"plugins": [
"cypress"
]
},

7. configuar en  cypress.config.js  la baseUrl
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://storefront.release.getsauce.com/order"
  },
});


8. /// <reference types = "cypress" /> en el top de los specs para habilitar la intelisense de cypress en vsc












vsc 
ctrl k c comenta
ctrl k u descomenta


it.only solo corre ese caso

CONSOLA gitbash
clear limpia la consola
CTRL C en la consola detiene el proceso







SELECTORS

https://docs.cypress.io/guides/references/best-practices
VER ARCHIVO: dom_and_elements.pdf

https://learn.microsoft.com/es-es/microsoft-edge/devtools-guide-chromium/console/utilities -- Funciones y selectores de la utilidad de herramientas de consola
https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors este es muy bueno, con ejemplos. ACA! fijarse en selectors-attribute selectores o en selectors-class o etc. da ejemplos de como seleccionar por clase, por atributo, por id
https://www.w3schools.com/xml/xpath_syntax.asp XPATH

html tags
<a> para links. 
	atributos:
		href=”URL_o_RUTA_destino”;
		target con valor ”self” o “_blank”, dependiendo de si quieres que el enlace se abra en la misma página o en una pestaña nueva.

<div>

cy.get("[placeholder='username']") 

clases .
class vienen del css y se pueden aplicar adistintos elementos
va precedido por un .

ej: <div class: catgories>
.categories
 
id
es precedido por un #
tags can only contain 1 id
EJ: <h1 id="hola">
#hola
[id^='headlessui-dialog-panel-'] // id que empieza con 

para buscar un child hijo
'#card-list > :nth-child(2)'

The difference between an ID and a Class is that an ID can be
used to identify one element, whereas a Class can be used to
identify more than one.

Parent and sibling elements
parent
li > a (elige todas las li que tienen un a)

CSS
$ -> termina con
a[href$='contact']
^ -> empieza con

('li[class^="comet-pagination-item"]')


ASSERTIONS

chai
https://docs.cypress.io/guides/references/assertions#Adding-New-Assertions\
https://www.chaijs.com/

should/expect/assert

assertion sobre estilos css
should('have.css', 'color', 'rgb(250, 0, 0)')

MUTE HIDE LOGS
https://dev.to/samelawrence/muting-noisy-xhr-logs-in-cypress-4495

For the fix, we add a flag to our cypress.config.js to allow us to enable or disable rich logging as needed.
e2e: {
  hideXHRInCommandLog: true
}

In our /cypress/support/e2e.Js file, we have:
// Hide fetch/XHR requests from command log
if (Cypress.config("hideXHRInCommandLog")) {
  const app = window.top;

  if (
    app &&
    !app.document.head.querySelector("[data-hide-command-log-request]")
  ) {
    const style = app.document.createElement("style");
    style.innerHTML =
      ".command-name-request, .command-name-xhr { display: none }";
    style.setAttribute("data-hide-command-log-request", "");

    app.document.head.appendChild(style);
  }
}

CY.DOCUMENT
 cy.document().should("have.property", "charset").and("eq", "UTF-8") //abre el html y se fija que tenga esa propiedad con ese valor
CY.TITLE        
cy.title().should("include", "WebDriver") //se fija que el titulo de la pagina contenga esa palabra
CY.URL        
cy.url().should("include", "contactus") // chequea q en la url este esa palabra

CHAINING COMMANDS
CONTAINS
cy.get('.prdocutname').contains('Skinsheen Bronzer Stick').click()  // busca todas las clases .productname y dentro la que tenga ese texto "skynshee..."
FIND AND EQ
 cy.get('.fixed_wrapper').find('.prdocutname').eq(0).click() // busca la clase .fixed_wrapper y dentro la clase 


SYNCHRONOUS VS ASYNCHRONOUS
Cypress commands are asynchronous, and Cypress is built upon NodeJS, hence why
in earlier lectures we setup and used npm which is the Node package manager for
the JavaScript programming language.
Note
: that asynchronous does not mean the same thing as concurrent or multi
threaded JavaScript can have asynchronous code, but it is generally single
threaded.
This is like a restaurant which has a single worker who does all of the cooking and
serving of the food however if the single worker, works quickly enough and can
switch between tasks efficiently, then the restaurant seemingly has multiple workers
/ tasks running at the same time even though the restaurant only has one worker

WHAT IS SYNCHRONOUS?

Code is executed one at a time in the order it appears.

Single threaded synchronous execution (Executed in a sequenced
manner).

In JavaScript this means one thing is happening at a time

WHAT IS ASYNCHRONOUS?

Asynchronous more than one thing at a time.

Some code is executing which starts of executing some other
code and that code starts executing some more code.

All this code is executing within the engine at the same time.

Whatever step is available to be executed will be executed...!

SI SE USAN NON CYPRESS COMMANDAS EL ORDEN NO ESTÁ GARANTIZADO.
Ej: si usas console.log("hola") este se va a imprimir antes de que corran los cypress commands

PROMISES

pueden ser rejected or accepted

.then // returns a promise

EACH // sirve para iterar por elementos de un array

cy.get('ul>li').each(($el, index, $list) => {
  // $el is a wrapped jQuery element
  if ($el.someMethod() === 'something') {
    // wrap this element so we can
    // use cypress commands on it
    cy.wrap($el).click()
  } else {
    // do something else
  }
})

ALIAS // GUARDAS VARIABLES PARA USAR DESPUES
puede ser para guardar algo en el beforeEach
o dentro de un it, para un elemento que le tenes que aplicar distintas assertions


beforeEach(() => {
  // alias the $btn.text() as 'text'
  cy.get('button').invoke('text').as('text')
})

it('has access to text', function () {
  this.text // is now available
})

WRAP // AGARRA UN ELEMENTO YIELDED PARA APLICARLE CYPRESS COMMANDS


FIXTURE
load data from other document
cy.fixture('users').as('usersJson') // load data from users.json
cy.fixture('logo.png').then((logo) => {
  // load data from logo.png
})










PAUSE
cy.pause()
 
cy.get().pause().click()   // para debuguear

WAIT
cy.wait(3000) // espera 3 segundos

DEBUGGING

.debug()

se usa con un then

it('let me debug when the after the command executes', () => {
  cy.visit('/my/page/path')

  cy.get('[data-testid="selector-in-question"]').then(($selectedElement) => {
    // Debugger is hit after the cy.visit
    // and cy.get commands have completed
    debugger
  })
})

abrir la dev tools
en sources se ve donde freno
en la console se puede escribir un js


SCREENSHOT AND VIDEO
se configura en cypress config
https://docs.cypress.io/guides/references/configuration#Screenshots

screenshotOnRunFailure: true,
trashAssetsBeforeRuns: true, ///borra los archivos antes de arrancar

y en el caso tmb podes poner
cy.screenshot()

video: true, // graba video


se usa con cypress run


COOKIES
cy.clearCookies()
cy.clearLocalStorage()



RETRIES
se pueden configurar desde cypress.config.js



GIT IGNORE
.gitignore
archivo donde vas poniendo lo que no queres que commitee

DEBUGGER
cy.debug()

retries en cypress.config
dentro de e2e
retries: 2
vuelve a intentar cuando falla



API

