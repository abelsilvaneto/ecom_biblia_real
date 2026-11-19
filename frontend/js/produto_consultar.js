const form = document.getElementById('form-consultar')
const resposta = document.getElementById('resposta')

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const id = document.getElementById('id').value

    try {
        const res = await fetch(`${API_URL}/produto/${id}`, {
            method: 'GET',
            headers: getHeaders(true)
        })

        const dados = await res.json()

        if (!res.ok) {
            mostrarMensagem(resposta, dados.message || 'Produto não encontrado.', true)
            return
        }

        resposta.innerHTML = `
            ${dados.imagemUrl ? `<img src="${dados.imagemUrl}" alt="${dados.titulo}" style="max-width: 140px; border-radius: 6px;">` : ''}
            <p><strong>ID:</strong> ${dados.codProduto}</p>
            <p><strong>Título:</strong> ${dados.titulo}</p>
            <p><strong>Tradução:</strong> ${dados.traducao}</p>
            <p><strong>Preço:</strong> R$ ${Number(dados.preco).toFixed(2)}</p>
            <p><strong>Categoria (ID):</strong> ${dados.idCategoria}</p>
        `
    } catch (err) {
        console.error(err)
        mostrarMensagem(resposta, 'Erro de conexão com o servidor.', true)
    }
})