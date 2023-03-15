var inpSemProblemas = document.getElementById('inputSP')   // Mensagem apenas de aviso para melhorar taxa de conversão
var inpPoucosProblemas = document.getElementById('inputPP') // Mensagem dizendo que o cliente está começando a perder clientes
var inpAlgunsProblemas = document.getElementById('inputAP') // Perdendo 1/3 dos clientes
var inpMuitosProblemas = document.getElementById('inputMP') // Perdendo de 1/2 dos clientes

function escolha() {

    if ((inpSemProblemas.checked) || (inpPoucosProblemas.checked) || (inpAlgunsProblemas.checked) || (inpMuitosProblemas.checked)) {

        resultado.innerHTML =
            `<div class="form-control">
        <label for="name">Entradas totais</label>
        <input type="number" id="inputEntradasTotais" placeholder="Digite qualquer numero">
    </div>
    <div class="form-control">
        <label for="name">Vendas Mensais</label>
        <input type="number" id="inputEntradasCaixa" placeholder="Digite qualquer outro valor">
    </div>

    <div class="form-control">
        <label for="name">Valor mensal</label>
        <input type="number" id="inputVendas" placeholder="Digite qualquer outro valor">
    </div>
    <div class="form-pass">
        <input type="submit" onclick="calcular()" value="calcular">
        <input type="submit" style="background:blue;" onclick="limpar()" value="Limpar">
        <input type="submit" style="background:red;" onclick="document.location.reload(true)" value="voltar">
    </div>`


        folha.innerHTML =
            `<!--ponto positivo-->
        <div id="register-form" style="height: 600px">
             <p>Resultado</p>
            <div id="positivo"></div>
            <!--segundo ponto-->
             <p>segundo ponto</p>
            <div id="negativo"></div>
        </div>`
    } else {
        error.innerHTML = `<label id="erro">
        <input type="checkbox" class="alertCheckbox"/>
        <div class="alert error">
            <span class="alertClose">X</span>
            <span class="alertText">Escolha uma opção 
            <br class="clear"/></span>
        </div>
    </label>`

        $('#erro').show().fadeOut(5000);

    }
}

function calcular() {
    var valorVendas = Number(inputVendas.value)
    var entradasTotais = Number(inputEntradasTotais.value)
    var qtdVendas = Number(inputEntradasCaixa.value)

    var naoCompradores = entradasTotais - qtdVendas;
    var mediaPorComprador = valorVendas / qtdVendas;


    var taxaConversao = ((qtdVendas / entradasTotais) * 100).toFixed(0)   // Taxa de conversão da loja

    var qtdVendasPosFilas = qtdVendas;      // Usarei essa váriavel mais tarde pra atribuir o valor de aumento das vendas e renda após a melhora nas filas

    var qtdVendasPosConversao = qtdVendas + (qtdVendas * 0.60) // Após um aumento nas vendas de 60% que foi a melhor hipótese segundo pesquisas

    var qtdVendasCombinando = qtdVendasPosConversao   // Isso é contado após a taxa de conversão ser aumentada em 60% resultando na melhor hipótese


    /*primeiro calculo */
    if (qtdVendas > entradasTotais) {
        positivo.innerHTML = `<label>
                                <input type="checkbox" class="alertCheckbox"/>
                                <div class="alert error">
                                    <span class="alertClose">X</span>
                                    <span class="alertText">Suas vendas não podem sem maiores que suas entradas 
                                    <br class="clear"/></span>
                                </div>
                            </label>`
    } else {
        if (taxaConversao < 30) {
            positivo.innerHTML = `<span class="spanRed">Com esses números oferecidos sua taxa de conversão é: <b>${taxaConversao}%</b></span> <br><br>
Atualmente seu estabelecimento faz ${qtdVendas} mensais <br><br>
Aplicando nossa solução e utilizando nossos serviços de maneira correta suas vendas podem aumentar em até <b>60%</b>
E nessa hipótese seu valor total de vendas mensais seria de ${(qtdVendasPosConversao).toFixed}
e se sua renda acompanhasse seria de R$:${(qtdVendasPosConversao * mediaPorComprador).toFixed(0)}`
        }
        if (taxaConversao >= 30) {
            positivo.innerHTML = `<span class="spanTexto">Com esses números oferecidos sua taxa de conversão é: <b>${taxaConversao}%</b></span> <br><br>
Atualmente seu estabelecimento faz ${qtdVendas} mensais <br><br>
Aplicando nossa solução e utilizando nossos serviços de maneira correta suas vendas podem aumentar em até <b>60%</b>
E nessa hipótese seu valor total de vendas mensais seria de ${(qtdVendasPosConversao).toFixed(0)} e se sua renda acompanhasse seria 
de R$:${(qtdVendasPosConversao * mediaPorComprador).toFixed(0)}`
        }


        if (inpSemProblemas.checked) {
            negativo.innerHTML = `É bom que seu estabelecimento não tenha problemas com filas mas ainda podemos melhorar sua conversão`
        }
        if (inpPoucosProblemas.checked) {
            negativo.innerHTML = `Segundo pesquisas depois de 2 minutos em filas, seus clientes começarão a ficar frustrados e você está começando a perde-los`
        }
        if (inpAlgunsProblemas.checked) {

            // preço_com_desconto_percentual_incluído / (1- taxa_de_desconto) / 100)
            // inverter desconto

            qtdVendasCombinando = qtdVendasCombinando / (1 - (33 / 100))

            qtdVendasPosFilas = qtdVendas / (1 - (33 / 100))

            negativo.innerHTML = `Segundo a "Retail Costumer Experience" 1/3 
dos clientes que esperam até 5 minutos nas filas abandonam a mesma logo em seguida.<br><br>                                                         
Portanto, é possível dizer que seu estabelecimento deixou de fazer 1/3 das vendas. Caso não 
houvesse problemas com as filas seu total de vendas seria de  ${qtdVendasPosFilas.toFixed(0)} 
vendas e você teria arrecadado R$:${(qtdVendasPosFilas * mediaPorComprador).toFixed(0)}<br><br>
E se combinassemos tudo seu estabelecimento teria <b>${qtdVendasCombinando.toFixed(0)}</b> vendas mensais e uma renda de 
<b>R$:${(qtdVendasCombinando * mediaPorComprador).toFixed(0)}</b> 
`
        }

        if (inpMuitosProblemas.checked) {

            qtdVendasCombinando = qtdVendasCombinando / (1 - (50 / 100));

            qtdVendasPosFilas = qtdVendas / (1 - (50 / 100))
            negativo.innerHTML = `50% dos seus clientes vão desistir de comprar se esperarem mais do que cinco minutos na fila segundo pesquisas<br><br>
Então é possível que seus problemas com filas estejam diminuindo pela metade as suas vendas 
e se não houvessem problemas com filas seu total de vendas seria de ${qtdVendasPosFilas.toFixed(0)} 
e você teria arrecadado R$:${(qtdVendasPosFilas * mediaPorComprador).toFixed(0)}<br><br>
E se combinassemos tudo seu estabelecimento teria <b>${qtdVendasCombinando}</b> vendas mensais e uma renda de 
<b>R$:${(qtdVendasCombinando * mediaPorComprador).toFixed(0)}</b> 
`
        }
    }
}

function limpar() {

    document.getElementById('inputVendas').value = '';
    document.getElementById('inputEntradasTotais').value = '';
    document.getElementById('inputEntradasCaixa').value = '';
    positivo.innerHTML = '';
    negativo.innerHTML = '';
}