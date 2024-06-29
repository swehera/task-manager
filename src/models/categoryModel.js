const { Schema, model, models } = require("mongoose");

const categorySchema = new Schema({
  category_name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Category = models.category || model("category", categorySchema);
export default Category;
