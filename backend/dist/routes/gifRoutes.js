"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
exports.router = router;
const gifController_1 = require("../controllers/gifController");
router.route("/").post(auth_1.authenticateUser, gifController_1.createGif).get(auth_1.authenticateUser, gifController_1.getGifs);
//# sourceMappingURL=gifRoutes.js.map