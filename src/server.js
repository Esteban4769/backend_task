import express from 'express';
import bookRoutes from './routes/bookRoutes.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import sequelize from './db.js';


const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use('/', authRoutes);
app.use('/users', userRoutes);
app.use('/books', bookRoutes);

app.get('/', (req, res) => {
  res.send('Use route /signup to register or /login to sign in');
});

app.listen(PORT);
