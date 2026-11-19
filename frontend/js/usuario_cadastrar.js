const form = document.getElementById('form-usuario')
const resposta = document.getElementById('resposta')

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const payload = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        senha: document.getElementById('senha').value,
        cpf: document.getElementById('cpf').value
    }

    try {
        const res = await fetch(`${API_URL}/usuario`, {
            method: 'POST',
            headers: getHeaders(false),
            body: JSON.stringify(payload)
        })

        const dados = await res.json()

        if (!res.ok) {
            mostrarMensagem(resposta, dados.message || 'Erro ao cadastrar usuário.', true)
            return
        }

        mostrarMensagem(resposta, dados.message)
        form.reset()
    } catch (err) {
        console.error(err)
        mostrarMensagem(resposta, 'Erro de conexão com o servidor.', true)
    }
})