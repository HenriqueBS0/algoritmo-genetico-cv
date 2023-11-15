const fs = require('fs');


const AlgoritmoGenetico = require('./estruturas/algoritmo-genetico/AlgoritmoGenetico');
const Cidade = require('./estruturas/caixeiro-viajante/Cidade');
const GeradorGrafo = require('./estruturas/caixeiro-viajante/GeradoGrafo');
const GrafoCidades = require('./estruturas/caixeiro-viajante/GrafoCidades');

const grafo = fs.existsSync('./grafo.json') ? GrafoCidades.fromJson(fs.readFileSync('./grafo.json', 'utf-8')) : GeradorGrafo.gerar([
    new Cidade('Aurora'), 
    new Cidade('Agronômica'), 
    new Cidade('Rio do Sul'),
    new Cidade('Lontras'),
    new Cidade('Ituporanga'),
    new Cidade('Atalanta'),
    new Cidade('Laurentino'),
    new Cidade('Rio do Oeste'),
    new Cidade('Centro do Trombudo'),
    new Cidade('Braço do Trombudo'),
    new Cidade('Agrolândia'),
]);

fs.writeFileSync('grafo.json', JSON.stringify(grafo));

console.table(grafo.getTable());

console.table(AlgoritmoGenetico.rodar(grafo, 20, 10).at(0));
console.table(AlgoritmoGenetico.rodar(grafo, 20, 10).at(0));
console.table(AlgoritmoGenetico.rodar(grafo, 20, 200).at(0));
console.table(AlgoritmoGenetico.rodar(grafo, 20, 200).at(0));
console.table(AlgoritmoGenetico.rodar(grafo, 20, 10000).at(0));
console.table(AlgoritmoGenetico.rodar(grafo, 20, 10000).at(0)); 

// console.table({'Melhor Rota': melhores.pop().getCromossomo().map(cidade => grafo.cidades.get(cidade).getNome())});