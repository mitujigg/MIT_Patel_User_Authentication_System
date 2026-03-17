// const router = require("express").Router();

// const auth = require("../controllers/authController");
// const authMiddleware = require("../middleware/authMiddleware");
// const limiter = require("../middleware/rateLimiter");

// router.post("/signup",auth.signup);

// router.post("/login",limiter,auth.login);

// router.get("/dashboard",authMiddleware,(req,res)=>{
//  res.json({
//   message:"Dashboard",
//   user:req.user
//  });
// });

// module.exports = router;

const router = require("express").Router();

const auth = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const limiter = require("../middleware/rateLimiter");

router.post("/signup", auth.signup);

router.post("/login", limiter, auth.login);

router.get("/dashboard", authMiddleware, (req, res) => {
 res.json({
  message: "Dashboard",
  user: req.user
 });
});

module.exports = router;