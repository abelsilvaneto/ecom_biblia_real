const form = document.getElementById('form-consultar')
const resposta = document.getElementById('resposta')

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const id = document.getElementById('id').value

    try {
        const res = await fetch(`${API_URL}/categoria/${id}`, {
            method: 'GET',
            headers: getHeaders(true)
        })

        const dados = await res.json()

        if (!res.ok) {
            mostrarMensagem(resposta, dados.message || 'Categoria não encontrada.', true)
            return
        }

        resposta.innerHTML = `
            <p><strong>ID:</strong> ${dados.codCategoria}</p>
            <p><strong>Nome:</strong> ${dados.nome}</p>
            <p><strong>Descrição:</strong> ${dados.descricao || 'Sem descrição'}</p>
        `
    } catch (err) {
        console.error(err)
        mostrarMensagem(resposta, 'Erro de conexão com o servidor.', true)
    }
})