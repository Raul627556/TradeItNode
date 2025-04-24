const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

//ControllerRoutes
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');


require('dotenv').config();

const app = express();
const port = 80;

// Middleware para procesar JSON en las solicitudes
app.use(express.json());


//ROUTES
app.use('/api/products', productRoutes);
app.use('/api/user', userRoutes);

// Configurar CORS para permitir todas las solicitudes
app.use(cors());  // Permite todos los orígenes



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
