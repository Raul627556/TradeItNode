const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 80;

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(cors({
    origin: 'http://tradeit.es:8081',
    credentials: true,
  }));
} else {
  // cors con lista blanca para prod…
}

// 👇 Aquí cargamos las rutas centralizadas
app.use('/api', require('./routes'));

app.get('/', (req, res) => {
  res.send('Bienvenido a la API de TradeIt');
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
    .then(() => console.log('✅ Conectado a MongoDB'))
    .catch(err => console.error('❌ Error al conectar a MongoDB:', err));

app.listen(port, () => {
  console.log(`🚀 Servidor backend escuchando en http://localhost:${port}`);
});
