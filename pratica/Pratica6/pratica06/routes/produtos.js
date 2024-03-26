const express = require('express');

const produtosController = require("../controllers/controller_produtos");

const router = express.Router();

router.get("/", produtosController.listarTodos);

router.get("/:produtoId", produtosController.buscarPeloId);

router.post("/",produtosController.criar);

router.put("/:produtoId", produtosController.atualizar);

router.delete("/:produtoId",produtosController.remover);

module.exports = router;