const formLogin = document.getElementById('form-login')
const resposta = document.getElementById('resposta')

if (formLogin) {
    formLogin.addEventListener('submit', async (e) => {
        e.preventDefault()

        const email = document.getElementById('email').value
        const senha = document.getElementById('senha').value

        try {
            const res = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: getHeaders(false),
                body: JSON.stringify({ email, senha })
            })

            const dados = await res.json()

            if (!res.ok) {
                mostrarMensagem(resposta, dados.message || 'Erro ao fazer login.', true)
                return
            }

            localStorage.setItem('token', dados.token)
            localStorage.setItem('usuarioNome', dados.nome)
            mostrarMensagem(resposta, `${dados.message} Bem-vindo(a), ${dados.nome}!`)
        } catch (err) {
            console.error(err)
            mostrarMensagem(resposta, 'Erro de conexão com o servidor.', true)
        }
    })
}