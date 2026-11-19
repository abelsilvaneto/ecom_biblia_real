const btnListar = document.getElementById('btn_listar')
const resposta = document.getElementById('resposta')

async function carregarItensPedido() {
    try {
        const res = await fetch(`${API_URL}/itensPedido`, {
            method: 'GET',
            headers: getHeaders(true)
        })

        const dados = await res.json()

        if (!res.ok) {
            mostrarMensagem(resposta, dados.message || 'Erro ao listar itens do pedido.', true)
            return
        }

        if (dados.length === 0) {
            resposta.innerHTML = '<p>Nenhum item de pedido cadastrado.</p>'
            return
        }

        resposta.innerHTML = dados.map(item => `
            <div class="card">
                <p><strong>ID Item:</strong> ${item.codItemPedido}</p>
                <p><strong>ID Pedido:</strong> ${item.idPedido}</p>
                <p><strong>ID Produto:</strong> ${item.idProduto}</p>
                <p><strong>Quantidade:</strong> ${item.quantidade}</p>
                <p><strong>Preço Unitário:</strong> R$ ${Number(item.precoUnitario).toFixed(2)}</p>
            </div>
        `).join('')
    } catch (err) {
        console.error(err)
        mostrarMensagem(resposta, 'Erro de conexão com o servidor.', true)
    }
}

btnListar.addEventListener('click', carregarItensPedido)
document.addEventListener('DOMContentLoaded', carregarItensPedido)