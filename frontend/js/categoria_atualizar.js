const form = document.getElementById('form-atualizar')
const resposta = document.getElementById('resposta')

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const id = document.getElementById('id').value
    const nome = document.getElementById('nome').value

    try {
        const res = await fetch(`${API_URL}/categoria/${id}`, {
            method: 'PUT',
            headers: getHeaders(true),
            body: JSON.stringify({ nome })
        })

        const dados = await res.json()

        if (!res.ok) {
            mostrarMensagem(resposta, dados.message || 'Erro ao atualizar categoria.', true)
            return
        }

        mostrarMensagem(resposta, dados.message)
        form.reset()
    } catch (err) {
        console.error(err)
        mostrarMensagem(resposta, 'Erro de conexão com o servidor.', true)
    }
})