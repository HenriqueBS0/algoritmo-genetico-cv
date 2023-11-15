const Cidade = require("./Cidade");

class Cidades {
    cidades = [];

    /** 
     * @param {Cidade} cidade 
     */
    add(cidade) {
        this.cidades.push(cidade);
        cidade.setIndice(this.cidades.length);
    }

    /**
     * @param {Number} indice 
     * @returns {Cidade}
     */
    get(indice) {
        return this.cidades.slice()[indice  -1];
    }

    /**
     * 
     * @returns {Array<Cidade>}
     */
    array() {
        return this.cidades;
    }
}

module.exports = Cidades;