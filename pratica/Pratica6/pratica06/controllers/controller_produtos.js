const produtos = [];

function listarTodos(req, res) {
    res.json(produtos);
}

function buscarPeloId(req, res) {
    const { produtoId } = req.params;
    const produtoEncontrado = produtos.find(item => item.id == produtoId);
    if (produtoEncontrado) { 
        res.json(produtoEncontrado);
    } else {
        res.status(404).json({msg: "Produto não encontrado"});
    }
}

function criar(req, res) {
    const { nome, preco } = req.body;
      if ( nome && preco ){

          const produtoNovo = { id: produtos.length+1, nome, preco };
    produtos.push(produtoNovo);
    res.status(201).json(produtoNovo);}
    else {
      res.status(422).json({msg:"Nome e preço do produtos são obrigatórios"})
    }
}

function atualizar(req, res) {
    const { produtoId } = req.params;
    const { nome, preco } = req.body;
    const produtoEncontrado = produtos.find(item => item.id == produtoId);
    if (produtoEncontrado) {
          produtoEncontrado.nome = nome;
          produtoEncontrado.preco = preco;
        res.json(produtoEncontrado);
    } else {
        res.status(404).json({msg: "Produto não encontrado"});
    }
}

function remover(req, res) {
    const { produtoId } = req.params;
    const posicao = produtos.findIndex(item => item.id == produtoId);
    if (posicao >= 0)  {
        produtos.splice(posicao, 1);
        res.status(204).end();
    } else {
        res.status(404).json({msg: "Produto não encontrado"});
    }
}

module.exports = { listarTodos, buscarPeloId, criar, atualizar, remover };