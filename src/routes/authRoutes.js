const express = require("express");
const jwt = require("jsonwebtoken");
const auth = require("../config/firebaseAdmin");

const router = express.Router();

router.post("/jwt", async (req, res) => {
  try {
    const { token } = req.body;

    const decoded = await auth.verifyIdToken(token);

    const jwtToken = jwt.sign(
      {
        email: decoded.email,
        uid: decoded.uid,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.status(200).send({
      success: true,
      message: "JWT Created Successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(401).send({
      success: false,
      message: "Unauthorized",
    });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  res.send({
    success: true,
    message: "Logged Out Successfully",
  });
});

module.exports = router;