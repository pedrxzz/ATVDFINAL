const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    descricao: { type: String, required: true },
    quantidade: { type: Number, required: true },
    foto: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
