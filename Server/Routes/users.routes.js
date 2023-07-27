const express = require("express");
const router = express.Router();
const connection = require("../Utils/connection");
const checkValidate = require("../Middleware/checkValidate");
const bcrypt = require("bcrypt");

router.get("/", async(req, res) => {
  try {
    const data = await connection.execute("SELECT * FROM users");
    res.status(200).json({
      message : "Lấy thành công",
      status : 200,
      data : data[0]
    })  
  } catch (error) {
    console.log(error);
      return res.status(500).json({
        message: "Lỗi server",
        status: 500,
      });
  }

});

router.get("/:id", async(req, res) => {
  const {id} = req.params
  try {
    const data = await connection.execute(`SELECT * FROM users WHERE UserId = ?` , [id]);
    res.status(200).json({
      message : "Lấy thành công",
      status : 200,
      data : data[0]
    })  
  } catch (error) {
    console.log(error);
      return res.status(500).json({
        message: "Lỗi server",
        status: 500,
      });
  }

});


router.post(
  "/register",
  checkValidate.checkValidate,
  checkValidate.checkDuplicate,
  async (req, res) => {
    const {
      Email,
      Phone,
      UserName,
      DateOfBirth,
      Gender,
      PassWord,
      Role,
      Status,
    } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(Email)) {
      return res.status(400).json({
        message: "Email không hợp lệ",
        status: 400,
      });
    }
    try {
        const hashedPassword = await bcrypt.hash(PassWord, 10);
        await connection.execute(
          `INSERT INTO users (Email,Phone,UserName,DateOfBirth,Gender,PassWord,Role,Status) VALUES ('${Email}','${Phone}','${UserName}','${DateOfBirth}','${Gender}','${hashedPassword}' , '${Role}' , '${Status}')`
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
  }
);

router.post("/login", async (req, res) => {
  const { Email, PassWord } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(Email)) {
    return res.status(400).json({
      message: "Email không đúng định dạng",
      status: 400,
    });
  }
  try {
    const [rows] = await connection.execute(
      "SELECT * FROM users WHERE Email = ?",
      [Email]
    );

    const user = rows[0];

    const isPasswordMatch = await bcrypt.compare(PassWord, user.PassWord);
    
    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Email hoặc mật khẩu không đúng",
        status: 401,
      });
    }

    res.status(200).json({
      message: "Đăng nhập thành công",
      status: 200,
      data : user
    });
  } catch (error) {
    console.log("Lỗi khi đăng nhập", error);
    res.status(500).json({
      message: "Lỗi server",
      status: 500,
    });
  }
});

router.delete("/deleteUser/:id", (req, res) => {
  const { id } = req.params;
  try {
    connection.execute(
      `DELETE FROM project_module4 . users WHERE (UserId = '${id}')`);
    res.status(200).json({
      message: "Xóa thành công",
      status : 200
    });
  } catch (error) {
    console.log("Lỗi khi xóa", error);
    res.status(500).json({
      message: "Lỗi không xóa được",
      err: err,
    });
  }
});

router.put("/update_User/:id", (req, res) => {
  const { id } = req.params;
  const { Role, Status } = req.body;
  try {
    connection.execute(`UPDATE project_module4.users SET Role = '${Role}', Status = '${Status}' WHERE (UserId = '${id}')`);
    res.status(200).json({
      message: "Update thành công",
      status : 200
    });
  } catch (error) {
    console.log("Lỗi khi update", error);
    res.status(500).json({
      message: "Lỗi khi update",
      err: err,
    })
  }
 
});

router.put("/edit_User/:id" , async(req,res) => {
  const {id} = req.params;
  const {UserName , Gender , DateOfBirth} = req.body;
  try {
    await connection.execute(
      "UPDATE users SET UserName = ?, Gender  = ?,  DateOfBirth = ?  WHERE UserId = ?",
      [UserName, +Gender, DateOfBirth, id ]
    );
    res.json({
      status: 200,
      message: "Cập nhật thông tin người dùng thành công",
    });
  } catch (error) {
    console.error("Lỗi cập nhật thông tin người dùng", error);
    res.status(500).json({ message: "Đã có lỗi xảy ra" });
  }
});

router.patch("/edit_passWord/:id", async (req, res) => {
  const { id } = req.params;
  const { PassWord, newPassWord } = req.body;
  console.log(req.body);
  try {
    const [rows] = await connection.execute(
      "SELECT * FROM users WHERE UserId = ?",
      [id]
    );

    const user = rows[0];

    const isPasswordMatch = await bcrypt.compare(PassWord, user.PassWord);

    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Mật khẩu hiện tại không đúng",
        status: 401,
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassWord, saltRounds);

    await connection.execute(
      "UPDATE users SET PassWord = ? WHERE UserId = ?",
      [hashedPassword, id]
    );

    res.status(200).json({
      message: "Đổi mật khẩu thành công",
      status: 200,
    });
  } catch (error) {
    console.log("Lỗi khi đổi mật khẩu", error);
    res.status(500).json({
      message: "Lỗi server",
      status: 500,
    });
  }
});


module.exports = router;
