class Distancias {
    distancias = {};

    /**
     * @param {Number} primeiroIndice 
     * @param {Number} segundoIndice 
     * @param {Number} distancia 
     */
    add(primeiroIndice, segundoIndice, distancia) {

        this.distancias[primeiroIndice] = this.distancias[primeiroIndice] ? this.distancias[primeiroIndice] : {};
        this.distancias[segundoIndice] = this.distancias[segundoIndice] ? this.distancias[segundoIndice] : {};  

        this.distancias[primeiroIndice][segundoIndice] = distancia;
        this.distancias[segundoIndice][primeiroIndice] = distancia;
    }

    /**
     * 
     * @param {Number} primeiroIndice 
     * @param {Number} segundoIndice 
     * @returns {Number}
     */
    get(primeiroIndice, segundoIndice) {
        return this.distancias[primeiroIndice][segundoIndice];
    }
}

module.exports = Distancias;