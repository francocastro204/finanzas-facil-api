"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const account_routes_1 = __importDefault(require("./routes/account.routes"));
const category_routes_1 = __importDefault(require("./routes/category.routes"));
const transaction_routes_1 = __importDefault(require("./routes/transaction.routes"));
// Comentamos las rutas que aún no usaremos
// import collaboratorRoutes from './routes/collaborator.routes';
// import incomeRoutes from './routes/income.routes';
// import financialSystemRoutes from './routes/financial-system.routes';
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: ['http://localhost:3000', 'https://finanzasfacil.cl'],
    credentials: true
}));
app.use(express_1.default.json());
const PORT = process.env.PORT || 4000;
app.get('/', (req, res) => {
    res.json({ message: 'API Finanzas Fácil funcionando!' });
});
app.use('/api/auth', auth_routes_1.default);
app.use('/api/accounts', account_routes_1.default);
app.use('/api/categories', category_routes_1.default);
app.use('/api/transactions', transaction_routes_1.default);
// Comentamos las rutas que aún no usaremos
// app.use('/api/financial-systems', financialSystemRoutes);
// app.use('/api/collaborators', collaboratorRoutes);
// app.use('/api/incomes', incomeRoutes);
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
