const express = require("express");
const router = express.Router();
const connection = require("../Utils/connection");

router.get("/:id", async (req,res) => {
  const {id} = req.params;
  try {
    let resultRoom = await connection.execute(`SELECT * FROM rooms INNER JOIN hotels ON rooms.hotel_id = hotels.hotel_Id WHERE rooms.rooms_id = ${id}`)
    res.status(200).json({
      message: "Lấy thành công",
      status: 200,
      data: resultRoom[0],
    })
  } catch (error) {
    console.log(error);
  }
})

router.put("/:id" , async(req,res) => {
  const {id} = req.params;
  try {
  await  connection.execute(`UPDATE project_module4.rooms SET status_room = '1' WHERE (rooms_id = ${id})`)
  res.status(200).json({
    message : "update thành công",
  })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message : "Lỗi server"
    })
  }
})

router.patch("/:id" , async (req,res) => {
  const {id} = req.params;
  try {
    await  connection.execute(`UPDATE project_module4.rooms SET status_room = '0' WHERE (rooms_id = ${id})`)
    res.status(200).json({
      message : "update thành công",
    })
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message : "Lỗi server"
      })
    }
})

module.exports = router;