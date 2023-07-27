const express = require("express");
const router = express.Router();
const connection = require("../Utils/connection");

router.get("/", async (req, res) => {
  try {
    const data = await connection.execute("SELECT * FROM hotels");
    res.status(200).json({
      message: "Lấy thành công",
      status: 200,
      data: data[0],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Lỗi server",
      status: 500,
    });
  }
});

router.get("/get/location", async (req, res) => {
  const { location } = req.query;
  try {
    const query = `SELECT * FROM hotels WHERE location = ? ORDER BY price ASC`;
    const [result] = await connection.execute(query, [location]);
    res.status(200).json({ result });
  } catch (error) {
    console.log(error);
  }
});

router.get("/detail/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await connection.execute(
      `SELECT * FROM hotels where hotel_Id= ${id}`
    );
    res.status(200).json({
      message: "Lấy thành công",
      status: 200,
      data: data[0],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Lỗi server",
      status: 500,
    });
  }
});

router.get("/detailroom/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const hotelResult = await connection.execute(
      `SELECT * FROM rooms INNER JOIN hotels ON rooms.hotel_id = hotels.hotel_Id WHERE hotels.hotel_Id = ${id}`
    );
    res.status(200).json({
      message: "Lấy thành công",
      status: 200,
      data: hotelResult[0],
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/search" , async(req,res) => {
  try {
    const {searchValue} = req.query;
    const {location} = req.body;
    const [hotel] = await connection.execute(`SELECT * FROM project_module4.hotels WHERE location = '${location}' AND nameRoom LIKE '%${searchValue}%'`)
    res.status(200).json({
      message : "Lọc thành công",
      data : hotel
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message : "Lỗi server",
      error
    })
  }
})

module.exports = router;
