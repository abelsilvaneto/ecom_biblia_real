const API_URL = 'http://localhost:3000'

function getHeaders(comAuth = true) {
    const headers = {
        'Content-Type': 'application/json'
    }

    if (comAuth) {
        const token = localStorage.getItem('token')
        if (token) {
            headers['Authorization'] = `Bearer ${token}`
        }
    }

    return headers
}

function mostrarMensagem(elemento, mensagem, erro = false) {
    elemento.innerHTML = `<p style="color: ${erro ? '#d9534f' : '#28a745'}; font-weight: bold;">${mensagem}</p>`
}