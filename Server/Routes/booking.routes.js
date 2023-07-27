const express = require("express");
const router = express.Router();
const connection = require("../Utils/connection");

router.post("/", async (req, res) => {
  const { rooms_id, check_in_date, check_out_date ,number_night, total_price, UserId } =req.body;
  try {
    await connection.execute(
      `INSERT INTO booking_room ( rooms_id , check_in_date , check_out_date , number_night , total_price , UserId) VALUES (${rooms_id},'${check_in_date}', '${check_out_date}' ,${number_night},${total_price},${UserId});`
    );
    return res.status(200).json({
      message: "Thêm thành công",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Lỗi server",
      status: 500,
    });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let result =
      await connection.execute(`select h.nameRoom , br.rooms_id , br.booking_room_id , br.check_in_date , br.check_out_date ,br.number_night, br.total_price , br.UserId , h.location from hotels as h  
    join rooms as r on h.hotel_Id = r.hotel_Id
    join booking_room as br on br.rooms_id= r.rooms_id where UserId = ${id}`);
    res.status(200).json({
      message: "Lấy được rồi",
      status: 200,
      data : result[0]
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Lỗi server",
      status: 500,
    });
  }
});

router.delete("/:id" , (req,res) => {
  const {id} = req.params;
  try {
    connection.execute(`DELETE FROM booking_room WHERE (booking_room_id = ${id})`)
    res.status(200).json({
      message: "Xóa thành công",
      status: 200,
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Lỗi server",
      status: 500,
    });
  }
})

module.exports = router;
