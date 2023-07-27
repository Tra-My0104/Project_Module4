import { useEffect, useState } from "react";
import "./Register.css";
import Button from "react-bootstrap/Button";
import { notification } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Users {
  Email: string;
  Phone: string;
  UserName: string;
  DateOfBirth: string;
  Gender: number;
  PassWord: string;
  Role: number;
  Status: number;
}

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [dateOfBirth, setDateOfBrith] = useState<string>("");
  const [gender, setGender] = useState<number>(0);
  const [password, setPassword] = useState<string>("");
  const [passwordAgain, setPasswordAgain] = useState<string>("");
  const [emailRegister, setEmailRegister] = useState<string[]>([]);
  const [phoneRegister, setPhoneRegister] = useState<string[]>([]);

  const loadUsers = async (): Promise<void> => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/users");
      const users = response.data.data;
      const findEmail = users.map((e: any) => e.Email);
      const findPhone = users.map((e: any) => e.Phone);
      setEmailRegister(findEmail);
      setPhoneRegister(findPhone);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (
      email === "" ||
      phone === "" ||
      userName === "" ||
      dateOfBirth === "" ||
      (gender !== 0 && gender !== 1) ||
      password === "" ||
      passwordAgain === ""
    ) {
      notification.error({
        message: "Thất bại",
        description: "Mời nhập đủ thông tin",
      });
      return;
    }

    function validateEmail(email: string): boolean {
      let regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      return regex.test(email);
    }

    if (!validateEmail(email)) {
      notification.error({
        message: "Thất bại",
        description: "Email sai định dạng",
      });
      return;
    }

    if (emailRegister.includes(email)) {
      notification.error({
        message: "Thất bại",
        description: "Email đã tồn tại",
      });
      return;
    }

    if (phoneRegister.includes(phone)) {
      notification.error({
        message: "Thất bại",
        description: "Phone đã tồn tại",
      });
      return;
    }

    if(phone.length > 10){
      notification.error({
        message: "Thất bại",
        description: "Phone không đúng định dạng",
      });
      return;
    }

    if (password.length < 5) {
      notification.error({
        message: "Thất bại",
        description: "Mật khẩu phải lớn hơn 5",
      });
      return;
    }

    if (password !== passwordAgain) {
      notification.error({
        message: "Thất bại",
        description: "Mật khẩu nhập lại không đúng",
      });
      return;
    }

    const newUsers: Users = {
      Email: email,
      Phone: phone,
      UserName: userName,
      DateOfBirth: dateOfBirth,
      Gender: +gender,
      PassWord: password,
      Role: 0,
      Status: 0,
    };

    try {
      console.log(newUsers);
      await axios.post("http://localhost:8000/api/v1/users/register", newUsers);
      notification.success({
        message: "Thành công",
        description: "Đăng ký thành công",
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      notification.error({
        message: "Thất bại",
        description: "Đăng ký thất bại",
      });
    }
  };

  return (
    <>
      <div className="color-header-register">
        <h3
          style={{
            fontWeight: "bold",
            color: "white",
            padding: "60px 0px 0px 20px",
            fontSize: "25px",
          }}
        >
          Đăng ký thành viên của Traveloka và trải nghiệm ưu đãi hấp dẫn!
        </h3>
        <h5
          style={{
            fontWeight: "bold",
            color: "white",
            paddingLeft: "20px",
            fontSize: "15px",
          }}
        >
          Thật nhanh và an toàn, hãy đăng ký ngay để được:
        </h5>
      </div>
      <div className="container-register">
        <div className="item-endow">
          <div className="endow-1">
            <img
              src="https://ik.imagekit.io/tvlk/image/imageResource/2018/07/03/1530614225701-39530c6a0da573b6c3e09f76039ca6d4.svg?tr=h-40,w-50"
              style={{ height: 100, width: 200 }}
            />
            <h5 style={{ fontWeight: "bold" }}>Nhận thưởng cho mỗi đặt chỗ</h5>
            <p>
              Tích điểm cho mỗi đặt vé máy bay và phòng khách sạn. Quy đổi để du
              lịch tiết kiệm hơn!{" "}
              <span>
                <a href="#" style={{ color: "blue" }}>
                  Tìm hiểu thêm
                </a>
              </span>
            </p>
          </div>
          <div className="endow-2">
            <img
              src="https://ik.imagekit.io/tvlk/image/imageResource/2018/07/03/1530614228123-9d71e6132b3ad5abe5fa845c3d98e809.svg?tr=h-65,q-75,w-65"
              style={{ height: 100, width: 200 }}
            />
            <h5 style={{ fontWeight: "bold" }}>
              Thanh toán không cần thẻ với travelokaPay
            </h5>
            <p>
              Lưu thông tin thẻ trong My Cards để thanh toán an toàn và thuận
              tiện cho lần sau
              <span>
                <a href="#" style={{ color: "blue" }}>
                  Tìm hiểu thêm
                </a>
              </span>
            </p>
          </div>
          <div className="endow-3">
            <img
              src="https://ik.imagekit.io/tvlk/image/imageResource/2018/07/03/1530614231070-0f61666d276f6892958421d263381c08.svg?tr=h-65,q-75,w-65"
              style={{ height: 100, width: 200 }}
            />
            <h5 style={{ fontWeight: "bold" }}>
              Tiện lợi ngay cả sau khi đặt chỗ
            </h5>
            <p>
              Xem vé điện tử và phiếu thanh toán khi không có kết nối mạng. Hoàn
              tiền hoặc đổi lịch dễ dàng khi bạn phải thay đổi kế hoạch.
              <span>
                <a href="#" style={{ color: "blue" }}>
                  Tìm hiểu thêm
                </a>
              </span>
            </p>
          </div>
          <div className="endow-4">
            <img
              src="https://ik.imagekit.io/tvlk/image/imageResource/2018/07/03/1530614234486-955449d244902e8387895898ad126485.svg?tr=h-65,q-75,w-65"
              style={{ height: 100, width: 200 }}
            />
            <h5 style={{ fontWeight: "bold" }}>Trải nghiệm đặt chỗ suôn sẻ</h5>
            <p>
              Tính năng Thông báo giá giúp bạn dễ dàng đặt vé vào thời điểm
              thích hợp nhất. Điền thông tin hành khách trong nháy mắt với
              Passenger Quick.
              <span>
                <a href="#" style={{ color: "blue" }}>
                  Tìm hiểu thêm
                </a>
              </span>
            </p>
          </div>
        </div>
        <div className="form-register">
          <h4
            style={{
              fontWeight: "bold",
              textAlign: "center",
              margin: "10px",
            }}
          >
            Đăng ký thành viên Trevalocal!
          </h4>
          <form className="register-form" onSubmit={handleSubmit}>
            <label>Email</label> <br />
            <input
              type="text"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />{" "}
            <br />
            <label>Số điện thoại</label> <br />
            <input
              type="text"
              className="input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />{" "}
            <br />
            <label>Tên đầy đủ</label> <br />
            <input
              type="text"
              className="input"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />{" "}
            <br />
            <label>Ngày/tháng/năm sinh</label> <br />
            <input
              type="date"
              className="input"
              value={dateOfBirth}
              onChange={(e) => setDateOfBrith(e.target.value)}
            />{" "}
            <br />
            <label style={{marginBottom : "5px"}}>Nam</label>
            <input
              type="radio"
              name="gender"
              className="radio"
              value="0"
              onChange={(e) => setGender(Number(e.target.value))}
              style={{    margin: " 0px 33px 2px 4px"}}
            />
            <label>Nữ</label>
            <input
              type="radio"
              name="gender"
              className="radio"
              value="1"
              onChange={(e) => setGender(Number(e.target.value))}
              style={{    margin: " 0px 33px 2px 4px"}}
            />
            <br />
            <label>Mật khẩu</label>
            <br />
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />{" "}
            <br />
            <label>Nhập lại mật khẩu</label>
            <br />
            <input
              type="password"
              className="input"
              value={passwordAgain}
              onChange={(e) => setPasswordAgain(e.target.value)}
            />
            <Button variant="primary" className="loginBtn" type="submit">
              Đăng Ký
            </Button>
          </form>
          <div
            style={{
              height: "50px",
              backgroundColor: "rgba(236,248,255,1.00)",
            }}
          >
            <p
              style={{
                textAlign: "center",
                marginTop: "20px",
                fontWeight: "600",
                padding: "12px",
              }}
            >
              Bạn đã đăng ký ?
              <a href="" style={{ color: "blue" }}>
                Đăng nhập
              </a>
            </p>
          </div>
          <div style={{ textAlign: "center", marginTop: "5px" }}>
            <p
              style={{
                fontWeight: "600",
                marginTop: "10px",
              }}
            >
              Bằng việc đăng ký, tôi đồng ý với các{" "}
              <a href="#" style={{ color: "blue" }}>
                {" "}
                Điều khoản & Điều kiện
              </a>{" "}
              và{" "}
              <a href="#" style={{ color: "blue" }}>
                Chính sách về quyền riêng tư{" "}
              </a>{" "}
              của Traveloka.
            </p>
            <div
              style={{
                marginTop: 50,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <Button
                style={{
                  backgroundColor: "rgb(59, 89, 152)",
                  fontWeight: "700",
                }}
              >
                <img
                  src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/5/5fd7436718bbc993968fec6018df4dff.svg"
                  width={20}
                  style={{ margin: "3px 5px" }}
                />
                Facebook
              </Button>
              <Button
                variant="primary"
                style={{ fontWeight: "700", height: "40px" }}
              >
                <img
                  src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/b/b10b6641f75433c59ee5c00ebc0a1994.svg"
                  width={20}
                  style={{ margin: "3px 5px" }}
                />
                Google
              </Button>
            </div>
          </div>
          <div style={{ marginTop: "25px" }} className="lock">
            <p
              style={{
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              <img src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/c/cecc53dcd35f87c240ab79221f168647.svg" />
              Bảo mật đa lớp bao gồm thông báo khi đăng nhập, mã xác thực và xác
              thực bằng vân tay.
              <a href="#" style={{ color: "blue" }}>
                Tìm hiểu thêm
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
