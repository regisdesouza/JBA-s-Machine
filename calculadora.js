// função para converter os valores
function converter() {
  var inputValue = document.getElementById("inputValue").value;
  var inputBase = document.getElementById("inputBase").value;

  // valida a entrada de acordo com a base selecionada
  if (!validarEntrada(inputValue, inputBase)) {
    alert("Por favor, insira um número válido para a base selecionada.");
    return;
  }

  // converte o valor para decimal
  var decimalValue = parseInt(
    inputValue,
    inputBase === "hexadecimal"
      ? 16
      : inputBase === "octal"
      ? 8
      : inputBase === "binario"
      ? 2
      : 10
  );
  
  var outputHTML = "";

  // verifica cada opção de conversão
  if (document.getElementById("convertDecimal").checked) {
    outputHTML += `<p>Decimal: ${decimalValue}</p>`;
  }
  if (document.getElementById("convertHexadecimal").checked) {
    outputHTML += `<p>Hexadecimal: ${decimalValue.toString(16).toUpperCase()}</p>`;
  }
  if (document.getElementById("convertOctal").checked) {
    outputHTML += `<p>Octal: ${decimalValue.toString(8)}</p>`;
  }
  if (document.getElementById("convertBinario").checked) {
    outputHTML += `<p>Binário: ${decimalValue.toString(2)}</p>`;
  }

  var output = document.getElementById("output");
  output.innerHTML = outputHTML;
  output.style.display = outputHTML ? "block" : "none";
}

// Função para validar a entrada
function validarEntrada(inputValue, inputBase) {
  var validChars = "";

  if (inputBase === "decimal") {
    validChars = "0123456789";
  } else if (inputBase === "hexadecimal") {
    validChars = "0123456789ABCDEFabcdef";
  } else if (inputBase === "octal") {
    validChars = "01234567";
  } else if (inputBase === "binario") {
    validChars = "01";
  }

  for (var i = 0; i < inputValue.length; i++) {
    if (validChars.indexOf(inputValue[i]) === -1) {
      return false;
    }
  }
  return true;
}

// Função auxiliar para converter base para radix
function converterBase(base) {
  switch (base) {
    case "decimal":
      return 10;
    case "hexadecimal":
      return 16;
    case "octal":
      return 8;
    case "binario":
      return 2;
    default:
      return 10;
  }
}

// Função principal de cálculo CORRIGIDA
function calcular() {
  var inputValue = document.getElementById("inputNumeroUm").value;
  var inputValue2 = document.getElementById("inputNumeroDois").value;
  var inputBase = document.getElementById("baseUm").value;
  var inputBase2 = document.getElementById("baseDois").value;
  var operacao = document.getElementById("operacao").value;
  var divMsg = document.getElementById("divMsg");

  // Validações
  if (inputBase === "selecione" || inputBase2 === "selecione" || operacao === "selecione") {
    divMsg.innerHTML = "<span style='color: red;'>Por favor, selecione todas as opções.</span>";
    return;
  }

  if (!validarEntrada(inputValue, inputBase)) {
    divMsg.innerHTML = "<span style='color: red;'>Por favor, insira um número válido para a base do primeiro número.</span>";
    return;
  }
  if (!validarEntrada(inputValue2, inputBase2)) {
    divMsg.innerHTML = "<span style='color: red;'>Por favor, insira um número válido para a base do segundo número.</span>";
    return;
  }

  // Converter para decimal
  var num1 = parseInt(inputValue, converterBase(inputBase));
  var num2 = parseInt(inputValue2, converterBase(inputBase2));

  if (isNaN(num1) || isNaN(num2)) {
    divMsg.innerHTML = "<span style='color: red;'>Erro na conversão dos números. Verifique as entradas.</span>";
    return;
  }

  // Realizar operação
  var resultadoDecimal;
  if (operacao === "adicionar") {
    resultadoDecimal = num1 + num2;
  } else if (operacao === "subtrair") {
    resultadoDecimal = num1 - num2;
  } else {
    divMsg.innerHTML = "<span style='color: red;'>Operação inválida.</span>";
    return;
  }

  // Converter resultado para a base do primeiro número
  var resultadoStr;
  switch (inputBase) {
    case "decimal":
      resultadoStr = resultadoDecimal.toString(10);
      break;
    case "hexadecimal":
      resultadoStr = resultadoDecimal.toString(16).toUpperCase();
      break;
    case "octal":
      resultadoStr = resultadoDecimal.toString(8);
      break;
    case "binario":
      resultadoStr = resultadoDecimal.toString(2);
      break;
    default:
      resultadoStr = resultadoDecimal.toString();
  }

  // EXIBIR O RESULTADO - ESSA ERA A PARTE QUE FALTAVA
  var outputCalculadora = document.getElementById("outputCalculadora");
  outputCalculadora.innerHTML = `<p><strong>Resultado:</strong> ${resultadoStr}</p>`;
  outputCalculadora.style.display = "block";
  
  // Limpar mensagens de erro
  divMsg.innerHTML = "";
}