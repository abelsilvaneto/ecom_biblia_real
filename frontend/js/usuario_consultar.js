const form = document.getElementById('form-consultar')
const resposta = document.getElementById('resposta')

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const id = document.getElementById('id').value

    try {
        const res = await fetch(`${API_URL}/usuario/${id}`, {
            method: 'GET',
            headers: getHeaders(true)
        })

        const dados = await res.json()

        if (!res.ok) {
            mostrarMensagem(resposta, dados.message || 'Usuário não encontrado.', true)
            return
        }

        resposta.innerHTML = `
            <p><strong>ID:</strong> ${dados.codUsuario}</p>
            <p><strong>Nome:</strong> ${dados.nome}</p>
            <p><strong>E-mail:</strong> ${dados.email}</p>
            <p><strong>CPF:</strong> ${dados.cpf}</p>
            <p><strong>Tipo:</strong> ${dados.tipo}</p>
        `
    } catch (err) {
        console.error(err)
        mostrarMensagem(resposta, 'Erro de conexão com o servidor.', true)
    }
})