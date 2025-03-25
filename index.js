const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');



require('dotenv').config();

const app = express();
const port = 80;

//ROUTES
app.use('/api', productRoutes);

// Configurar CORS para permitir todas las solicitudes
app.use(cors());  // Permite todos los orígenes

// Middleware para procesar JSON en las solicitudes
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Bienvenido a la API');
});

// xConectar con la base de datos MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.log('Error al conectar a MongoDB:', err));


// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
