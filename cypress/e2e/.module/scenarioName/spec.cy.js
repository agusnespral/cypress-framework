/// <reference types = "cypress" />


const directorioName = __dirname.replaceAll("\\", "/");
const module = directorioName.split(/[/]/)[3];
const scenarioName = directorioName.split(/[/]/).slice(2, 3).join("-");
const testCaseId = directorioName.split(/[-]/).pop();

describe(`${module} - ${scenarioName}`, () => {
    it(`${scenarioName}`, () => {

    });
});