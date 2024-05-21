const grade = document.querySelector(".grade");
const score = document.querySelector(".score");
var quantidadeDeScore = document.querySelector(".score > span");
const quantidadeDePlataformas = 5;
var  plataformasEmJogo = [];
var eGameOver = false;
var estaOcorrendoIntervaloDePulo = false;

// Mover o boneco para esquerda e direita + mudar a posição do boneco de acordo com o botão clicado (esquerda ou direita)
function bonecoIrParaEsquerdaOuDireita(teclaPressionada) {
    // Se o jogador perdeu não execute
    if (eGameOver) return;

    let boneco = document.querySelector(".boneco");
    boneco.style.right = 0 + "px";
    let quantidadeDePixelsDoLadoEsquerdo = Number.parseFloat((boneco.style.left).replace(/[a-zA-Z]/g, ''));

    switch (teclaPressionada) {
        case "ArrowLeft":
            boneco.style.backgroundImage = "url('imagens/doodle_left.png')";
            boneco.style.backgroundPosition = "13px -12px";

            // Se alcançar o limite da tela, retorne. Se não, vá para o lado.
            if (quantidadeDePixelsDoLadoEsquerdo == 0 || quantidadeDePixelsDoLadoEsquerdo <= 8) return;
            else {
                boneco.style.left = (quantidadeDePixelsDoLadoEsquerdo - 10) + "px";
            }
            break;
        case "ArrowRight":
            boneco.style.backgroundImage = "url('imagens/doodle_right.png')";
            boneco.style.backgroundPosition = "-13px -12px";
            // Se alcançar o limite da tela, retorne. Se não, vá para o lado.
            if (quantidadeDePixelsDoLadoEsquerdo == 310 || quantidadeDePixelsDoLadoEsquerdo >= 302) return;
            else {;
                boneco.style.left = (quantidadeDePixelsDoLadoEsquerdo + 10) + "px";
            }
            break;
    }
}


// fim de jogo
function gameOver() {
    quantidadeDeScore.remove();
    score.innerHTML = "Game Over!";
}

// queda de boneco
function cairBoneco() {
    const boneco = document.querySelector(".boneco");

    // cair boneco
    const intervalo = setInterval(() => {
        boneco.style.bottom = Number.parseFloat((boneco.style.bottom).replace(/[a-zA-Z]/g, '')) - 5 + "px";
        verificarElementos();
    }, 20);

    // verificar se a cada subida do boneco existe uma plataforma para pular
    function verificarElementos() {
        //const boneco = document.querySelector(".boneco");
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
                pularBoneco(indice);
            }
            
            // se o boneco chegar ao final da tela, então gameOver
            if (quantidadeDePixelsDoBottomDoBoneco == 0) {
                eGameOver = true;
                clearInterval(intervalo);
                gameOver();
            }
        })
    }
}

// Se o intervalo já estiver sendo executado, pare e comece de novo
function pularBoneco(indice) {
    let boneco = document.querySelector(".boneco");
    let quantidadeDePixels = Number.parseFloat((boneco.style.bottom).replace(/[a-zA-Z]/g, ''));
    let limiteDePixelsPorPulo = Number.parseFloat((plataformasEmJogo[indice].style.bottom).replace(/[a-zA-Z]/g, ''));

    const intervalo = setInterval(() => {
        pararIntervalo();
        quantidadeDePixels = quantidadeDePixels + 5;
        boneco.style.bottom = quantidadeDePixels + "px";
    }, 20);

    function pararIntervalo() {
        // se o boneco chegar ao topo, então desça
        if (quantidadeDePixels == 420) {
            clearInterval(intervalo);
            cairBoneco();
        }
        // se alcançar a quantidade de pulos, então desça
        else if (quantidadeDePixels == limiteDePixelsPorPulo + 300) {
            clearInterval(intervalo);
            cairBoneco();
        }
    };
};

//mover plataformas para baixco
function moverPlataforma() {
        let intervalo = setTimeout(() => {
           plataformasEmJogo.forEach(function (elementoAtual, indice) {
               let quantidadeDePixels = Number((elementoAtual.style.bottom).replace(/[a-zA-Z]/g, ''));
               elementoAtual.style.bottom = quantidadeDePixels - 120 + "px";
               if (elementoAtual.style.bottom == "-20px") {
                   setTimeout(() => {
                       plataformasEmJogo[indice].remove();
                       plataformasEmJogo.splice(indice, 1);
                       criarPlataforma();
                   }, 10);
               }
            });
       }, 100);
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
    // mas se tiver faltando crie apenas o que está falta
    else if (plataformasEmJogo.length < 5 && plataformasEmJogo.length > 0) {
        const chamarClass = new novasPlataformas(580);
    }

};

// criar boneco no início do jogo
function criarBoneco() {
    const boneco = document.createElement("div");
    boneco.classList.add("boneco");
    boneco.style.backgroundImage = "url('imagens/doodle_right.png')";
    boneco.style.backgroundPosition = "-13px -12px";
    boneco.style.bottom = Number.parseFloat((plataformasEmJogo[0].style.bottom).replace(/[a-zA-Z]/g, '')) + 60 + "px";
    boneco.style.left = Number.parseFloat((plataformasEmJogo[0].style.left).replace(/[a-zA-Z]/g, '')) + "px";
    grade.appendChild(boneco);

    cairBoneco();
};

criarPlataforma();
criarBoneco();

document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        bonecoIrParaEsquerdaOuDireita(event.key);
    }
});