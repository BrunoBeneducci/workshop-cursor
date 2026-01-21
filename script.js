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

async function buscarFraseAPI() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Erro na API');
  return await response.json();
}

function buscarFraseMockada() {
  return frasesMockadas[Math.floor(Math.random() * frasesMockadas.length)];
}

async function buscarFrase() {
  const fraseElemento = document.querySelector('h1');
  const autorElemento = document.querySelector('.autor');
  
  // 50% chance de usar API, 50% chance de usar mockada
  const usarAPI = Math.random() > 0.5;
  
  try {
    let frase;
    
    if (usarAPI) {
      frase = await buscarFraseAPI();
    } else {
      frase = buscarFraseMockada();
    }
    
    fraseElemento.textContent = `"${frase.content}"`;
    autorElemento.textContent = `— ${frase.author}`;
    
  } catch (error) {
    console.warn('Usando frase mockada:', error.message);
    const frase = buscarFraseMockada();
    fraseElemento.textContent = `"${frase.content}"`;
    autorElemento.textContent = `— ${frase.author}`;
  }
}

// Botão para nova frase
function novafrase() {
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

document.addEventListener('DOMContentLoaded', buscarFrase);
