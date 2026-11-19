const form = document.getElementById('form-item-pedido')
const resposta = document.getElementById('resposta')

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const payload = {
        idPedido: Number(document.getElementById('Idpedido').value),
        idProduto: Number(document.getElementById('Idproduto').value),
        quantidade: Number(document.getElementById('quantidade').value),
        precoUnitario: Number(document.getElementById('precoUnitario').value)
    }

    try {
        const res = await fetch(`${API_URL}/itemPedido`, {
            method: 'POST',
            headers: getHeaders(true),
            body: JSON.stringify(payload)
        })

        const dados = await res.json()

        if (!res.ok) {
            mostrarMensagem(resposta, dados.message || 'Erro ao adicionar item ao pedido.', true)
            return
        }

        mostrarMensagem(resposta, dados.message)
        form.reset()
    } catch (err) {
        console.error(err)
        mostrarMensagem(resposta, 'Erro de conexão com o servidor.', true)
    }
})