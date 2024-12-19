require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const productRoutes = require('../routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('Nenhum arquivo foi enviado!');
    }
    res.send(`Arquivo enviado com sucesso! Nome do arquivo: ${req.file.filename}`);
});

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB conectado com sucesso!'))
    .catch((err) => console.log('Erro ao conectar ao MongoDB:', err));

app.use('/produtos', productRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
