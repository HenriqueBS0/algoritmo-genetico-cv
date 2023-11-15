const Cidade = require("./Cidade");
const GrafoCidades = require("./GrafoCidades");

class GeradorGrafo {
    
    /**
     * @param {Array<Cidade>} cidades
     * @returns {GrafoCidades} 
     */
    static gerar(cidades) {
        const grafo = new GrafoCidades();
        
        cidades.forEach(cidade => grafo.add(cidade));

        cidades.forEach(primeiraCidade => {
            cidades.forEach(segundaCidade => {
                if(primeiraCidade.getIndice() === segundaCidade.getIndice()) {
                    return;
                }

                grafo.addDistancia(primeiraCidade.getIndice(), segundaCidade.getIndice(), Math.floor(Math.random() * 10000) + 1);
            });
        });

        return grafo;
    }
}

module.exports = GeradorGrafo;