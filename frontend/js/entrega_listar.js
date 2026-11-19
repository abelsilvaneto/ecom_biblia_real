const btnListar = document.getElementById('btn_listar')
const resposta = document.getElementById('resposta')

async function carregarEntregas() {
    try {
        const res = await fetch(`${API_URL}/entregas`, {
            method: 'GET',
            headers: getHeaders(true)
        })

        const dados = await res.json()

        if (!res.ok) {
            mostrarMensagem(resposta, dados.message || 'Erro ao listar entregas.', true)
            return
        }

        if (dados.length === 0) {
            resposta.innerHTML = '<p>Nenhuma entrega cadastrada.</p>'
            return
        }

        resposta.innerHTML = dados.map(ent => `
            <div class="card">
                <p><strong>ID Entrega:</strong> ${ent.codEntrega}</p>
                <p><strong>ID Pedido:</strong> ${ent.idPedido}</p>
                <p><strong>Endereço:</strong> ${ent.rua}, ${ent.numero} - ${ent.bairro}</p>
                <p><strong>Cidade/UF:</strong> ${ent.cidade}/${ent.estado} - CEP: ${ent.cep}</p>
                <p><strong>Status:</strong> ${ent.statusEntrega}</p>
            </div>
        `).join('')
    } catch (err) {
        console.error(err)
        mostrarMensagem(resposta, 'Erro de conexão com o servidor.', true)
    }
}

btnListar.addEventListener('click', carregarEntregas)
document.addEventListener('DOMContentLoaded', carregarEntregas)