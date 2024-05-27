const bcrypt = require("bcrypt");

// Example stored password from database
const storedPasswordHash =
  "$2b$10$CJeEJ475jZ68IgKNto2Wg.wFSL1kLs3R9U4q.HBTkOOpB8pCNlG0G";

// Example entered password
const enteredPassword = "katt";

// Compare entered password with stored password hash
bcrypt
  .compare(enteredPassword, storedPasswordHash)
  .then((result) => {
    console.log("Password match result:", result);
    if (result) {
      console.log("Password match");
    } else {
      console.log("Passwords do not match.");
    }
  })
  .catch((error) => {
    console.error("Password comparison error:", error);
  });
