var input_fila = document.getElementById("option-1");
var input_sem_Fila = document.getElementById("option-2");

function escolha() {

    resultado.innerHTML =
        `<div class="form-control">
        <label for="name">Digite um valor</label>
        <input type="number" id="val1" placeholder="Digite qualquer numero">
    </div>
    <div class="form-control">
        <label for="name">segundo valor</label>
        <input type="number" id="val2" placeholder="Digite qualquer outro valor">
    </div>
    <div class="form-pass">
        <input type="submit" onclick="calcular()" value="calcular">
        <input type="submit" style="background:red;" onclick="document.location.reload(true)" value="voltar">
    </div>`


    folha.innerHTML =
        `<!--ponto positivo-->
        <div id="register-form" style="height: 600px">
             <p>Ponto positivo</p>
            <div id="positivo"></div>
            <!--ponto negativo-->
             <p>resultado negativo</p>
            <div id="negativo"></div>
        </div>`
}

function calcular() {

    var valor1 = Number(val1.value);
    var valor2 = Number(val2.value);

    var resultado = valor1 + valor2;
    var resultadoNega = valor1 - valor2;

    if (input_fila.checked) {
        positivo.innerHTML = `${resultado}`
        negativo.innerHTML = `${resultadoNega}`

    }

    else if (input_sem_Fila.checked) {
        negativo.innerHTML = `${resultadoNega}`
    }
}