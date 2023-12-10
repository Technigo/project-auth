"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gif = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const gifSchema = new mongoose_1.default.Schema({
    word: { type: String, required: [true, "gif needs the word to search"] },
    path: { type: String, required: true },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "gifSchema need to know the user"],
    },
}, {
    timestamps: true,
});
const Gif = mongoose_1.default.model("Gif", gifSchema);
exports.Gif = Gif;
//# sourceMappingURL=gifModel.js.map