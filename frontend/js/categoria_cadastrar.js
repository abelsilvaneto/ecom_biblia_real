const form = document.getElementById('form-categoria')
const resposta = document.getElementById('resposta')

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const nome = document.getElementById('nome').value

    try {
        const res = await fetch(`${API_URL}/categoria`, {
            method: 'POST',
            headers: getHeaders(true),
            body: JSON.stringify({ nome })
        })

        const dados = await res.json()

        if (!res.ok) {
            mostrarMensagem(resposta, dados.message || 'Erro ao cadastrar categoria.', true)
            return
        }

        mostrarMensagem(resposta, dados.message)
        form.reset()
    } catch (err) {
        console.error(err)
        mostrarMensagem(resposta, 'Erro de conexão com o servidor.', true)
    }
})