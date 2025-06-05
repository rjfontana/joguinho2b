const videoElement = document.getElementById('webcam');
const canvasElement = document.getElementById('output');
const canvasCtx = canvasElement.getContext('2d');

const showWaveBtn = document.getElementById('showWaveBtn');
const waveCanvas = document.getElementById('waveCanvas');
const waveCtx = waveCanvas.getContext('2d');

let showWave = false;
let waveAmplitude = 50; // valor inicial
let waveLength = 200;   // valor inicial

showWaveBtn.onclick = () => {
  showWave = !showWave;
  waveCanvas.style.display = showWave ? 'block' : 'none';
};

function drawWave(amplitude, length) {
  waveCtx.clearRect(0, 0, waveCanvas.width, waveCanvas.height);
  waveCtx.beginPath();
  for (let x = 0; x < waveCanvas.width; x++) {
    const y = waveCanvas.height / 2 + amplitude * Math.sin((x / length) * 2 * Math.PI);
    if (x === 0) waveCtx.moveTo(x, y);
    else waveCtx.lineTo(x, y);
  }
  waveCtx.strokeStyle = "#00eaff";
  waveCtx.lineWidth = 4;
  waveCtx.stroke();
}

const bands = document.querySelectorAll('.band');
const infoBox = document.getElementById('infoBox'); // Adicione um elemento <div id="infoBox"></div> no HTML

const bandInfo = [
  {
    nome: "Rádio",
    comprimento: "10³ m",
    escala: "Prédio",
    frequência: "10⁴ Hz",
    temperatura: "1 K (-272 °C)",
    penetra: "Sim",
    descricao: `
    <div style="background:#181c24; border-left:5px solid #00eaff; border-radius:10px; padding:14px 18px; margin-top:10px; color:#fff; font-size:1.08rem;">
      <b style="color:#00eaff; font-size:1.15rem;">Ondas de Rádio</b><br>
      As ondas de rádio são uma forma de radiação eletromagnética cujo comprimento de onda está em um dos extremos do espectro eletromagnético.<br><br>
      O processo de geração de ondas de rádio começa com um transmissor que converte sinais elétricos em ondas eletromagnéticas. Essas ondas, então, viajam pelo espaço a uma velocidade próxima à da luz.<br><br>
      O fenômeno da propagação das ondas de rádio é particularmente interessante, pois elas podem se curvar ao redor de obstáculos e se refletir na atmosfera, permitindo a comunicação em longas distâncias.
    </div>
  `
  },
  {
    nome: "Micro-ondas",
    comprimento: "10⁻² m",
    escala: "Pessoas",
    frequência: "10⁸ Hz",
    temperatura: "100 K (-173 °C)",
    penetra: "Sim",
    descricao: `
    <div style="background:#181c24; border-left:5px solid #00eaff; border-radius:10px; padding:14px 18px; margin-top:10px; color:#fff; font-size:1.08rem;">
      <b style="color:#00eaff; font-size:1.15rem;">Micro-ondas no cotidiano</b><br>
      As micro-ondas são uma forma de radiação eletromagnética que se situa na faixa mais baixa de frequência, entre as ondas de rádio e infravermelho.<br><br>
      As micro-ondas podem ser utilizadas para funcionamento de um radar, por exemplo. Nestes dispositivos, uma fonte emite uma radiação que atinge um objeto e volta para o ponto onde a onda foi emitida. De acordo com a direção em que a radiação volta, pode ser descoberta a localização do objeto que refletiu a onda.<br><br>
      Redes locais sem fio, como <b>Bluetooth</b>, <b>Wi-Fi</b>, <b>WiMAX</b> e outros, usam micro-ondas na faixa de <span style="color:#ffe066;"><b>2,4 a 5,8 GHz</b></span>.
    </div>
  `
  },
  {
    nome: "Infravermelho",
    comprimento: "10⁻⁵ m",
    escala: "Borboletas",
    frequência: "10¹² Hz",
    temperatura: "10 000 K (9 727 °C)",
    penetra: "Parcial",
    descricao: `
    <div style="background:#181c24; border-left:5px solid #00eaff; border-radius:10px; padding:14px 18px; margin-top:10px; color:#fff; font-size:1.08rem;">
      <b style="color:#00eaff; font-size:1.15rem;">Infravermelho no dia a dia</b><br>
      Os raios infravermelho são uma forma de radiação eletromagnética que compreende a faixa de frequência entre as micro-ondas e a luz visível.<br><br>
      A transmissão de sinais do controle remoto para o dispositivo receptor, como uma TV ou um sistema de entretenimento, geralmente ocorre pelo uso de ondas de infravermelho (IR).<br><br>
      Quando você pressiona uma tecla no controle remoto, um circuito interno é ativado, gerando um sinal elétrico que é convertido em um sinal infravermelho.<br><br>
      O sinal infravermelho é emitido por um pequeno diodo emissor de luz (LED) infravermelho na parte frontal do controle remoto. Este LED emite luz infravermelha, que é invisível ao olho humano.<br><br>
      O dispositivo receptor, como a TV ou o sistema de entretenimento, dispõe de um sensor infravermelho (geralmente um fotodiodo) que capta o sinal infravermelho enviado pelo controle remoto. O dispositivo receptor decodifica o sinal infravermelho recebido, interpretando qual tecla foi pressionada.
    </div>
  `
  },
  {
    nome: "Visível",
    comprimento: "0,5 × 10⁻⁶ m",
    escala: "Ponta de agulha",
    frequência: "10¹⁵ Hz",
    temperatura: "10 000 K (9 727 °C)",
    penetra: "Sim",
    descricao: `
    <div style="background:#181c24; border-left:5px solid #00eaff; border-radius:10px; padding:14px 18px; margin-top:10px; color:#fff; font-size:1.08rem;">
      <b style="color:#00eaff; font-size:1.15rem;">A luz visível</b><br>
      A luz, uma <b>onda eletromagnética</b>, corresponde a uma faixa muito específica do espectro eletromagnético.<br><br>
      O espectro da luz visível está compreendido entre 
      <span style="color:#ffe066;"><b>700 nm</b></span> (comprimento de onda da cor <span style="color:#ff6666;">vermelha</span>) e 
      <span style="color:#66aaff;"><b>400 nm</b></span> (comprimento de onda da cor <span style="color:#6666ff;">violeta</span>).<br><br>
      No espectro de frequências, isso corresponde, aproximadamente, à faixa entre 
      <span style="color:#00eaff;"><b>4 &times; 10<sup>14</sup> Hz</b></span> e 
      <span style="color:#00eaff;"><b>8 &times; 10<sup>14</sup> Hz</b></span>.
    </div>
  `
  },
  {
    nome: "Ultravioleta",
    comprimento: "10⁻⁸ m",
    escala: "Células",
    frequência: "10¹⁶ Hz",
    temperatura: "10 000 000 K (~10 000 000 °C)",
    penetra: "Parcial"
  },
  {
    nome: "Raios X",
    comprimento: "10⁻¹⁰ m",
    escala: "Átomos",
    frequência: "10¹⁸ Hz",
    temperatura: "10 000 000 K (~10 000 000 °C)",
    penetra: "Parcial",
    descricao: `
    <div style="display:flex; flex-wrap:wrap; gap:18px; align-items:flex-start; margin-top:10px;">
      <img src="raiox.png" alt="Radiografia histórica de uma mão" style="max-width:180px; border-radius:8px; border:2px solid #00eaff; background:#fff;">
      <div style="flex:1; min-width:220px;">
        <b style="color:#00eaff; font-size:1.15rem;">Raios X na Medicina</b><br>
        Na medicina, os raios X são extensivamente empregados para a produção de radiografias.<br><br>
        Quando tiramos uma radiografia de alguma parte do corpo, um feixe de raios X é disparado de forma a atravessar nossa pele e nossos músculos, mas fica retido pelos nossos ossos.<br><br>
        É por isso que a chapa fotográfica, após a incidência do feixe, mostra as “sombras” dos ossos que estavam no caminho do feixe.<br><br>
        A imagem ao lado mostra uma “radiografia primitiva”, uma das primeiras a ser realizada na História.<br><br>
        A imagem ao lado foi gerada no dia 23 de janeiro de 1896 pelo ganhador do Nobel da Física de 1901 pela descoberta dos raios X, Wilhelm Röntgen (1845-1923).
      </div>
    </div>
  `
  },
  {
    nome: "Raios gama",
    comprimento: "10⁻¹² m",
    escala: "Núcleos",
    frequência: "10²⁰ Hz",
    temperatura: "10 000 000 K (~10 000 000 °C)",
    penetra: "Não",
    descricao: `
    <div style="background:#181c24; border-left:5px solid #00eaff; border-radius:10px; padding:14px 18px; margin-top:10px; color:#fff; font-size:1.08rem;">
      <b style="color:#00eaff; font-size:1.15rem;">Raios gama (γ)</b><br>
      Os raios γ (gama) são ondas eletromagnéticas obtidas por processos nucleares.<br><br>
      <b>Aplicações:</b><br>
      - São fatais para microrganismos, sendo usados na esterilização de instrumentos cirúrgicos.<br>
      - Cereais armazenados por longos períodos são expostos a raios γ para eliminar fungos e bactérias que causam deterioração dos grãos.<br>
      - Também são empregados para destruir tumores cancerígenos.<br>
    </div>
  `
}
];

function showBandInfo(index) {
  const info = bandInfo[index];
  infoBox.innerHTML = `
    <strong>${info.nome}</strong><br>
    Comprimento de onda: ${info.comprimento}<br>
    Escala: ${info.escala}<br>
    Frequência: ${info.frequência}<br>
    Temperatura: ${info.temperatura}<br>
    Penetra na atmosfera? ${info.penetra}
    ${info.descricao ? `<br><br><span style="color:#00eaff">${info.descricao}</span>` : ""}
  `;
}

function onResults(results) {
  bands.forEach(b => b.classList.remove('selected'));
  if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
    const x = results.multiHandLandmarks[0][8].x;
    // Direto: 0 (esquerda) = Rádio, 1 (direita) = Raios gama
    const index = Math.floor(x * bands.length);
    if (bands[index]) {
      bands[index].classList.add('selected');
      showBandInfo(index);
    }
  }

  // Controle da onda com a mão (direto)
  if (showWave && results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
    const indexFingerTip = results.multiHandLandmarks[0][8];
    const y = indexFingerTip.y;
    waveAmplitude = 20 + (1 - y) * 80;
    const x = indexFingerTip.x;
    // Direto: x=0 (esquerda) -> maior comprimento, x=1 (direita) -> menor comprimento
    waveLength = 400 - x * 320; // 400 (maior) à esquerda, 80 (menor) à direita
    drawWave(waveAmplitude, waveLength);
  } else if (showWave) {
    drawWave(waveAmplitude, waveLength);
  }
}

// MediaPipe Hands setup
const hands = new Hands({locateFile: file => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`});
hands.setOptions({
  maxNumHands: 1,
  modelComplexity: 1,
  minDetectionConfidence: 0.7,
  minTrackingConfidence: 0.7
});
hands.onResults(onResults);

// Camera setup
const camera = new Camera(videoElement, {
  onFrame: async () => await hands.send({image: videoElement}),
  width: 640,
  height: 480
});
camera.start();

// Exibir info inicial
showBandInfo(0);

// --- Laboratório do Laser Modal ---
const labModal = document.getElementById('labModal');
const openLabModal = document.getElementById('openLabModal');
const closeLabModal = document.getElementById('closeLabModal');
const discos = document.querySelectorAll('.disco-btn');
const labInterativo = document.getElementById('lab-interativo');
const diametroSpan = document.getElementById('diametro');
const lambdaSlider = document.getElementById('lambdaSlider');
const lambdaValor = document.getElementById('lambdaValor');
const calcularBtn = document.getElementById('calcularBtn');
const frequenciaValor = document.getElementById('frequenciaValor');
const explicacao = document.getElementById('explicacao');

const discosData = {
  "CD": { d: 780, lambda: 650 },
  "DVD": { d: 650, lambda: 550 },
  "Blu-ray": { d: 480, lambda: 400 }
};

let discoAtual = "CD";

openLabModal.onclick = () => {
  labModal.style.display = 'flex';
  selecionarDisco("CD");
};
closeLabModal.onclick = () => {
  labModal.style.display = 'none';
};
window.onclick = function(event) {
  if (event.target === labModal) labModal.style.display = "none";
};

discos.forEach(btn => {
  btn.onclick = () => selecionarDisco(btn.dataset.tipo);
});

function selecionarDisco(tipo) {
  discoAtual = tipo;
  discos.forEach(btn => btn.classList.remove('selected'));
  document.querySelector(`.disco-btn[data-tipo="${tipo}"]`).classList.add('selected');
  labInterativo.style.display = 'block';
  diametroSpan.textContent = discosData[tipo].d;
  lambdaSlider.value = discosData[tipo].lambda;
  lambdaValor.textContent = discosData[tipo].lambda;
  frequenciaValor.textContent = '-';
  explicacao.style.display = 'none';
}

lambdaSlider.oninput = function() {
  lambdaValor.textContent = this.value;
};

calcularBtn.onclick = function() {
  const c = 3e8;
  const d_nm = discosData[discoAtual].d;
  const lambda_nm = Number(lambdaSlider.value);
  const lambda_m = lambda_nm * 1e-9;
  const f = c / lambda_m;
  frequenciaValor.textContent = f.toExponential(2);

  // Raciocínio guiado e resposta
  let explic = `Como d = ${d_nm} nm e d = 1,2λ, então:<br>
  ⇒ λ = ${d_nm}/1,2 = ${(d_nm/1.2).toFixed(0)} nm<br>
  ⇒ f = 3,0×10⁸ / ${(d_nm/1.2*1e-9).toExponential(1)} = ${(c/(d_nm/1.2*1e-9)).toExponential(2)} Hz<br>`;
  if (discoAtual === "Blu-ray") {
    explic += `<br><strong>Alternativa correta: d)</strong>`;
  }
  explicacao.innerHTML = explic;
  explicacao.style.display = "block";
};
