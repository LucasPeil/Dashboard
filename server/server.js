const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const errorHandler = require('./middlewares/errorHandler');
const connectDb = require('./db');
const PORT = process.env.PORT || 5030;

connectDb();
const app = express();
app.use(
  cors({
    origin: [
      'http://localhost:5173', // Porta padrão do Vite
      'http://127.0.0.1:5173',
    ],
    credentials: true,
  })
);
app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    parameterLimit: 100000,
    limit: '50mb',
    extended: true,
  })
);

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/atividades-casa', require('./routes/atividadesCasaRoutes'));
app.use('/api/atividades-lazer', require('./routes/atividadesLazerRoutes'));
app.use(
  '/api/atividades-educacao',
  require('./routes/atividadesEducacaoRoutes')
);
app.use('/api/dinheiroGasto', require('./routes/visaoGeralRoutes'));

app.use(errorHandler);
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log('Server started on port ' + PORT));
}
module.exports = app;
