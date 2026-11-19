const btnListar = document.getElementById('btn_listar')
const resposta = document.getElementById('resposta')

async function carregarCategorias() {
    try {
        const res = await fetch(`${API_URL}/categorias`, {
            method: 'GET',
            headers: getHeaders(false)
        })

        const dados = await res.json()

        if (!res.ok) {
            mostrarMensagem(resposta, dados.message || 'Erro ao listar categorias.', true)
            return
        }

        if (dados.length === 0) {
            resposta.innerHTML = '<p>Nenhuma categoria cadastrada.</p>'
            return
        }

        resposta.innerHTML = dados.map(cat => `
            <div class="card">
                <p><strong>ID:</strong> ${cat.codCategoria}</p>
                <p><strong>Nome:</strong> ${cat.nome}</p>
                <p><strong>Descrição:</strong> ${cat.descricao || 'Sem descrição'}</p>
            </div>
        `).join('')
    } catch (err) {
        console.error(err)
        mostrarMensagem(resposta, 'Erro de conexão com o servidor.', true)
    }
}

btnListar.addEventListener('click', carregarCategorias)
document.addEventListener('DOMContentLoaded', carregarCategorias)