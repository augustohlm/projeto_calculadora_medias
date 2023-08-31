const form = document.getElementById('form-atividade');
const imgAprovado = '<img src="./images/aprovado.png" alt="Emoji comemorando">';
const imgReprovado = '<img src="./images/reprovado.png" alt="Emoji triste">';
const atividades = [];
const notas = [];
const spanAprovado = '<span class="resultado aprovado">Aprovado</span> ';
const spanReprovado = '<span class="resultado reprovado">Reprovado</span> ';
const notaMinima = parseFloat(prompt('Digite a nota minima: '));
// necessario que ela seja uma variável global para não ser resetada dentro do evento "form.addEventListener('submit', function(e)"
    // esse evento sempre que executado, caso a variável estivesse dentro dele, iria reseta-la apagando o contéudo
    let linhas = '';

form.addEventListener('submit', function(e){
    e.preventDefault();

    adicionaLinha();
    atualizaTabela();
    atualizaMediaFinal();
});

//essa função ficará somente responsável em adicionar linhas na tabela!
function adicionaLinha(){
    const inputNomeAtividade = document.getElementById('nome-atividade');
    const inputNotaAtividade = document.getElementById('nota-atividade');
    
    if(atividades.includes(inputNomeAtividade.value)) {
        alert(`Atividade:  ${inputNomeAtividade.value} já existente!`);
    } else {
        atividades.push(inputNomeAtividade.value);
        notas.push(parseFloat(inputNotaAtividade.value));
        
        let linha = '<tr>';
        linha += `<td> ${inputNomeAtividade.value} </td>`;
        linha += `<td> ${inputNotaAtividade.value} </td>`;
        /*o sinal de "?" significa caso a condição seja verdadeira e os ":" caso seja falsa */
        linha += `<td> ${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado}</td>`;
        linha += '</tr>';
    // utilizado para acrescentar varias linhas de trabalho e notas
        linhas += linha;
    }
    inputNomeAtividade.value = '';
    inputNotaAtividade.value = '';
}

function atualizaTabela(){
    //Para colocar o contéudo acima dentro do corpo da tabela é necessário o processo abaixo!
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas;
}

function atualizaMediaFinal(){
    const mediaFinal = calculaMediaFinal();

    document.getElementById('media-final-valor').innerHTML = mediaFinal;
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado;

}

function calculaMediaFinal(){
    let somaDasNotas = 0;

    for(let i = 0; i < notas.length; i++){
    somaDasNotas += notas[i];
        }
    return somaDasNotas / notas.length;

}

