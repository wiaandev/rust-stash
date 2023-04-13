"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const materialRoutes = require('./routes/materials.routes');
const userRoutes = require('./routes/users.routes');
const locationRoutes = require('./routes/locations.routes');
const recipeRoutes = require('./routes/recipes.routes');
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// Routes middleware
app.use(materialRoutes);
app.use(userRoutes);
app.use(locationRoutes);
app.use(recipeRoutes);
const port = process.env.PORT || 3001;
const db = process.env.DB_CONNECTION;
mongoose_1.default.set('strictQuery', false);
mongoose_1.default
    .connect(db)
    .then(() => {
    console.log('Connected to MongoDB');
})
    .catch((err) => {
    console.log(err);
});
// app.get("/", (req, res) => {
//     res.send("Working");
// })
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
