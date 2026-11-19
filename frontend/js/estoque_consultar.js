const form = document.getElementById('form-consultar')
const resposta = document.getElementById('resposta')

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const id = document.getElementById('id').value

    try {
        const res = await fetch(`${API_URL}/estoque/${id}`, {
            method: 'GET',
            headers: getHeaders(true)
        })

        const dados = await res.json()

        if (!res.ok) {
            mostrarMensagem(resposta, dados.message || 'Estoque não encontrado.', true)
            return
        }

        resposta.innerHTML = `
            <p><strong>ID Estoque:</strong> ${dados.codEstoque}</p>
            <p><strong>ID Produto:</strong> ${dados.idProduto}</p>
            <p><strong>Quantidade Disponível:</strong> ${dados.quantidadeDisponivel}</p>
        `
    } catch (err) {
        console.error(err)
        mostrarMensagem(resposta, 'Erro de conexão com o servidor.', true)
    }
})