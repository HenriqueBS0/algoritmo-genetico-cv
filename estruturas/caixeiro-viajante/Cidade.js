
class Cidade {
    nome;
    indice;
    
    /**
     * @param {String} nome 
     */
    constructor(nome) {
        this.nome = nome;
    }

    /**
     * @param {Number} indice 
     */
    setIndice(indice) {
        this.indice = indice;
    }

    /**
     * @returns {Number}
     */
    getIndice() {
        return this.indice;
    }

    /**
     * @returns {String}
     */
    getNome() {
        return this.nome;
    }
}

module.exports = Cidade;