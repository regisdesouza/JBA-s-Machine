// função para converter os valores
function converter() {
  var inputValue = document.getElementById("inputValue").value; // obtém o valor de entrada
  var inputBase = document.getElementById("inputBase").value; // obtém a base de entrada

  // valida a entrada de acordo com a base selecionada
  if (!validarEntrada(inputValue, inputBase)) {
    alert("Por favor, insira um número válido para a base selecionada.");
    return;
  }

  // converte o valor para decimal, com base na base de entrada selecionada
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
  var outputHTML = ""; // inicializa a variável para armazenar o html de saída

  // verifica se cada opção de conversão está selecionada e adiciona o resultado ao html de saída
  if (document.getElementById("convertDecimal").checked) {
    output.style.display = "block"; // exibe a saída
    outputHTML += `<p>Decimal: ${decimalValue}</p>`; // adiciona o resultado ao html
  }
  if (document.getElementById("convertHexadecimal").checked) {
    output.style.display = "block"; // exibe a saída
    outputHTML += `<p>Hexadecimal: ${decimalValue
      .toString(16)
      .toUpperCase()}</p>`; // converte para hexadecimal e adiciona ao html
  }
  if (document.getElementById("convertOctal").checked) {
    output.style.display = "block"; // exibe a saída
    outputHTML += `<p>Octal: ${decimalValue.toString(8)}</p>`; // converte para octal e adiciona ao html
  }
  if (document.getElementById("convertBinario").checked) {
    output.style.display = "block"; // exibe a saída
    outputHTML += `<p>Binário: ${decimalValue.toString(2)}</p>`; // converte
  }
  document.getElementById("output").innerHTML = outputHTML; // atualiza o conteúdo da saída com o html gerado
}

// Função para validar a entrada de acordo com a base selecionada
function validarEntrada(inputValue, inputBase) {
  var validChars = ""; // String para armazenar os caracteres válidos

  // Determina os caracteres válidos com base na base selecionada
  if (inputBase === "decimal") {
    validChars = "0123456789"; // Para base decimal, são válidos os dígitos de 0 a 9
  } else if (inputBase === "hexadecimal") {
    validChars = "0123456789ABCDEFabcdef"; // Para base hexadecimal, são válidos os dígitos de 0 a 9 e as letras de A a F
  } else if (inputBase === "octal") {
    validChars = "01234567"; // Para base octal, são válidos os dígitos de 0 a 7
  } else if (inputBase === "binario") {
    validChars = "01"; // Para base binária, são válidos os dígitos 0 e 1
  }

  // Verifica se cada caractere da entrada está presente na lista de caracteres válidos
  for (var i = 0; i < inputValue.length; i++) {
    if (validChars.indexOf(inputValue[i]) === -1) {
      // Se o caractere não for encontrado na lista de caracteres válidos
      return false; // Retorna falso indicando que a entrada é inválida
    }
  }
  return true; // Retorna verdadeiro indicando que a entrada é válida
}



function calcular(){
    function somarBinario(baseUm, baseDois) {
      var array1 = baseUm.split('').reverse();
      var array2 = baseDois.split('').reverse();
      var arrayMaior = array1.length > array2.length ? array1.length : array2.length;

      var resultado = '';
      var vaiUm = 0;

      for (var i = 0; i < arrayMaior; i++) {
        var valor1 = i < array1.length ? parseInt(array1[i]) : 0;
        var valor2 = i < array2.length ? parseInt(array2[i]) : 0;

        var total = valor1 + valor2 + vaiUm;
        resultado = (total % 2) + resultado;
        vaiUm = total >= 2 ? 1 : 0;
      }

      if (vaiUm > 0) {
        resultado = '1' + resultado;
      }

      return resultado === "" ? '0' : resultado;
    }

    function selecionar() {
      var inputValue = document.getElementById("inputNumeroUm").value;
      var inputValue2 = document.getElementById("inputNumeroDois").value;
      var inputBase = document.getElementById("baseUm").value;
      var inputBase2 = document.getElementById("baseDois").value;
      var operacao = document.getElementById("operacao").value;
      var divMsg = document.getElementById("divMsg");

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

      var num1 = parseInt(inputValue, converterBase(inputBase));
      var num2 = parseInt(inputValue2, converterBase(inputBase2));

      if (isNaN(num1) || isNaN(num2)) {
        divMsg.innerHTML = "<span style='color: red;'>Erro na conversão dos números. Verifique as entradas.</span>";
        return;
      }

      var resultadoDecimal;
      if (operacao === "adicionar") {
        resultadoDecimal = num1 + num2;
      } else if (operacao === "subtrair") {
        resultadoDecimal = num1 - num2;
      } else {
        divMsg.innerHTML = "<span style='color: red;'>Operação inválida.</span>";
        return;
      }

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
}
}