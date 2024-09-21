// Dado um intervalo A e B, calcular o somatório de um Vetor de N Elementos Aleatórios.
import { get_text, print} from '../../utils/io_utils.js'
import { get_random_number, int } from '../../utils/math_utils.js'
import {meu_length, meu_split, mapear, meu_push, exibe_elementos_vetor} from '../../utils/my_collection_utils.js'

function main(){
    let intervalo = meu_split(get_text('\nInforme o intervalo numérico separado por espaço: '), ' ')
    
    intervalo = mapear(intervalo, int)

    let tamanho_vetor = get_text('\nQuantos elementos você deseja no vetor? ')

    let vetor = gerar_vetor(tamanho_vetor)

    vetor = preencher_vetor_aleatorios(vetor, intervalo)

    exibe_elementos_vetor(vetor, '\nVetor preenchido:\n')

    let somatorio_valores_vetor = obter_somatorio_valores(vetor)

    print(`\nSomatório dos valores = ${somatorio_valores_vetor}\n`)
}

function obter_somatorio_valores(vetor){
    let somatorio = 0

    for (let i = 0; i < meu_length(vetor); i++){
        somatorio = somatorio + vetor[i]
    }
    return somatorio
}

function preencher_vetor_aleatorios(vetor, intervalo){
    let min = intervalo[0]
    let max = intervalo[1]

    // para cada posicao do vetor, gerar um numero aleatorio para preencher cada posicao
    for (let i = 0; i < meu_length(vetor); i++){
        vetor[i] = get_random_number(min, max)
    }
    return vetor
}

function gerar_vetor(tamanho_vetor){
    let vetor = []
    for (let i = 0; i < tamanho_vetor; i++){
        meu_push(vetor, ' ')
    }
    return vetor
}

main()