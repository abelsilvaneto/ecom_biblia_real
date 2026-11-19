const btnListar = document.getElementById('btn_listar')
const resposta = document.getElementById('resposta')

async function carregarProdutos() {
    try {
        const res = await fetch(`${API_URL}/produtos`, {
            method: 'GET',
            headers: getHeaders(false)
        })

        const dados = await res.json()

        if (!res.ok) {
            mostrarMensagem(resposta, dados.message || 'Erro ao listar produtos.', true)
            return
        }

        if (dados.length === 0) {
            resposta.innerHTML = '<p>Nenhum produto cadastrado.</p>'
            return
        }

        resposta.innerHTML = dados.map(prod => `
            <div class="card">
                ${prod.imagemUrl ? `<img src="${prod.imagemUrl}" alt="${prod.titulo}" style="max-width: 120px; border-radius: 6px;">` : ''}
                <p><strong>ID:</strong> ${prod.codProduto}</p>
                <p><strong>Título:</strong> ${prod.titulo}</p>
                <p><strong>Tradução:</strong> ${prod.traducao}</p>
                <p><strong>Preço:</strong> R$ ${Number(prod.preco).toFixed(2)}</p>
                <p><strong>Categoria (ID):</strong> ${prod.idCategoria}</p>
            </div>
        `).join('')
    } catch (err) {
        console.error(err)
        mostrarMensagem(resposta, 'Erro de conexão com o servidor.', true)
    }
}

btnListar.addEventListener('click', carregarProdutos)
document.addEventListener('DOMContentLoaded', carregarProdutos)