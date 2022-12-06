coffeJson.map((item, index ) => {
    //console.log(item)
    let coffeItem = document.querySelector('.modelos .coffe-item').cloneNode(true)

    //console.log(coffeItem)

    document.querySelector('.coffe-area').append(coffeItem)
    
    coffeItem.querySelector('.coffe-item--img img').src = item.img
    coffeItem.querySelector('.coffe-item--price').innerHTML = `R$ ${item.price}`
    coffeItem.querySelector('.coffe-item--name').innerHTML = item.name
    coffeItem.querySelector('.coffe-item--desc').innerHTML = item.description

    //item clicado
    coffeItem.querySelector('.coffe-item a').addEventListener('click', (e) => {
        e.preventDefault()
        console.log('Clicou no item')

        //abre janela
        document.querySelector('.coffeWindowArea').style.display = 'flex'

        //preencher dados
        document.querySelector('.coffeBig img').src = item.img
        document.querySelector('.coffeInfo h1').innerHTML = item.name
        document.querySelector('.coffeInfo--desc').innerHTML = item.description
        document.querySelector('.coffeInfo--actualPrice').innerHTML = `R$ ${item.price}`


    })

    document.querySelector('.coffeInfo--cancelButton').addEventListener('click', () =>{
        document.querySelector('.coffeWindowArea').style.display = 'none'
    })

    document.querySelector('.coffeInfo--cancelMobileButton').addEventListener('click', () =>{
        document.querySelector('.coffeWindowArea').style.display = 'none'
    })
})