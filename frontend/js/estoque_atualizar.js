const form = document.getElementById('form-atualizar')
const resposta = document.getElementById('resposta')

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const id = document.getElementById('id').value
    const payload = {
        idProduto: Number(document.getElementById('idProduto').value),
        quantidadeDisponivel: Number(document.getElementById('quantidadeDisponivel').value)
    }

    try {
        const res = await fetch(`${API_URL}/estoque/${id}`, {
            method: 'PUT',
            headers: getHeaders(true),
            body: JSON.stringify(payload)
        })

        const dados = await res.json()

        if (!res.ok) {
            mostrarMensagem(resposta, dados.message || 'Erro ao atualizar estoque.', true)
            return
        }

        mostrarMensagem(resposta, dados.message)
        form.reset()
    } catch (err) {
        console.error(err)
        mostrarMensagem(resposta, 'Erro de conexão com o servidor.', true)
    }
})