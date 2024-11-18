// Seleção de elementos
const display = document.getElementById("display");
const botoes = document.querySelectorAll(".btn");

let expressao = ""; // Variável para armazenar a expressão
let erro = false; // Flag para verificar se houve erro

// Atualiza o display
function atualizarDisplay() {
  display.textContent = erro || expressao === "" ? "0" : expressao;
}

// Função para verificar se há operação inválida, como divisão por zero
function verificarErroExpressao(expr) {
  try {
    // Verificar divisão por zero antes de avaliar a expressão
    if (expr.includes("/0")) {
      return "Erro: Divisão por zero";
    }

    // Avaliar a expressão
    return eval(expr);
  } catch (error) {
    return "Erro"; // Retorna erro em caso de cálculo inválido
  }
}

// Eventos dos botões
botoes.forEach(botao => {
  botao.addEventListener("click", () => {
    const valor = botao.getAttribute("data-valor");

    if (erro && valor) {
      // Se houver erro e o usuário clicar em um botão, limpa o erro
      expressao = "";
      erro = false;
    }

    if (valor) {
      // Adiciona números ou operadores à expressão
      expressao += valor;
    } else if (botao.id === "limpar") {
      // Limpa a expressão
      expressao = "";
      erro = false;
    } else if (botao.id === "apagar") {
      // Apaga o último caractere
      expressao = expressao.slice(0, -1);
    } else if (botao.id === "igual") {
      // Calcula o resultado
      const resultado = verificarErroExpressao(expressao);
      
      // Se for um erro, exibe "Erro", caso contrário, exibe o resultado
      if (typeof resultado === "string" && resultado.startsWith("Erro")) {
        erro = true;
        expressao = resultado;
      } else {
        expressao = resultado.toString();
      }
    }

    atualizarDisplay(); // Atualiza o display após cada ação
  });
});
