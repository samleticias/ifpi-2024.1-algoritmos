import { get_size } from './util/my_collection_utils.js'
import { print, get_text, get_number_in_range } from './util/my_entsai_utils.js'
import { writeFileSync, readFileSync } from 'fs'
import { question } from 'readline-sync';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// funcao para obter indice do filme em listagem para realizar operacoes do menu
export function obter_indice_filme(filmes){
    print('>>> Filmes Cadastrados <<<')
    for (let i = 0; i < get_size(filmes); i++){
        let filme = filmes[i]
        let linha = `${i}: ${filme.nome}`
        print(linha)
    }
    print('------------------------------------')
    let indice = get_number_in_range('> ', 0, get_size(filmes) - 1)
    return indice
}

// menu de opcoes do CRUD
export function menu_filmes_crud(){
    const opcoes = [
        '--------------------------------------------',
        '================== MOVIES ==================',
        '--------------------------------------------',
        '1 - Cadastrar filme',
        '2 - Listar filmes',
        '3 - Atualizar filme',
        '4 - Remover filme da lista',
        '5 - Carregar de um arquivo',
        '6 - Filtrar filmes por gênero',
        '7 - Contar filmes por país',
        '8 - Filtrar filmes por parte do título',
        '9 - Contar filmes por gênero',
        '10 - Filtrar filmes por ano',
        '11 - Filme com maior bilheteria',
        '12 - Filme com menor bilheteria',
        '13 - Contar filmes por idioma',
        '14 - Filtrar filmes por idioma',
        '0 - Sair',
        '=============================================',
    ]
    return opcoes
}

// funcao para obter opcoes de qualquer menu
export function get_opcoes(opcoes, label='Escolha uma das opções a seguir:'){
    console.log(label)
    for (let i = 0; i < opcoes.length; i++){
        console.log(`> ${opcoes[i]}`)
    }
    let opcao_escolhida = Number(question('Digite o número da opção desejada:\n'))
    return opcao_escolhida
}

// funcao para escrever objetos de filme no arquivo movies.txt 
export function escrever_filmes_arquivo(filmes) {
    const caminho_arquivo = path.resolve(__dirname, 'movies.txt')
    const linhas = filmes.map(filme => 
        `${filme.nome}#${filme.ano}#${filme.imdb}#${filme.bilheteira}#${filme.duracao}#${filme.idioma}#${filme.pais}#${filme.data_lancamento}#${filme.genero}`
    )
    fs.writeFileSync(caminho_arquivo, linhas.join('\n') + '\n', 'utf8')
}

// funcao para configurar atributos do filme
export function configura_chaves_filme(nome, ano, imdb, bilheteira, duracao, idioma, pais, data_lancamento, genero) {
    return {
        nome,
        ano: parseInt(ano, 10),
        imdb: parseFloat(imdb),
        bilheteira: parseFloat(bilheteira),
        duracao: parseInt(duracao, 10),
        idioma,
        pais,
        data_lancamento,
        genero
    }
}

// funcao para inicializar filmes de arquivo movies.txt
export function inicializacao() {
    const caminho_arquivo = path.resolve(__dirname, 'movies.txt')
    const data = fs.readFileSync(caminho_arquivo, 'utf8')

    return data
        .split('\n')
        .filter(linha => linha.trim()) 
        .map(linha => {
            const [nome, ano, imdb, bilheteira, duracao, idioma, pais, data_lancamento, genero] = linha.split('#')
            return configura_chaves_filme(nome, ano, imdb, bilheteira, duracao, idioma, pais, data_lancamento, genero)
        })
}

export function carregar_arquivo(nome_arquivo){
    return readFileSync(nome_arquivo, "utf-8")
}

// funcao utilizada quando se carrega dados de um arquivo para o programa, identificando as chaves com o split para o objeto filme
function linha_para_filme(linha) {
    const partes = linha.split('#')
    // console.log(`Partes: ${partes}`)
    if (get_size(partes) !== 10) {
        throw new Error(`Formato inválido na linha: ${linha}`)
    }
    const [nome, ano, imdb, bilheteira, duracao, idioma, pais, data_lancamento, genero] = partes
    return configura_chaves_filme(nome, ano, imdb, bilheteira, duracao, idioma, pais, data_lancamento, genero)
}

// funcao para carregar dados de um arquivo para realizar operacoes no CRUD
export function ler_vetor_arquivo() {
    try {
        const nome_arquivo = get_text('Qual o nome do arquivo?\n')
        const arquivo = carregar_arquivo(nome_arquivo)
        
        const linhas = arquivo.trim().split('\n')
        
        const filmes = linhas.map(linha => linha_para_filme(linha))
        
        return filmes
    } catch (error) {
        console.error(`Erro ao ler o arquivo: ${error.message}`)
        return []
    }
}

export function escreve_conteudo_em_arquivo(nome_arquivo, conteudo){
    writeFileSync(nome_arquivo, conteudo)
}