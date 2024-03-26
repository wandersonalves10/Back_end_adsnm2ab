const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);

describe("Teste da API Produtos", function () {
    test("POST /produtos deve retornar 201 e um objeto JSON", async function () {
        const novo = { nome: "uva", preco: 20.00 }
        const response = await request.post("/produtos").send(novo);
        expect(response.status).toBe(201);
        expect(response.type).toBe("application/json");
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("nome", novo.nome);
        expect(response.body).toHaveProperty("preco", novo.preco);
    });

    test("GET /produtos deve retornar 200 e um array JSON", async function () {
        const response = await request.get("/produtos");
        expect(response.status).toBe(200);
        expect(response.type).toBe("application/json");
        expect(Array.isArray(response.body)).toBe(true);
    });

    test("GET /produtos/:id deve retornar 200 e um objeto JSON", async function () {
        const response = await request.get("/produtos/1");
        expect(response.status).toBe(200);
        expect(response.type).toBe("application/json");
        expect(response.body).toHaveProperty("id", 1);
        expect(response.body).toHaveProperty("nome", "uva");
        expect(response.body).toHaveProperty("preco", 20.00);
    });

    test("GET /produtos/:id deve retornar 404 e um objeto JSON", async function () {
        const response = await request.get("/produtos/100");
        expect(response.status).toBe(404);
        expect(response.type).toBe("application/json");
        expect(response.body).toHaveProperty("msg", "Produto não encontrado");
    });

    test("POST /produtos sem JSON deve retornar 422 e um objeto JSON", async function () {
        const response = await request.post("/produtos");
        expect(response.status).toBe(422);
        expect(response.type).toBe("application/json");
        expect(response.body).toHaveProperty("msg", "Nome e preço do produtos são obrigatórios");
    });

    test("PUT /produtos/:id deve retornar 200 e um objeto JSON", async function () {
        const atual = { nome: "uva verde", preco: 18.00 };
        const response = await request.put("/produtos/1").send(atual);
        expect(response.status).toBe(200);
        expect(response.type).toBe("application/json");
        expect(response.body).toHaveProperty("id", 1);
        expect(response.body).toHaveProperty("nome", atual.nome);
        expect(response.body).toHaveProperty("preco", atual.preco);
    });

    test("PUT /produtos/:id deve retornar 404 e um objeto JSON", async function () {
        const response = await request.put("/produtos/100").send({ nome: "uva verde", preco: 18.00 });
        expect(response.status).toBe(404);
        expect(response.type).toBe("application/json");
        expect(response.body).toHaveProperty("msg", "Produto não encontrado");
    });

    test("DELETE /produtos/:id deve retornar 204 e sem conteúdo", async function () {
        const response = await request.delete("/produtos/1");
        expect(response.status).toBe(204);
        expect(response.type).toBe("");
        expect(response.body).toEqual({});
    });

    test("DELETE /produtos/:id deve retornar 404 e um objeto JSON", async function () {
        const response = await request.delete("/produtos/100");
        expect(response.status).toBe(404);
        expect(response.type).toBe("application/json");
        expect(response.body).toHaveProperty("msg", "Produto não encontrado");
    });
});