const form = document.getElementById('form-consultar')
const resposta = document.getElementById('resposta')

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const id = document.getElementById('id').value

    try {
        const res = await fetch(`${API_URL}/itemPedido/${id}`, {
            method: 'GET',
            headers: getHeaders(true)
        })

        const dados = await res.json()

        if (!res.ok) {
            mostrarMensagem(resposta, dados.message || 'Item do pedido não encontrado.', true)
            return
        }

        resposta.innerHTML = `
            <p><strong>ID Item:</strong> ${dados.codItemPedido}</p>
            <p><strong>ID Pedido:</strong> ${dados.idPedido}</p>
            <p><strong>ID Produto:</strong> ${dados.idProduto}</p>
            <p><strong>Quantidade:</strong> ${dados.quantidade}</p>
            <p><strong>Preço Unitário:</strong> R$ ${Number(dados.precoUnitario).toFixed(2)}</p>
        `
    } catch (err) {
        console.error(err)
        mostrarMensagem(resposta, 'Erro de conexão com o servidor.', true)
    }
})