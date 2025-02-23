import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import accountRoutes from './routes/account.routes';
import categoryRoutes from './routes/category.routes';
import transactionRoutes from './routes/transaction.routes';
// Comentamos las rutas que aún no usaremos
// import collaboratorRoutes from './routes/collaborator.routes';
// import incomeRoutes from './routes/income.routes';
// import financialSystemRoutes from './routes/financial-system.routes';

dotenv.config();

const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'https://finanzasfacil.cl'],
  credentials: true
}));
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.json({ message: 'API Finanzas Fácil funcionando!' });
});

app.use('/api/auth', authRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/transactions', transactionRoutes);
// Comentamos las rutas que aún no usaremos
// app.use('/api/financial-systems', financialSystemRoutes);
// app.use('/api/collaborators', collaboratorRoutes);
// app.use('/api/incomes', incomeRoutes);

// Para Vercel, exportamos la app
export default app;

// Solo escuchamos si no estamos en Vercel
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
  });
} 