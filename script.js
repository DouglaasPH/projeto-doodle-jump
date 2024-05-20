const grade = document.querySelector(".grade");
const score = document.querySelector(".score");
let quantidadeDeScore = document.querySelector(".score > span");
const quantidadeDePlataformas = 5;
var  plataformasEmJogo = [];

//TODO  mover o boneco para esquerda e direita + mudar a posição do boneco de acordo com o botão clicado (esquerda ou direita)

// TODO fim de jogo
// FASE PARA TESTES
function gameOver() {
    quantidadeDeScore.remove();
    score.innerHTML = "Game Over!";
}

// TODO queda do boneco
// FASE PARA TESTES
function cairBoneco() {
    const boneco = document.querySelector(".boneco");

    // cair boneco
    const intervalo = setInterval(() => {
        boneco.style.bottom = Number.parseFloat((boneco.style.bottom).replace(/[a-zA-Z]/g, '')) - 5 + "px";
        verificarElementos();
    }, 20);

    // verificar se a cada subida do boneco existe uma plataforma para pular
    function verificarElementos() {
        const boneco = document.querySelector(".boneco");
        const quantidadeDePixelsDoBottomDoBoneco = Number.parseFloat((boneco.style.bottom).replace(/[a-zA-Z]/g, ''));

        plataformasEmJogo.forEach(function (elementoAtual, indice) {

            const pixelsLeftElementoAtual = Number.parseFloat((elementoAtual.style.left).replace(/[a-zA-Z]/g, ''));
            const pixelsLeftBoneco = Number.parseFloat((boneco.style.left).replace(/[a-zA-Z]/g, ''));
            const quantidadeDePixelsDoBottomDoElementoAtual = Number.parseFloat((elementoAtual.style.bottom).replace(/[a-zA-Z]/g, ''));
            
            // Se o boneco bater nas extremidades ou em cima da plataforma, então, pule
            if (pixelsLeftBoneco <= pixelsLeftElementoAtual + 75 && ((pixelsLeftBoneco - 10 <= pixelsLeftElementoAtual + 75 &&
                pixelsLeftBoneco - 10 >= pixelsLeftElementoAtual) || (pixelsLeftBoneco + 51 >= pixelsLeftElementoAtual &&
                pixelsLeftBoneco + 51 <= pixelsLeftElementoAtual + 75)) && quantidadeDePixelsDoBottomDoBoneco ===
                quantidadeDePixelsDoBottomDoElementoAtual) {
                clearInterval(intervalo);
                moverPlataforma();
                quantidadeDeScore.innerHTML = Number(quantidadeDeScore.innerHTML) + 1;
            }
            
            // se o boneco chegar ao final da tela, então gameOver
            if (quantidadeDePixelsDoBottomDoBoneco == 0) {
                clearInterval(intervalo);
                gameOver();
            }
        })
    }
}

function pularBoneco(indice) {
    boneco = document.querySelector(".boneco");
    let quantidadeDePixels = Number.parseFloat((boneco.style.bottom).replace(/[a-zA-Z]/g, ''));
    let limiteDePixelsPorPulo = Number.parseFloat((plataformasEmJogo[indice].style.bottom).replace(/[a-zA-Z]/g, ''));

    const intervalo = setInterval(() => {
        pararIntervalo();
        quantidadeDePixels = quantidadeDePixels + 5;
        boneco.style.bottom = quantidadeDePixels + "px";
    }, 20);

    function pararIntervalo() {
        // se o boneco chegar ao topo, então desça
        if (quantidadeDePixels === 520) {
            console.log("jdjaf")
            clearInterval(intervalo);
            cairBoneco();
        }
        // se alcançar a quantidade de pulos, então desça
        else if (quantidadeDePixels === limiteDePixelsPorPulo + 200) {
            clearInterval(intervalo);
            cairBoneco();
        }
    };
};

// removidor de plataforma
function removerPlataforma(indice) {
    plataformasEmJogo[indice].remove();
    plataformasEmJogo.splice(indice, 1);
    setTimeout(() => {
        criarPlataforma();
    }, 200);

    pularBoneco(indice);
};


function moverPlataforma() {
    descerPlataformas();

    function descerPlataformas() {
        let intervalo = setTimeout(() => {
            plataformasEmJogo.forEach(function (elementoAtual, indice) {
                let quantidadeDePixels = (elementoAtual.style.bottom).replace(/[a-zA-Z]/g, '');
                elementoAtual.style.bottom = quantidadeDePixels - 120 + "px";
                removerPlataformaNoFinalDaGrade(elementoAtual, indice);
            });
        }, 100);
    };

    //remover plataformas que estejam no final da grade
    function removerPlataformaNoFinalDaGrade(elementoAtual, indice) {
            let quantidadeDePixels = Number.parseFloat((elementoAtual.style.bottom).replace(/[a-zA-Z]/g, ''));
        if (quantidadeDePixels <= 0) {
            setTimeout(() => {
                removerPlataforma(indice);
            }, 0);
            }
    };
};

// criar plataformas no início e durante o jogo
function criarPlataforma() {
    //objeto para criar 5 plataformas e, para o objeto manter sempre 5 plataformas na tela 
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

    // se não tiver nenhuma plataforma em jogo, então crie todas
    if (plataformasEmJogo.length === 0) {
     for (let i = 0; i < quantidadeDePlataformas; i++) {
        let platGap = 600 / quantidadeDePlataformas;
        let novoPratoBottom = 100 + i * platGap;
        const chamarClass = new novasPlataformas(novoPratoBottom);
        }
    }
    // mas se tiver faltando crie apenas o que falta
    else if (plataformasEmJogo.length < 5 && plataformasEmJogo.length > 0) {
        const chamarClass = new novasPlataformas(580);
    }

};

// criar boneco no início do jogo
function criarBoneco() {
    const boneco = document.createElement("div");
    boneco.classList.add("boneco", "boneco-para-direita");
    boneco.style.bottom = Number.parseFloat((plataformasEmJogo[0].style.bottom).replace(/[a-zA-Z]/g, '')) + 60 + "px";
    boneco.style.left = Number.parseFloat((plataformasEmJogo[0].style.left).replace(/[a-zA-Z]/g, '')) + "px";
    grade.appendChild(boneco);

    cairBoneco();
};

criarPlataforma();
criarBoneco();