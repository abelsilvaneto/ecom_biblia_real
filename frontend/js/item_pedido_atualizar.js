const form = document.getElementById('form-atualizar')
const resposta = document.getElementById('resposta')

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const id = document.getElementById('id').value
    const payload = {
        idPedido: Number(document.getElementById('Idpedido').value),
        idProduto: Number(document.getElementById('Idproduto').value),
        quantidade: Number(document.getElementById('quantidade').value),
        precoUnitario: Number(document.getElementById('precoUnitario').value)
    }

    try {
        const res = await fetch(`${API_URL}/itemPedido/${id}`, {
            method: 'PUT',
            headers: getHeaders(true),
            body: JSON.stringify(payload)
        })

        const dados = await res.json()

        if (!res.ok) {
            mostrarMensagem(resposta, dados.message || 'Erro ao atualizar item do pedido.', true)
            return
        }

        mostrarMensagem(resposta, dados.message)
        form.reset()
    } catch (err) {
        console.error(err)
        mostrarMensagem(resposta, 'Erro de conexão com o servidor.', true)
    }
})