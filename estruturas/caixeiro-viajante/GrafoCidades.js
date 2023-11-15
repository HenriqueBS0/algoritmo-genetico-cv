const Cidades = require("./Cidades");
const Cidade = require("./Cidade")
const Distancias = require("./Distancias");

class GrafoCidades {
    cidades = new Cidades();
    distancias = new Distancias();

    /**
     * @param {Cidade} cidade 
     */
    add(cidade) {
        this.cidades.add(cidade);
        return cidade.getIndice();
    }

    /**
     * @param {Number} primeiroIndice 
     * @param {Number} segundoIndice 
     * @param {Number} distancia 
     */
    addDistancia(primeiroIndice, segundoIndice, distancia) {
        this.distancias.add(primeiroIndice, segundoIndice, distancia);
    }

    /**
     * @param {Number} primeiroIndice 
     * @param {Number} segundoIndice 
     * @returns {Number}
     */
    getDistancia(primeiroIndice, segundoIndice) {
        return this.distancias.get(primeiroIndice, segundoIndice);
    }

    size() {
        return this.cidades.array().length;
    }

    getTable() {
        const table = {};

        this.cidades.array().forEach(cidadeN => {
            table[cidadeN.getNome()] = {};
            this.cidades.array().forEach(cidadeM => {
                table[cidadeN.getNome()][cidadeM.getNome()] = cidadeN.getIndice() !== cidadeM.getIndice()
                    ? this.distancias.get(cidadeN.getIndice(), cidadeM.getIndice())
                    : null;
            });
        });

        return table;
    }

    static fromJson(grafoJson) {
        const dados = JSON.parse(grafoJson);
        const grafo = new GrafoCidades();
        
        const cidades = dados.cidades.cidades;
        const distancias = dados.distancias.distancias;

        cidades.forEach(cidade => grafo.add(new Cidade(cidade.nome)));

        Object.getOwnPropertyNames(distancias).forEach(primeiroIndice => {
            Object.getOwnPropertyNames(distancias[primeiroIndice]).forEach(segundoIndice => {
                grafo.addDistancia(primeiroIndice, segundoIndice, distancias[primeiroIndice][segundoIndice]);
            });
        });

        return grafo;
    }
}

module.exports = GrafoCidades;