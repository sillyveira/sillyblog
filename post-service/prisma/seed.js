const prisma = require("../src/prisma/client");



const postsData = [
  {
    title: "Bem-vindo ao SillyBlog!",
    content: `# Bem-vindo ao SillyBlog! 🎉

Este é o nosso primeiro post no **SillyBlog**, um mural de ideias bobas e criativas!

## O que você vai encontrar aqui:

- 💭 Pensamentos aleatórios
- 🤔 Reflexões filosóficas bobas
- 😄 Humor e diversão
- 📝 Experiências do dia a dia

### Como funciona?

Simplesmente compartilhe suas ideias mais malucas e vamos construir uma comunidade divertida juntos!

> "A criatividade nasce da liberdade de ser bobo" - Autor Desconhecido

**Vamos começar essa jornada!** 🚀`,
    authorId: 1,
    authorName: "Admin",
    authorEmail: "admin@sillyblog.com"
  },
  {
    title: "Por que cachorros são melhores que gatos? 🐕",
    content: `# A eterna discussão: Cachorros vs Gatos

## Argumentos científicos (meio bobos) a favor dos cachorros:

### 1. Lealdade extrema
Os cachorros são como aquele amigo que **sempre** responde suas mensagens, mesmo às 3h da manhã.

### 2. Entusiasmo contagiante
Eles ficam felizes quando você volta do banheiro! Imagina quando você volta de uma viagem de uma semana! 🎉

### 3. Proteção natural
Um cachorro late para estranhos. Um gato? Provavelmente vai mostrar onde você esconde as joias.

## Código de conduta canino:
\`\`\`javascript
function comportamentoCachorro(situacao) {
  if (situacao === "dono chegou") {
    return "🎉 FESTA MÁXIMA! 🎉";
  } else if (situacao === "estranho na porta") {
    return "🚨 ALERTA VERMELHO! 🚨";
  } else {
    return "😴 Dormindo ou comendo";
  }
}
\`\`\`

**Disclaimer:** Gatos também são fofos, mas esta é minha opinião boba do dia! 😸`,
    authorId: 2,
    authorName: "João Silva",
    authorEmail: "joao@email.com"
  },
  {
    title: "Tutorial: Como fingir que entende de tecnologia",
    content: `# Tutorial: Como fingir que entende de tecnologia 💻

## Vocabulário essencial para impressionar:

### Palavras mágicas:
- **"É questão de escabilidade"** - Use quando não souber responder algo
- **"Vamos dockerizar isso"** - Para qualquer problema
- **"Microserviços"** - A resposta para tudo
- **"Machine Learning"** - Quando quiser soar futurista

## Frases de emergência:

> "Hmm, interessante... mas você considerou a arquitetura serverless?"

> "Isso me lembra dos princípios SOLID..."

> "Talvez devêssemos implementar um CI/CD pipeline aqui"

## O método científico:

1. **Copie e cole do Stack Overflow** 📋
2. **Funciona?** ✅
   - Sim: Você é um gênio!
   - Não: Vá para o passo 1

### Dica bônus:
Sempre termine reuniões com: *"Vou dar uma olhada na documentação e te dou um retorno"*

\`\`\`bash
# Comando para resolver 90% dos problemas
sudo rm -rf node_modules && npm install
\`\`\`

**Lembre-se:** A confiança é 50% do trabalho! 😎`,
    authorId: 3,
    authorName: "Maria Tech",
    authorEmail: "maria@techie.com"
  },
  {
    title: "Receita: Miojo Gourmet 🍜",
    content: `# Miojo Gourmet: Elevando o Instantâneo

## Ingredientes:
- 1 pacote de miojo (sabor de sua escolha)
- 1 ovo
- Cebolinha (se você for chique)
- Amor próprio (opcional)

## Modo de preparo:

### Passo 1: A base
Ferva a água como se fosse o momento mais importante da sua vida.

### Passo 2: O tempero
Adicione o tempero e **mexa com carinho**. O miojo sente quando você não está dedicado.

### Passo 3: O ovo
Quebre o ovo por cima. Se a gema ficar inteira, você ganhou na vida!

### Passo 4: A finalização
\`\`\`
if (temCebolinha) {
  polvilhe.generosamente();
} else {
  chore.internamente();
}
\`\`\`

## Dicas de chef:

- **Timing é tudo:** 3 minutos exatos, nem mais, nem menos
- **Apresentação:** Coma direto da panela para autenticidade
- **Acompanhamento:** Netflix e pijama

### Variações gourmet:
- **Miojo à Parmegiana:** Adicione queijo ralado
- **Miojo Oriental:** Pingue molho shoyu
- **Miojo do Desespero:** É só o miojo mesmo

**Bon appétit!** 👨‍🍳`,
    authorId: 1,
    authorName: "Admin",
    authorEmail: "admin@sillyblog.com"
  },
  {
    title: "Filosofia: E se as plantas fossem aliens?",
    content: `# E se as plantas fossem aliens? 🌱👽

## A conspiração verde

Pensem comigo: as plantas são seres que:

### Características suspeitas:
- ☀️ **Captam energia solar** (tecnologia alienígena?)
- 🌍 **Dominam o planeta** há milhões de anos
- 🤐 **Nunca falam** (ou não entendemos a linguagem delas?)
- 💨 **Produzem oxigênio** (nos mantêm vivos... por quê?)

## Evidências "científicas":

### 1. Comunicação secreta
Estudos mostram que árvores se comunicam através de redes subterrâneas. **COINCIDÊNCIA?** 🤔

### 2. Movimento estratégico
Girassóis seguem o sol. Se isso não é espionagem, eu não sei o que é!

### 3. Resistência sobrenatural
Conseguem viver só de água, terra e luz. Definitivamente não são deste mundo.

## Código alien decodificado:
\`\`\`python
def plano_dominio_mundial():
    while humanos_ainda_nao_descobriram:
        produzir_oxigenio()
        crescer_silenciosamente()
        observar_comportamento_humano()
        
    if descobriram_o_plano:
        iniciar_ataque_do_polen()
\`\`\`

### Teoria final:
As plantas nos mantêm vivos porque **somos pets delas**! 

Elas nos fornecem oxigênio, comida e beleza, e nós cuidamos delas, regamos e as protegemos.

**Quem domesticou quem?** 🌿

*Disclaimer: Esta teoria foi desenvolvida às 2h da manhã comendo miojo.*`,
    authorId: 2,
    authorName: "João Silva",
    authorEmail: "joao@email.com"
  },
  {
  "title": "Ideia de negócio: guarda-chuva para pets ☔🐶",
  "content": "# E se fizermos guarda-chuvas para pets?\n\nImagina seu cachorro todo estiloso na chuva?\n\n- Design à prova de vento\n- Estilo fashion week 🐾\n- Tamanho P, M, G (e GG pros grandões)\n\n**Já temos nome:** *PetChuva™*",
  "authorId": 2,
  "authorName": "Luna Moraes",
  "authorEmail": "luna@sillyblog.com"
},
{
  "title": "Teoria: bananas têm consciência?",
  "content": "# Será que bananas pensam? 🍌🧠\n\nE se… as bananas soubessem que estão sendo comidas?\n\n- Sempre sorrindo nos desenhos\n- Ficam pretas de tristeza?\n\n🤯 Discussões profundas para o café da manhã.",
  "authorId": 3,
  "authorName": "Carlos T.",
  "authorEmail": "carlos@sillyblog.com"
},
{
  "title": "O drama do cadarço que desamarra sozinho 🎭",
  "content": "# Cadarços rebeldes 👟\n\nTodo mundo tem aquele tênis que odeia obedecer.\n\n- Dou dois nós: desamarra.\n- Faço um laço especial: escapa na esquina.\n\nConclusão: eles têm vida própria.",
  "authorId": 4,
  "authorName": "Nina B.",
  "authorEmail": "nina@sillyblog.com"
},
{
  "title": "Inventei uma nova palavra: esquiselante",
  "content": "# Nova palavra: *esquiselante* 🤓📘\n\nDefinição: algo tão estranho que chega a ser elegante.\n\n> “Aquele chapéu com penas roxas é esquiselante.”\n\nUse com moderação.",
  "authorId": 5,
  "authorName": "Zeca do Vocabulário",
  "authorEmail": "zeca@sillyblog.com"
},
{
  "title": "Reflexão de banheiro: o papel vem por cima ou por baixo?",
  "content": "# O dilema do papel higiênico 🧻\n\nVocê coloca o rolo:\n\n- Por cima? ✅\n- Por baixo? ❌\n\nEsse detalhe define *caráter* (segundo estudos que eu acabei de inventar).",
  "authorId": 6,
  "authorName": "Bia R.",
  "authorEmail": "bia@sillyblog.com"
},
{
  "title": "Desabafo: meu micro-ondas me julga",
  "content": "# O apito do julgamento 🔔\n\nVocê esquece a comida no micro-ondas e ele:\n\n- BIP BIP BIP, tipo: \"alô, preguiçoso!\"\n\nSério, podia ser mais gentil.",
  "authorId": 7,
  "authorName": "João V.",
  "authorEmail": "joao@sillyblog.com"
}, 
{
  "title": "Relógio que gira ao contrário ⏰",
  "content": "# Relógio reverso: moda ou confusão? 🌀\n\nSe o tempo é uma ilusão... por que não girar o relógio ao contrário?\n\n- Atrasado? Ou adiantado?\n- Confusão garantida!\n\n**Nova tendência?** Talvez. Confuso? Com certeza.",
  "authorId": 8,
  "authorName": "Leo M.",
  "authorEmail": "leo@sillyblog.com"
},
{
  "title": "Sonhei que era um pastel voador",
  "content": "# Meu sonho: pastel voador 🌮🕊️\n\nVoava pelos céus recheado de vento (não de queijo).\n\n- Fugia de humanos famintos\n- Gritava: “Não frita eu!”\n\nAcordei com fome.",
  "authorId": 9,
  "authorName": "Camila S.",
  "authorEmail": "camila@sillyblog.com"
},
{
  "title": "Por que geladeira tem luz e o freezer não? 🤔",
  "content": "# Luz na geladeira, escuridão no freezer ❄️💡\n\nQuem decidiu isso?\n\n- Sorvete também merece iluminação!\n- Conspiração do gelo?\n\nEstamos no escuro com essa questão.",
  "authorId": 10,
  "authorName": "Igor F.",
  "authorEmail": "igor@sillyblog.com"
},
{
  "title": "Abacaxis têm armadura 🛡️🍍",
  "content": "# Frutas medievais: o abacaxi 🏰\n\nTodo espinhoso, casca grossa e difícil de abrir.\n\n- Guerreiro da frutaria\n- Defesa: 10/10\n\nSir Abacaxi, protetor da geladeira.",
  "authorId": 5,
  "authorName": "Zeca do Vocabulário",
  "authorEmail": "zeca@sillyblog.com"
},
{
  "title": "Invento: despertador que te elogia 😍⏰",
  "content": "# Acorde com autoestima 📢✨\n\nNovo conceito: o **DesperTop™**\n\n- “Você é incrível!”\n- “Acordou? Que orgulho!”\n- “Hoje você vai arrasar!”\n\nMelhor que café.",
  "authorId": 4,
  "authorName": "Nina B.",
  "authorEmail": "nina@sillyblog.com"
},
{
  "title": "Tênis que brilham no escuro 👟🌌",
  "content": "# Moda ou lanterna de pé?\n\nTênis que brilham quando apaga a luz:\n\n- Ideal pra dançar no escuro\n- Prático pra achar o pé perdido\n\nTem estilo. Tem utilidade. Tem brilho!",
  "authorId": 6,
  "authorName": "Bia R.",
  "authorEmail": "bia@sillyblog.com"
},
{
  "title": "O drama da meia solitária 🧦",
  "content": "# Onde vão parar as meias perdidas?\n\nTodo mundo tem uma gaveta com:\n\n- Meias sem par\n- Cores que não combinam\n\nTeoria: elas vão viver livres na natureza.",
  "authorId": 2,
  "authorName": "Luna Moraes",
  "authorEmail": "luna@sillyblog.com"
},
{
  "title": "E se o Wi-Fi tivesse sabor? 📶🍦",
  "content": "# Wi-Fi de morango ou chocolate?\n\nImagina:\n\n- Conexão 5G com gosto de baunilha\n- Sinal fraco = gosto de repolho\n\nInternet mais doce… ou mais estranha?",
  "authorId": 7,
  "authorName": "João V.",
  "authorEmail": "joao@sillyblog.com"
},
{
  "title": "Toalha mágica que seca sozinha 🪄🧼",
  "content": "# Revolução no banheiro!\n\nToalha que seca e depois… se seca sozinha!\n\n- Nunca mais toalha molhada no varal\n- Tecnologia invisível (porque é mágica)\n\nInvestidores, me liguem.",
  "authorId": 3,
  "authorName": "Carlos T.",
  "authorEmail": "carlos@sillyblog.com"
},
{
  "title": "Música tema pra escovar os dentes 🎶🪥",
  "content": "# Trilha sonora da higiene!\n\nToda vez que escova começa:\n\n- 🎵 “Escove bem, escove bem…”\n- Dura 2 minutos certinhos\n\nHábito saudável com estilo sonoro.",
  "authorId": 8,
  "authorName": "Leo M.",
  "authorEmail": "leo@sillyblog.com"
}];

async function main() {
  console.log('🌱 Creating posts...');

  for (const post of postsData) {
    await prisma.post.create({
      data: post,
    });
  }

  console.log(`📝 ${postsData.length} posts created successfully!`);
}

main()
  .catch((e) => {
    console.error('❌ Error creating posts:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });