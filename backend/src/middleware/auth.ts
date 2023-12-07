// const authenticateUser = async (req, res, next) => {
//   const user = await User.findOne({ accessToken: req.header("Authorization") });
//   if (user) {
//     req.user = user;
//     next();
//   } else {
//     req.status(401).json({ loggedOut: true });
//   }
// };

// const dbEntry = { name: "bob", password: "Sabbc32983def" };
// bcrypt.compareSync(request.password, dbEntry.password);
