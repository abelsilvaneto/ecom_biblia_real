const form = document.getElementById('form-apagar')
const resposta = document.getElementById('resposta')

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const id = document.getElementById('id').value

    try {
        const res = await fetch(`${API_URL}/estoque/${id}`, {
            method: 'DELETE',
            headers: getHeaders(true)
        })

        const dados = await res.json()

        if (!res.ok) {
            mostrarMensagem(resposta, dados.message || 'Erro ao apagar estoque.', true)
            return
        }

        mostrarMensagem(resposta, dados.message)
        form.reset()
    } catch (err) {
        console.error(err)
        mostrarMensagem(resposta, 'Erro de conexão com o servidor.', true)
    }
})