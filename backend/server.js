import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";
import RecipeData from "./data/RecipeData.json"

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/project-mongo";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8090;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

/////// Monday
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
    /// My_B4nK_P4$$word
  },
  // npm install crypto
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex")
  }
});

const User = mongoose.model("User", UserSchema);

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
// npm install bcrypt
// const code = [1, 2, 4, 4];
// const makeCodeSecret = (codeArr) => {
    // const secretMessage = codeArr.map(singleNumber => singleNumber + 1);
    // return secretMessage
//}
// transformedCode = makeCodeSecret(code)
  try {
    const salt = bcrypt.genSaltSync();
    if (password.length < 8) {
      res.status(400).json({
        success: false,
        response: "Password must be at least 8 characters long"
      });
    } else {
      const newUser = await new User({username: username, password: bcrypt.hashSync(password, salt)}).save();
      res.status(201).json({
        success: true,
        response: {
          username: newUser.username,
          accessToken: newUser.accessToken,
          id: newUser._id
        }
      });
    }
  } catch(error) {
      res.status(400).json({
        success: false,
        response: error
      });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({username});
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        success: true,
        response: {
          username: user.username,
          id: user._id,
          accessToken: user.accessToken
        }
      });
    } else {
      res.status(400).json({
        success: false,
        response: "Credentials didn't match"
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      response: error
    });
  }
});

const authenticateUser = async (req, res, next) => {
  const accessToken = req.header("Authorization");
  try {
    const user = await User.findOne({accessToken: accessToken});
    if (user) {
      next();
    } else {
      res.status(401).json({
        response: "Please log in",
        success: false
      })
    }
  } catch (error) {
    res.status(400).json({
      response: error,
      success: false
    })
  }
}

const RecipesSchema = new mongoose.Schema({
  id: {
    type: Number
  },
  Ingredients: {
    type: String
  },
  TotalTimeMinuits: {
    type: Number
  },
  Portions: {
    type: Number
  },
  CaloriesPerPortion: {
    type: Number
  },
  Vegetarian: {
    type: Boolean
  },
  KindOfDish: {
    type: String
  },
  TypeOfKitchen: {
    type: String
  },
}); 

const Recipes = mongoose.model("Receipt", RecipesSchema);

if (true) {
  const resetDatabase = async () => {
    await Recipes.deleteMany();
    RecipeData.forEach(item => {
      const newRecipe= new Recipes(item);
      newRecipe.save();
    })
  }
  resetDatabase();
}

app.get("/recipes", authenticateUser);
app.get("/recipes", async (req, res)=> {
  const recipes = await Recipes.find({});
  res.status(200).json({ success: true, response: recipes });
});


/*
app.post("/recipes", authenticateUser)
app.post("/recipes", async (req, res) => {
  const { RecipesSchema } = req.body;
  try {
    const newRecipe = await new Recipes({RecipesSchema}).save();
    res.status(201).json({success: true, response: newRecipe});
  } catch (error) {
    res.status(400).json({success: false, response: error});
  }
});
*/
///////
// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Welcome to Recipes!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});