const form = document.getElementById('form-consultar')
const resposta = document.getElementById('resposta')

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const id = document.getElementById('id').value

    try {
        const res = await fetch(`${API_URL}/pedido/${id}`, {
            method: 'GET',
            headers: getHeaders(true)
        })

        const dados = await res.json()

        if (!res.ok) {
            mostrarMensagem(resposta, dados.message || 'Pedido não encontrado.', true)
            return
        }

        resposta.innerHTML = `
            <p><strong>ID Pedido:</strong> ${dados.codPedido}</p>
            <p><strong>ID Usuário:</strong> ${dados.idUsuario}</p>
            <p><strong>Data:</strong> ${new Date(dados.dataPedido).toLocaleString('pt-BR')}</p>
            <p><strong>Valor Total:</strong> R$ ${Number(dados.valorTotal).toFixed(2)}</p>
            <p><strong>Status:</strong> ${dados.status}</p>
        `
    } catch (err) {
        console.error(err)
        mostrarMensagem(resposta, 'Erro de conexão com o servidor.', true)
    }
})