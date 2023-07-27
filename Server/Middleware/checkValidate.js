const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const connection = require("../Utils/connection");
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

const checkTsEmpty = (field) => {
  if (field === undefined || field === null || field === "") {
    return true;
  } else {
    return false;
  }
};

async function checkValidate(req, res, next) {
  const {
    Email,
    Phone,
    UserName,
    DateOfBirth,
    Gender,
    PassWord,
  } = req.body;

  if (checkTsEmpty(UserName)) {
    return res.status(404).json({
      message: "Tên không được phép để trống",
    });
  }
  if (checkTsEmpty(Phone)) {
    return res.status(404).json({
      message: "Điện thoại không được phép để trống",
    });
  }
  if (checkTsEmpty(PassWord)) {
    return res.status(404).json({
      message: "Mật khẩu không được phép để trống",
    });
  }
  if (checkTsEmpty(Email)) {
    return res.status(404).json({
      message: "Email được không được phép để trống",
    });
  }
  if (checkTsEmpty(DateOfBirth)) {
    return res.status(404).json({
      message: "Ngày sinh không được phép để trống",
    });
  }
  if (checkTsEmpty(Gender)) {
    return res.status(404).json({
      message: "Giới tính không được phép để trống",
    });
  }
  if (PassWord.length < 5) {
    return res.status(400).json({
      message: "Mật khẩu tối thiểu 5 kí tự",
    });
  }

  // Nếu các trường đã được cung cấp, tiếp tục xử lý yêu cầu
  next();
}

const checkDuplicate = async (req, res, next) => {
  const { Email, Phone } = req.body;
  try {
    const [rows] = await connection.execute(
      "SELECT * FROM users WHERE Email=? OR Phone = ?",
      [Email, Phone]
    );
    if (rows.length > 0) {
      const duplicateEmail =
        rows.find((user) => user.Email === Email) !== undefined;
      const duplicatePhone =
        rows.find((user) => user.Phone === Phone) !== undefined;

      if (duplicateEmail) {
        return res.status(400).json({
          status: 400,
          message: "Email đã tồn tại trong hệ thống",
        });
      }

      if (duplicatePhone) {
        return res.status(400).json({
          status: 400,
          message: "Phone đã tồn tại trong hệ thống",
        });
      }
    } else {
      next();
    }
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
};

module.exports = { checkValidate , checkDuplicate };
