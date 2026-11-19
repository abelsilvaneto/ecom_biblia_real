const form = document.getElementById('form-pedido')
const resposta = document.getElementById('resposta')

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const payload = {
        idUsuario: Number(document.getElementById('IdUsuario').value),
        valorTotal: Number(document.getElementById('valorTotal').value)
    }

    try {
        const res = await fetch(`${API_URL}/pedido`, {
            method: 'POST',
            headers: getHeaders(true),
            body: JSON.stringify(payload)
        })

        const dados = await res.json()

        if (!res.ok) {
            mostrarMensagem(resposta, dados.message || 'Erro ao cadastrar pedido.', true)
            return
        }

        mostrarMensagem(resposta, dados.message)
        form.reset()
    } catch (err) {
        console.error(err)
        mostrarMensagem(resposta, 'Erro de conexão com o servidor.', true)
    }
})