const { db } = require("../connection");
const { uploader } = require("../helper/upload");
const fs = require("fs");

module.exports = {
  getProduk: (req, res) => {
    try {
      const { id } = req.params;
      let sql = `SELECT p.*, pi.image FROM allproducts pi ON p.id = pi.productsId WHERE usersId=${id}`;
      db.query(sql, (err, result) => {
        if (err) res.status(500).send({ message: "server error", err });
        return res.status(200).send(result);
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server Error",
        error: error.message
      });
    }
  },
  
  getAllCategory: (req, res) => {
    try {
      let sql = `SELECT * FROM products_category`;
      db.query(sql, (err, result) => {
        if (err) res.status(500).send({ message: "Get Category Error" });
        return res.status(200).send(result);
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server Error",
        error: error.message
      });
    }
  },

};
