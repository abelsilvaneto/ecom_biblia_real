const btnListar = document.getElementById('btn_listar')
const resposta = document.getElementById('resposta')

async function carregarEstoques() {
    try {
        const res = await fetch(`${API_URL}/estoques`, {
            method: 'GET',
            headers: getHeaders(true)
        })

        const dados = await res.json()

        if (!res.ok) {
            mostrarMensagem(resposta, dados.message || 'Erro ao listar estoques.', true)
            return
        }

        if (dados.length === 0) {
            resposta.innerHTML = '<p>Nenhum registro de estoque encontrado.</p>'
            return
        }

        resposta.innerHTML = dados.map(est => `
            <div class="card">
                <p><strong>ID Estoque:</strong> ${est.codEstoque}</p>
                <p><strong>ID Produto:</strong> ${est.idProduto}</p>
                <p><strong>Quantidade Disponível:</strong> ${est.quantidadeDisponivel}</p>
            </div>
        `).join('')
    } catch (err) {
        console.error(err)
        mostrarMensagem(resposta, 'Erro de conexão com o servidor.', true)
    }
}

btnListar.addEventListener('click', carregarEstoques)
document.addEventListener('DOMContentLoaded', carregarEstoques) 