const btnListar = document.getElementById('btn_listar')
const resposta = document.getElementById('resposta')

async function carregarPedidos() {
    try {
        const res = await fetch(`${API_URL}/pedidos`, {
            method: 'GET',
            headers: getHeaders(true)
        })

        const dados = await res.json()

        if (!res.ok) {
            mostrarMensagem(resposta, dados.message || 'Erro ao listar pedidos.', true)
            return
        }

        if (dados.length === 0) {
            resposta.innerHTML = '<p>Nenhum pedido cadastrado.</p>'
            return
        }

        resposta.innerHTML = dados.map(ped => `
            <div class="card">
                <p><strong>ID Pedido:</strong> ${ped.codPedido}</p>
                <p><strong>ID Usuário:</strong> ${ped.idUsuario}</p>
                <p><strong>Data:</strong> ${new Date(ped.dataPedido).toLocaleString('pt-BR')}</p>
                <p><strong>Valor Total:</strong> R$ ${Number(ped.valorTotal).toFixed(2)}</p>
                <p><strong>Status:</strong> ${ped.status}</p>
            </div>
        `).join('')
    } catch (err) {
        console.error(err)
        mostrarMensagem(resposta, 'Erro de conexão com o servidor.', true)
    }
}

btnListar.addEventListener('click', carregarPedidos)
document.addEventListener('DOMContentLoaded', carregarPedidos)