// Frases motivacionais via API Quotable
const API_URL = 'https://api.quotable.io/random?tags=inspirational,motivational';

// Frases mockadas engraçadas/motivacionais
const frasesMockadas = [
  // Frases de Dev
  { content: "Café primeiro, código depois.", author: "Dev Anônimo" },
  { content: "Não é bug, é feature não documentada.", author: "Todo Programador" },
  { content: "Debugar é como ser um detetive num filme onde você também é o assassino.", author: "Filipe Deschamps" },
  { content: "Funciona na minha máquina!", author: "Dev em Code Review" },
  { content: "Se está difícil, você está aprendendo.", author: "Sabedoria Dev" },
  { content: "99 bugs no código, tira 1, ficam 127.", author: "Lei de Murphy" },
  { content: "Keep calm and clear cache.", author: "Frontend Dev" },
  { content: "Um commit por dia mantém o tech lead longe de você.", author: "Provérbio Git" },
  { content: "Ctrl+Z: o melhor amigo do programador.", author: "Teclado Sábio" },
  { content: "O código de ontem sempre parece pior hoje.", author: "Reflexão Matinal" },
  { content: "Seu único limite é você mesmo. E a memória RAM.", author: "PC Gamer" },
  { content: "Respira fundo. O deadline é só um número.", author: "PM Otimista" },
  { content: "Errar é humano. Dar blame no estagiário é corporativo.", author: "Senior Dev" },
  { content: "Hoje eu escolho não quebrar a produção.", author: "DevOps Zen" },
  { content: "Programar é 10% escrever código e 90% descobrir por que não funciona.", author: "Stack Overflow" },
  { content: "Menos reunião, mais código.", author: "Todo Dev" },
  { content: "Eu não procrastino, eu dou tempo pro código amadurecer.", author: "Dev Filosófico" },
  { content: "Documentação? Você quer dizer comentários no código?", author: "Dev Realista" },
  { content: "Não precisa de teste se ninguém usa o sistema.", author: "QA às 18h de sexta" },
  { content: "O código funciona, não mexe.", author: "Lei Universal" },
  { content: "Hoje é um ótimo dia para refatorar... amanhã.", author: "Dev Procrastinador" },
  { content: "Erro 404: Motivação não encontrada. Mas vamos lá!", author: "Segunda-feira" },
  { content: "A vida é curta demais para código feio.", author: "Clean Coder" },
  { content: "Se funciona, não é gambiarra, é solução criativa.", author: "Dev Brasileiro" },
  
  // Frases sobre a Vida
  { content: "A vida é curta. Sorria enquanto ainda tem dentes.", author: "Dentista Motivacional" },
  { content: "Acordei cedo hoje. Não recomendo.", author: "Pessoa Honesta" },
  { content: "Dinheiro não traz felicidade. Mas é melhor chorar num Porsche.", author: "Realista Assumido" },
  { content: "Adultar é basicamente falar 'que semana' toda semana.", author: "Adulto Cansado" },
  { content: "Meu plano de vida? Sobreviver até sexta-feira.", author: "Trabalhador CLT" },
  { content: "Fiz uma lista de coisas pra fazer hoje. Perdi a lista. Dia produtivo.", author: "Procrastinador Profissional" },
  { content: "Tô na fase da vida que meu entusiasmo depende do wifi.", author: "Geração Z" },
  { content: "A grama do vizinho é mais verde porque você não paga a conta de água dele.", author: "Economista Filosófico" },
  { content: "Sonhe grande. Durma mais.", author: "Dorminhoco Motivado" },
  { content: "Seja você mesmo, a não ser que você possa ser Batman.", author: "Conselho Real" },
  { content: "Todo dia é uma nova chance de ficar em casa.", author: "Introvertido Feliz" },
  { content: "A paciência é uma virtude. Que eu não tenho.", author: "Pessoa Impaciente" },
  { content: "Não sou preguiçoso, só economizo energia.", author: "Ecologista Deitado" },
  { content: "Minha dieta vai começar segunda. Toda semana.", author: "Amante de Pizza" },
  { content: "Quem disse que dinheiro não compra felicidade, nunca comprou pizza.", author: "Filósofo Faminto" },
  { content: "Se a vida te der limões, peça sal e tequila.", author: "Otimista de Bar" },
  { content: "Eu ia fazer academia, mas a Netflix não ia se assistir sozinha.", author: "Atleta de Sofá" },
  { content: "Acordo inspirado, depois passa.", author: "Realista Matinal" },
  { content: "O importante é não desistir. A não ser que seja uma série ruim.", author: "Crítico de Streaming" },
  { content: "Viva cada dia como se fosse o último. Mas pague as contas, vai que não é.", author: "Adulto Responsável" },
  { content: "Tô ocupado demais fingindo que tô ocupado.", author: "Funcionário Exemplar" },
  { content: "O sucesso é 1% inspiração e 99% café.", author: "Viciado em Cafeína" },
  { content: "Não existe mau tempo, existe roupa inadequada. E preguiça.", author: "Meteorologista Honesto" },
  { content: "Queria ser bilionário, mas aceito um final de semana de 3 dias.", author: "Sonhador Realista" },
  { content: "A vida adulta é pagar pra ter água quente e ainda assim tomar banho gelado no verão.", author: "Paradoxo Humano" }
];

// Frase atual
let fraseAtual = { content: '', author: '' };

// Verifica se há frase na URL
function verificarURL() {
  const params = new URLSearchParams(window.location.search);
  const frase = params.get('q');
  const autor = params.get('a');
  
  if (frase && autor) {
    return {
      content: decodeURIComponent(frase),
      author: decodeURIComponent(autor)
    };
  }
  return null;
}

// Gera URL compartilhável
function gerarURLCompartilhavel() {
  const baseURL = window.location.origin + window.location.pathname;
  const params = new URLSearchParams();
  params.set('q', encodeURIComponent(fraseAtual.content));
  params.set('a', encodeURIComponent(fraseAtual.author));
  return `${baseURL}?${params.toString()}`;
}

// Gera URL da OG Image usando serviço externo
function gerarOGImageURL() {
  const texto = `"${fraseAtual.content}" — ${fraseAtual.author}`;
  // Usando og.tailgraph.com para gerar OG image dinâmica
  return `https://og.tailgraph.com/og?fontFamily=Outfit&title=${encodeURIComponent(texto)}&titleTailwind=text-white%20text-4xl%20text-center%20px-8&bgTailwind=bg-gradient-to-br%20from-slate-900%20via-slate-800%20to-indigo-900&width=1200&height=630`;
}

// Atualiza meta tags OG
function atualizarOGTags() {
  const url = gerarURLCompartilhavel();
  const ogImageURL = gerarOGImageURL();
  
  document.getElementById('og-title').content = `"${fraseAtual.content}"`;
  document.getElementById('og-description').content = `— ${fraseAtual.author}`;
  document.getElementById('og-image').content = ogImageURL;
  document.getElementById('og-url').content = url;
  document.title = `${fraseAtual.content.substring(0, 50)}... | Pensamento do Dia`;
}

// Exibe a frase na tela
function exibirFrase(frase) {
  const fraseElemento = document.querySelector('h1');
  const autorElemento = document.querySelector('.autor');
  
  fraseAtual = frase;
  fraseElemento.textContent = `"${frase.content}"`;
  autorElemento.textContent = `— ${frase.author}`;
  
  atualizarOGTags();
}

async function buscarFraseAPI() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Erro na API');
  return await response.json();
}

function buscarFraseMockada() {
  return frasesMockadas[Math.floor(Math.random() * frasesMockadas.length)];
}

async function buscarFrase() {
  // 50% chance de usar API, 50% chance de usar mockada
  const usarAPI = Math.random() > 0.5;
  
  try {
    let frase;
    
    if (usarAPI) {
      frase = await buscarFraseAPI();
    } else {
      frase = buscarFraseMockada();
    }
    
    exibirFrase(frase);
    
  } catch (error) {
    console.warn('Usando frase mockada:', error.message);
    const frase = buscarFraseMockada();
    exibirFrase(frase);
  }
}

// Botão para nova frase
function novafrase() {
  // Limpa a URL quando pedir nova frase
  window.history.replaceState({}, '', window.location.pathname);
  
  const fraseElemento = document.querySelector('h1');
  const autorElemento = document.querySelector('.autor');
  
  fraseElemento.style.animation = 'none';
  autorElemento.style.animation = 'none';
  
  // Trigger reflow
  fraseElemento.offsetHeight;
  autorElemento.offsetHeight;
  
  fraseElemento.style.animation = 'fadeIn 0.5s ease-out';
  autorElemento.style.animation = 'fadeIn 0.5s ease-out 0.2s both';
  
  buscarFrase();
}

// Função para compartilhar
async function compartilhar() {
  const card = document.getElementById('card-frase');
  const modal = document.getElementById('modal-compartilhar');
  const preview = document.getElementById('preview-imagem');
  const urlInput = document.getElementById('url-input');
  const fraseElemento = document.querySelector('h1');
  const autorElemento = document.querySelector('.autor');
  
  // Gera e exibe a URL compartilhável
  const url = gerarURLCompartilhavel();
  urlInput.value = url;
  
  // Mostra loading
  preview.innerHTML = '<p style="color: #94a3b8;">Gerando preview...</p>';
  modal.classList.add('ativo');
  
  // Força opacidade total antes de capturar
  fraseElemento.style.opacity = '1';
  autorElemento.style.opacity = '1';
  fraseElemento.style.animation = 'none';
  autorElemento.style.animation = 'none';
  
  try {
    // Gera a imagem do card com fundo
    const canvas = await html2canvas(card, {
      backgroundColor: '#16213e',
      scale: 2,
      logging: false,
      useCORS: true
    });
    
    const imagemGerada = canvas.toDataURL('image/png');
    preview.innerHTML = `<img src="${imagemGerada}" alt="Preview da frase">`;
    
  } catch (error) {
    console.error('Erro ao gerar preview:', error);
    // Usa a OG image como fallback
    const ogImage = gerarOGImageURL();
    preview.innerHTML = `<img src="${ogImage}" alt="Preview da frase" style="max-height: 200px;">`;
  }
}

// Copiar URL
function copiarURL() {
  const urlInput = document.getElementById('url-input');
  const botao = urlInput.nextElementSibling;
  
  navigator.clipboard.writeText(urlInput.value).then(() => {
    botao.textContent = 'Copiado!';
    botao.classList.add('copiado');
    
    setTimeout(() => {
      botao.textContent = 'Copiar Link';
      botao.classList.remove('copiado');
    }, 2000);
  }).catch(() => {
    // Fallback
    urlInput.select();
    document.execCommand('copy');
    botao.textContent = 'Copiado!';
    botao.classList.add('copiado');
    
    setTimeout(() => {
      botao.textContent = 'Copiar Link';
      botao.classList.remove('copiado');
    }, 2000);
  });
}

// Fechar modal
function fecharModal() {
  const modal = document.getElementById('modal-compartilhar');
  modal.classList.remove('ativo');
}

// Fechar modal clicando fora
document.addEventListener('click', (e) => {
  const modal = document.getElementById('modal-compartilhar');
  if (e.target === modal) {
    fecharModal();
  }
});

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  // Verifica se há frase na URL
  const fraseURL = verificarURL();
  
  if (fraseURL) {
    // Exibe a frase da URL
    exibirFrase(fraseURL);
  } else {
    // Busca uma frase aleatória
    buscarFrase();
  }
});
