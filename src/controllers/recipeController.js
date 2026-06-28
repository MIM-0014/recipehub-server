const connectDB = require("../config/db");

const getAllRecipes = async (req, res) => {
  try {
    const db = await connectDB();

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;

    const skip = (page - 1) * limit;

    const { categories } = req.query;

    let query = {};

    if (categories) {
      query.category = {
        $in: categories.split(","),
      };
    }

    const total = await db.collection("recipes").countDocuments(query);

    const recipes = await db
      .collection("recipes")
      .find(query)
      .skip(skip)
      .limit(limit)
      .toArray();

    res.send({
      recipes,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      message: "Failed to fetch recipes",
    });
  }
};

module.exports = {
  getAllRecipes,
};