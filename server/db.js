const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB connected at: ${conn?.connection.host}`);
  } catch (e) {
    console.log("Erro ao conectar ao banco de dados " + e);
  }
};

module.exports = connectDb;
