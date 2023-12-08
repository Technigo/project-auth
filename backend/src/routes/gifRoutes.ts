const gifController = require("../controllers/gifController");

router.get("/", gifController.getAllUsers);
router.post("/signup", gifController.createNewUser);
router.post("/login", gifController.loginUser);
router.put("/:id", gifController.updateUser);
router.delete("/delete/:id", gifController.deleteUser);

module.exports = router;
