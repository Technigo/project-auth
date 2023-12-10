"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const crypto = tslib_1.__importStar(require("crypto"));
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const userShema = new mongoose_1.default.Schema({
    name: { type: String, unique: true },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        validate: {
            validator: function (value) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
            },
            message: "Please enter a valid email",
        },
        required: [true, "Email is required"],
    },
    password: { type: String, require: true, minlength: 8 },
    accessToken: { type: String, default: () => crypto.randomBytes(128).toString("hex") },
}, {
    timestamps: true,
});
const User = mongoose_1.default.model("User", userShema);
exports.User = User;
//# sourceMappingURL=userModel.js.map