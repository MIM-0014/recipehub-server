const connectDB = require("../config/db");

const getAllRecipes = async (req, res) => {
  try {
    const db = await connectDB();

    const recipes = await db
      .collection("recipes")
      .find()
      .toArray();

    res.send(recipes);
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Failed to fetch recipes",
    });
  }
};

module.exports = {
  getAllRecipes,
};