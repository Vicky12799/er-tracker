"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaClient = void 0;
const express_1 = __importDefault(require("express"));
const secrets_1 = require("./secrets");
const root_1 = __importDefault(require("./routes/root"));
const client_1 = require("@prisma/client");
const error_1 = require("./middleware/error");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api', root_1.default);
exports.prismaClient = new client_1.PrismaClient({
    log: ['query']
});
app.use(error_1.errorMiddleware);
app.get('/', (req, res) => {
    res.send('<h1> Hi </h1>');
});
app.listen(secrets_1.PORT, () => {
    console.log(`Application running successfully on ${secrets_1.PORT}`);
});
