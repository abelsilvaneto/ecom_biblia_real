const form = document.getElementById('form-atualizar')
const resposta = document.getElementById('resposta')

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const id = document.getElementById('id').value
    const campoStatus = document.getElementById('status')

    const payload = {
        idUsuario: Number(document.getElementById('IdUsuario').value),
        valorTotal: Number(document.getElementById('valorTotal').value),
        status: campoStatus ? campoStatus.value : 'PAGO'
    }

    try {
        const res = await fetch(`${API_URL}/pedido/${id}`, {
            method: 'PUT',
            headers: getHeaders(true),
            body: JSON.stringify(payload)
        })

        const dados = await res.json()

        if (!res.ok) {
            mostrarMensagem(resposta, dados.message || 'Erro ao atualizar pedido.', true)
            return
        }

        mostrarMensagem(resposta, dados.message)
        form.reset()
    } catch (err) {
        console.error(err)
        mostrarMensagem(resposta, 'Erro de conexão com o servidor.', true)
    }
})