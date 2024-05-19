const grade = document.querySelector(".grade");
const quantidadeDePlataformas = 5;
var  plataformasEmJogo = [];

//TODO queda do boneco
//TODO  mover o boneco para esquerda e direita + mudar a posição do boneco de acordo com o botão (esquerda ou direita) clicado
//TODO fim de jogo e vitória de jogo

function pularBoneco(indice) {
    boneco = document.querySelector(".boneco");
    let quantidadeDePixels = Number.parseFloat((boneco.style.bottom).replace(/[a-zA-Z]/g, ''));
    let limiteDePixelsPorPulo = Number.parseFloat((plataformasEmJogo[indice].style.bottom).replace(/[a-zA-Z]/g, ''));

    const intervalo = setInterval(() => {
        quantidadeDePixels = quantidadeDePixels + 5;
        boneco.style.bottom = quantidadeDePixels + "px";
        pararIntervalo();
    }, 10);

    function pararIntervalo() {
        if (quantidadeDePixels === limiteDePixelsPorPulo + 190) {
            clearInterval(intervalo);
        }
    };
};

function removerPlataforma(indice) {
    plataformasEmJogo[indice].remove();
    plataformasEmJogo.splice(indice, 1);
    setTimeout(() => {
        criarPlataforma();
    }, 200);

    pularBoneco(indice);
};

function moverPlataforma() {
    let intervalo = setTimeout(() => {
        plataformasEmJogo.forEach(function (elementoAtual, indice) {
            let quantidadeDePixels = (elementoAtual.style.bottom).replace(/[a-zA-Z]/g, '');
            elementoAtual.style.bottom = quantidadeDePixels - 120 + "px";
            removerPlataformaNoFinalDaGrade(elementoAtual, indice);
        });
    }, 10);

    function removerPlataformaNoFinalDaGrade(elementoAtual, indice) {
            let quantidadeDePixels = Number.parseFloat((elementoAtual.style.bottom).replace(/[a-zA-Z]/g, ''));
        if (quantidadeDePixels <= 0) {
            setTimeout(() => {
                removerPlataforma(indice);
            }, 0);
            }
    }
};

function criarPlataforma() {
    class novasPlataformas {
        constructor(novoPratoBottom) {
            this.novoPratoBottom = novoPratoBottom;
            this.posicaoAleatorioLeft = Math.floor(Math.random() * 315);
            this.Novaplataforma = document.createElement("div");
            grade.appendChild(this.Novaplataforma);
            plataformasEmJogo.push(this.Novaplataforma);
            this.Novaplataforma.classList.add("plataforma");
            this.Novaplataforma.style.left = this.posicaoAleatorioLeft + "px";
            this.Novaplataforma.style.bottom = this.novoPratoBottom + "px";
        };
    };

    if (plataformasEmJogo.length === 0) {
     for (let i = 0; i < quantidadeDePlataformas; i++) {
        let platGap = 600 / quantidadeDePlataformas;
        let novoPratoBottom = 100 + i * platGap;
        const chamarClass = new novasPlataformas(novoPratoBottom);
        }
    } else if (plataformasEmJogo.length < 5 && plataformasEmJogo.length > 0) {
        const chamarClass = new novasPlataformas(580);
    }

};

function criarBoneco() {
    const boneco = document.createElement("div");
    boneco.classList.add("boneco", "boneco-para-direita");
    boneco.style.bottom = Number.parseFloat((plataformasEmJogo[0].style.bottom).replace(/[a-zA-Z]/g, '')) + 40 + "px";
    boneco.style.left = Number.parseFloat((plataformasEmJogo[0].style.left).replace(/[a-zA-Z]/g, '')) + "px";
    grade.appendChild(boneco);

    function cairBoneco() {
        const intervalo = setInterval(() => {
            boneco.style.bottom = Number.parseFloat((boneco.style.bottom).replace(/[a-zA-Z]/g, '')) - 5 + "px";
            verificarElementos();
        }, 30);

        function verificarElementos() {
            plataformasEmJogo.forEach(function (elementoAtual, indice) {
                if (elementoAtual.style.bottom == boneco.style.bottom && elementoAtual.style.left == boneco.style.left) {
                    clearInterval(intervalo);
                    moverPlataforma();
                }
            })
        }
    }
    cairBoneco();
};

criarPlataforma();
criarBoneco();