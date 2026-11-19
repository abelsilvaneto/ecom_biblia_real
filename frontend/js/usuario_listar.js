const btnListar = document.getElementById('btn_listar')
const resposta = document.getElementById('resposta')

async function carregarUsuarios() {
    try {
        const res = await fetch(`${API_URL}/usuarios`, {
            method: 'GET',
            headers: getHeaders(true)
        })

        const dados = await res.json()

        if (!res.ok) {
            mostrarMensagem(resposta, dados.message || 'Erro ao listar usuários.', true)
            return
        }

        if (dados.length === 0) {
            resposta.innerHTML = '<p>Nenhum usuário cadastrado.</p>'
            return
        }

        resposta.innerHTML = dados.map(user => `
            <div class="card">
                <p><strong>ID:</strong> ${user.codUsuario}</p>
                <p><strong>Nome:</strong> ${user.nome}</p>
                <p><strong>E-mail:</strong> ${user.email}</p>
                <p><strong>CPF:</strong> ${user.cpf}</p>
                <p><strong>Tipo:</strong> ${user.tipo}</p>
            </div>
        `).join('')
    } catch (err) {
        console.error(err)
        mostrarMensagem(resposta, 'Erro de conexão com o servidor.', true)
    }
}

btnListar.addEventListener('click', carregarUsuarios)
document.addEventListener('DOMContentLoaded', carregarUsuarios)