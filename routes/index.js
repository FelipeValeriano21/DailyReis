var express = require('express');
var router = express.Router();
const db = require("../db");

/* GET home page. */
router.get('/', async (req, res, next) => {
  const result = await db.find()
  res.render('view', { title: 'Express', result });
});

router.get('/Criarpost', async (req, res, next) => {
  res.render('insert');
});

router.post("/save", async (req, res) => {
  const user = req.body; 
  const result =  await db.insert(user);
  console.log(result);
  res.redirect('/')
});


router.post("/delete", async (req, res) => {
  const id = req.body.id; 
  const result =  await db.remove(id);
  console.log(result);
  res.redirect('/')
});


router.get("/update", async (req, res) => {
  const id = req.query.id;
  const autor = req.query.autor; 
  const descricao = req.query.descricao;
  const data = req.query.data;// Usar req.query para obter o ID da solicitação GET
  const sentimento =  req.query.sentimento;
  const result = await db.edit(id, autor, descricao, data, sentimento); // Chamar a função edit passando o ID
  res.render('editar', { title: 'Express', result });
});


router.post("/atualizadados", async (req, res) => {
  const id = req.body.id;
  const autor = req.body.autor;
  const descricao = req.body.descricao;
  const data = req.body.data;
  const sentimento = req.body.sentimento;
  const result = await db.atualiza(id, autor, descricao, data, sentimento);
  console.log(result);
  res.redirect('/')
});


module.exports = router;
