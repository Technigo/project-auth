"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const dotenv = tslib_1.__importStar(require("dotenv"));
const helmet_1 = tslib_1.__importDefault(require("helmet"));
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const userRoutes_1 = require("./routes/userRoutes");
const gifRoutes_1 = require("./routes/gifRoutes");
const express_list_endpoints_1 = tslib_1.__importDefault(require("express-list-endpoints"));
dotenv.config();
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017/project-auth";
mongoose_1.default.connect(mongoUrl).then(() => console.log("connected"));
const port = process.env.PORT || 8080;
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/v1/user", userRoutes_1.router);
app.use("/api/v1/gif", gifRoutes_1.router);
app.use("/", (req, res) => {
    res.json((0, express_list_endpoints_1.default)(app));
});
app.all("*", (req, res, next) => {
    res.status(500).json({ status: "fail", message: "Something went very wrong 💥 " });
    next();
});
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map