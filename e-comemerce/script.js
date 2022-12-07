//Variavel global modal
let modalKey = 0

//variavel para controlar quantidade de itens iniciais
let quantItens = 1

let cart = [] //carrinho

//funçoes uteis
const seleciona = (elemento) => document.querySelector(elemento)
const selecionaTodos = (elemento) => document.querySelectorAll(elemento)

const formatoReal = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})
}

const formatoMonetario = (valor) => {
    if(valor) {
        return valor.toFixed(2)
    }
}


const abrirModal = () => {
    seleciona('.coffeWindowArea').style.opacity = 0
    seleciona('.coffeWindowArea').style.display = 'flex'
    setTimeout(() => {
        seleciona('.coffeWindowArea').style.opacity = 1
    }, 150)
}
 const fecharModal = () => {
    seleciona('.coffeWindowArea').style.opacity = 0
    setTimeout(() => {
        seleciona('.coffeWindowArea').style.display = 'none'
    }, 500)
 }

 const botoesFechar = () => {
    //fechar modal
    selecionaTodos('.coffeInfo--cancelButton, .coffeInfo--cancelMobileButton').forEach((item) => {
        item.addEventListener('click', fecharModal)
    })
 }

 const preencherDadosCard = (coffeItem, item, index) => {
    coffeItem.setAttribute('data-key', index)
    coffeItem.querySelector('.coffe-item--img img').src = item.img
    coffeItem.querySelector('.coffe-item--price').innerHTML = formatoReal(item.price[2])
    coffeItem.querySelector('.coffe-item--name').innerHTML = item.name
    coffeItem.querySelector('.coffe-item--desc').innerHTML = item.description
 }

 const preenchedadosmodal = (item) => {
        /*document.querySelector('.coffeBig img').src = item.img
        document.querySelector('.coffeInfo h1').innerHTML = item.name
        document.querySelector('.coffeInfo--desc').innerHTML = item.description
        document.querySelector('.coffeInfo--actualPrice').innerHTML = `R$ ${item.price}`*/
        seleciona('.coffeBig img').src = item.img
        seleciona('.coffeInfo h1').innerHTML = item.name
        seleciona('.coffeInfo--desc').innerHTML = item.description
        seleciona('.coffeInfo--actualPrice').innerHTML = formatoReal(item.price[2])
 }
 const pegarKey = (e) => {
    //.closest retorna o elemento mais proximo que tem a class que passamos do
    //.coffe-item ele vai pegar o valor do atributo data-key
    let key = e.target.closest('.coffe-item').getAttribute('data-key')
    console.log('Item clicado ' + key)
    console.log(coffeJson[key])

    //garantir que a quantidade inicial de itens sejam 1
    quantItens = 1

    // para manter a informação de qual item foi clicado
    modalKey = key

    return key
 }

 const preencherTamanhos = (key) => {
    // tira a seleção de tamanho atual e seleciona outro
    seleciona('.coffeInfo--size.selected').classList.remove('selected')

    //seleciona todos os tamanhos
    selecionaTodos('.coffeInfo--size').forEach((size, sizeIndex) => {
        //selecionar tamanho G
        (sizeIndex == 2) ? size.classList.add('selected') : ''
        size.querySelector('span').innerHTML = coffeJson[key].sizes[sizeIndex]

    })
 }

 const escolherTamanhoPreco = (key) => {
    //açoes nos button tamanho
    //selecionar todos os tamanhos
    selecionaTodos('.coffeInfo--size').forEach((size, sizeIndex) => {
        size.addEventListener('click', (e) => {
            //clicou em um item, tirar a seleçao e marcar
            //tirar a seleção tamanho atual e marcar no grande
            seleciona('.coffeInfo--size.selected').classList.remove('selected')
            //marcar o que vc clicou, ao inves de usar e.target, usa o size, pois ele é nosso item dentro do loop
            size.classList.add('selected')

            //mudar o preco de acordo com o tamanho
            seleciona('.coffeInfo--actualPrice').innerHTML = formatoReal(coffeJson[key].price[sizeIndex])
        })
    })
 }
 
 const mudarQuantidade = () => {
    // Ações nos botoes + e - do modal
    seleciona('.coffeInfo--qtmais').addEventListener('click',() => {
        quantItens++
        seleciona('.coffeInfo--qt').innerHTML = quantItens
    })

    seleciona('.coffeInfo--qtmenos').addEventListener('click', () => {
        if(quantItens > 1){
            quantItens--
            seleciona('.coffeInfo--qt').innerHTML = quantItens
        }
    })
 }


coffeJson.map((item, index ) => {
    //console.log(item)
    let coffeItem = document.querySelector('.modelos .coffe-item').cloneNode(true)

    //console.log(coffeItem)

    //document.querySelector('.coffe-area').append(coffeItem)
    seleciona('.coffe-area').append(coffeItem)
    
    preencherDadosCard(coffeItem, item, index)

    //item clicado
    coffeItem.querySelector('.coffe-item a').addEventListener('click', (e) => {
        e.preventDefault()
        console.log('Clicou no item')

        let chave = pegarKey(e)

        //abre janela
        //document.querySelector('.coffeWindowArea').style.display = 'flex'
        abrirModal()

        //preencher dados
        preenchedadosmodal(item)

        //tamanho selecionado
        preencherTamanhos(chave)

        //deficinir quantidade inicial como 1
        seleciona('.coffeInfo--qt').innerHTML = quantItens

        escolherTamanhoPreco(chave)

        

    })

    document.querySelector('.coffeInfo--cancelButton').addEventListener('click', () =>{
        document.querySelector('.coffeWindowArea').style.display = 'none'
    })

    document.querySelector('.coffeInfo--cancelMobileButton').addEventListener('click', () =>{
        document.querySelector('.coffeWindowArea').style.display = 'none'
    })

    botoesFechar()
}) // fim do map coffeJson

//mudar quantidade com os botoes + e -
mudarQuantidade()