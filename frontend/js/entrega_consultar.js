const form = document.getElementById('form-consultar')
const resposta = document.getElementById('resposta')

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const id = document.getElementById('id').value

    try {
        const res = await fetch(`${API_URL}/entrega/${id}`, {
            method: 'GET',
            headers: getHeaders(true)
        })

        const dados = await res.json()

        if (!res.ok) {
            mostrarMensagem(resposta, dados.message || 'Entrega não encontrada.', true)
            return
        }

        resposta.innerHTML = `
            <p><strong>ID Entrega:</strong> ${dados.codEntrega}</p>
            <p><strong>ID Pedido:</strong> ${dados.idPedido}</p>
            <p><strong>Endereço:</strong> ${dados.rua}, ${dados.numero} - ${dados.bairro}</p>
            <p><strong>Cidade/UF:</strong> ${dados.cidade}/${dados.estado} - CEP: ${dados.cep}</p>
            <p><strong>Status:</strong> ${dados.statusEntrega}</p>
        `
    } catch (err) {
        console.error(err)
        mostrarMensagem(resposta, 'Erro de conexão com o servidor.', true)
    }
})