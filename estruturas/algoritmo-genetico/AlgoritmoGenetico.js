// Importa as classes necessárias
const GrafoCidades = require("../caixeiro-viajante/GrafoCidades");
const Individuo = require("./Individuo");

class AlgoritmoGenetico {
    
    /**
     * Executa o algoritmo genético para encontrar uma solução aproximada para o problema do caixeiro viajante.
     * @param {GrafoCidades} grafo - O grafo que representa as cidades e suas distâncias.
     * @param {number} [geracoes=10] - O número de gerações do algoritmo genético.
     * @param {number} [individuosGeracao=20] - O número de indivíduos em cada geração.
     * @param {Number} taxaMutacao - A taxa de mutação para os cromossomos dos indivíduos.
     * @returns {Array<Individuo>} - Os melhores indivíduos de cada geração.
     */
    static rodar(grafo, individuosGeracao = 10, geracoes = 10, taxaMutacao = 0.5) {

        // Garante que o número de indivíduos por geração seja par
        individuosGeracao = individuosGeracao % 2 !== 0 ? individuosGeracao + 1 : individuosGeracao;  

        // Gera a população inicial de indivíduos aleatórios
        let populacao = this.gerarIndividuos(grafo.size(), individuosGeracao);
        const melhores = [];

        // Loop através das gerações
        for (let geracao = 1; geracao <= geracoes; geracao++) {
            // Atribui pontuações aos indivíduos com base nas distâncias percorridas
            populacao = populacao.map(individuo => this.atribuiPontuacao(grafo, individuo));

            // Ordena a população com base nas pontuações
            populacao = this.ranckiar(populacao);

            // Armazena o melhor indivíduo da geração atual
            melhores.push(populacao.at(0));

            // Seleciona os pais para reprodução com base no ranking
            const pais = this.selecionarPaisRanking(populacao);

            // Gera os filhos através de crossover e mutação
            const filhos = this.gerarFilhos(pais, taxaMutacao);

            // Substitui a população atual pela união de pais e filhos
            populacao = [...pais, ...filhos];
        }

        // Retorna os melhores indivíduos de cada geração
        return melhores;
    }

    /**
     * Gera uma população inicial de indivíduos aleatórios.
     * @param {Number} numeroCidades - O número de cidades no problema.
     * @param {Number} numeroIndividuos - O número de indivíduos na população.
     * @returns {Array<Individuo>} - A população inicial.
     */
    static gerarIndividuos(numeroCidades, numeroIndividuos) {
        const individuos = [];

        for (let index = 1; index <= numeroIndividuos; index++) {
            individuos.push(this.gerarIndividuo(numeroCidades));
        }

        return individuos;
    }

    /**
     * Gera um indivíduo aleatório com um cromossomo representando uma possível solução.
     * @param {Number} numeroCidades - O número de cidades no problema.
     * @returns {Individuo} - O indivíduo gerado.
     */
    static gerarIndividuo(numeroCidades) {
        // Função para embaralhar um array
        const embaralhaArray = array => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }   

        // Cria um novo indivíduo com um cromossomo embaralhado
        return new Individuo().setCromossomo(embaralhaArray(Array.from({ length: numeroCidades }, (_, i) => i + 1)));
    }

    /**
     * Atribui uma pontuação a um indivíduo com base nas distâncias percorridas no cromossomo.
     * @param {GrafoCidades} grafo - O grafo que representa as cidades e suas distâncias.
     * @param {Individuo} individuo - O indivíduo a ser avaliado.
     * @returns {Individuo} - O indivíduo com a pontuação atribuída.
     */
    static atribuiPontuacao(grafo, individuo) {
        let pontuacao = 0;

        for (let index = 0; index < individuo.getCromossomo().length; index++) {
            const primeiraCidade = individuo.getCromossomo()[index]; 
            const segundaCidade = individuo.getCromossomo()[index === individuo.getCromossomo().length - 1 ? 0 : index + 1];
            
            // Adiciona a distância entre as cidades ao total da pontuação
            pontuacao += grafo.getDistancia(primeiraCidade, segundaCidade);
        }

        // Define a pontuação do indivíduo e o retorna
        return individuo.setPontuacao(pontuacao);
    }

    /**
     * Seleciona os pais com base no ranking dos indivíduos.
     * @param {Array<Individuo>} populacao - A população de indivíduos.
     * @returns {Array<Individuo>} - Os pais selecionados.
     */
    static selecionarPaisRanking(populacao) {
        // Seleciona os melhores indivíduos com base no ranking
        return this.ranckiar(populacao).slice(0, populacao.length / 2);
    }

    /**
     * Ordena a população com base nas pontuações dos indivíduos.
     * @param {Array<Individuo>} populacao - A população de indivíduos.
     * @returns {Array<Individuo>} - A população ordenada.
     */
    static ranckiar(populacao) {
        // Ordena a população com base nas pontuações
        return populacao.sort((individuoA, individuoB) => individuoA.getPontuacao() - individuoB.getPontuacao());
    }

    /**
     * Gera os filhos através de crossover e mutação.
     * @param {Array<Individuo>} pais - Os pais selecionados para reprodução.
     * @param {Number} taxaMutacao - A taxa de mutação para os cromossomos dos filhos.
     * @returns {Array<Individuo>} - Os filhos gerados.
     */
    static gerarFilhos(pais, taxaMutacao) {
        const filhos = [];

        // Loop através dos pares de pais
        for (let indexPai = 0; indexPai < pais.length; indexPai++) {
            const primeiroPai = pais[indexPai];
            const segundoPai = pais[indexPai !== pais.length - 1 ? indexPai + 1 : 0];

            // Ponto de corte para o crossover
            const pontoCorte = Math.floor(Math.random() * primeiroPai.getCromossomo().length);

            // Gera o cromossomo do filho combinando os cromossomos dos pais
            const cromossomo = primeiroPai.getCromossomo().slice(0, pontoCorte);

            segundoPai.getCromossomo().forEach(indiceCidade => {
                if (!cromossomo.includes(indiceCidade)) {
                    cromossomo.push(indiceCidade);
                }
            });

            // Cria um novo indivíduo com o cromossomo gerado e aplica mutação
            filhos.push(new Individuo().setCromossomo(this.mutar(cromossomo, taxaMutacao)));
        }

        // Retorna os filhos gerados
        return filhos;
    }

    /**
     * Aplica mutação ao cromossomo com base na taxa de mutação.
     * @param {Array<Number>} cromossomo - O cromossomo a ser mutado.
     * @param {Number} taxaMutacao - A taxa de mutação.
     * @returns {Array<Number>} - O cromossomo após a mutação.
     */
    static mutar(cromossomo, taxaMutacao) {
        // Loop através do cromossomo
        for (let indexCromossomo = 0; indexCromossomo < cromossomo.length; indexCromossomo++) {
            // Verifica se a mutação deve ocorrer com base na taxa de mutação
            if ((Math.random() * 100) <= taxaMutacao) {
                // Troca dois genes aleatórios de posição no cromossomo
                const cromossomoTroca = cromossomo[indexCromossomo];
                const indexCromossomoTroca = indexCromossomo === 0 ? indexCromossomo + 1 : indexCromossomo - 1;
                cromossomo[indexCromossomo] = cromossomo[indexCromossomoTroca];
                cromossomo[indexCromossomoTroca] = cromossomoTroca;
            }
        }

        // Retorna o cromossomo após a mutação
        return cromossomo;
    }
}

// Exporta a classe AlgoritmoGenetico para uso em outros arquivos
module.exports = AlgoritmoGenetico;
