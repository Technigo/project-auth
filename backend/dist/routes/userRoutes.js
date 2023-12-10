"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const router = express_1.default.Router();
exports.router = router;
const userController_1 = require("../controllers/userController");
router.get("/", userController_1.getAllUsers);
router.post("/signup", userController_1.createNewUser);
router.post("/login", userController_1.loginUser);
router.put("/:id", userController_1.updateUser);
router.delete("/delete/:id", userController_1.deleteUser);
//# sourceMappingURL=userRoutes.js.map