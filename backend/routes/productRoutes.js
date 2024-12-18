const express = require('express');
const multer = require('multer');
const Product = require('../models/Product');

const router = express.Router();

// Configuração do multer para upload de fotos
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './uploads/'),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

// Rotas

// Criar um novo produto
router.post('/', upload.single('foto'), async (req, res) => {
    try {
        const { nome, descricao, quantidade } = req.body;
        const foto = req.file ? req.file.path : null;

        const product = new Product({ nome, descricao, quantidade, foto });
        await product.save();

        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Listar todos os produtos
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Obter um produto pelo ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ error: 'Produto não encontrado' });
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Atualizar um produto
router.put('/:id', upload.single('foto'), async (req, res) => {
    try {
        const { nome, descricao, quantidade } = req.body;
        const foto = req.file ? req.file.path : null;

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { nome, descricao, quantidade, foto },
            { new: true }
        );

        if (!updatedProduct) return res.status(404).json({ error: 'Produto não encontrado' });

        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Deletar um produto
router.delete('/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ error: 'Produto não encontrado' });
        res.status(200).json({ message: 'Produto excluído com sucesso' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
