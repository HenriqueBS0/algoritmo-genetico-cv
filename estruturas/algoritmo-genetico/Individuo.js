class Individuo {

    /**
     * @param {Array<Number>} cromossomo 
     */
    setCromossomo(cromossomo) {
        this.cromossomo = cromossomo;
        return this; 
    }

    /**
     * @param {Number} pontuacao 
     */
    setPontuacao(pontuacao) {
        this.pontuacao = pontuacao; 
        return this;
    }

    /**
     * @returns {Array<Number>}
     */
    getCromossomo() {
        return this.cromossomo;
    }

    /**
     * 
     * @returns {Number}
     */
    getPontuacao() {
        return this.pontuacao;
    }
}

module.exports = Individuo;