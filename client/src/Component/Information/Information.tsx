import "./Information.css";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { notification } from "antd";
import { Tabs } from "antd";
import type { TabsProps } from "antd";

const Information = () => {
  const flagUsers = localStorage.getItem("user");
  const jsonUser = flagUsers ? JSON.parse(flagUsers) : null;
  const [name, setName] = useState<string | undefined>("");
  const [gender, setGender] = useState<string | undefined>("");
  const [dateOfBirth, setDateOfBrith] = useState<string | undefined>("");
  const [passwordOld , setPasswordOld] = useState<string>("");
  const [newPassword , setNewPassword] = useState<string>("");
  const [newPasswordAgain , setNewPasswordAgain] = useState<string>("");
  const { id } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    if (id != jsonUser?.UserId) {
      window.location.href = "/";
    }
  }, [id]);

  interface UserInfor {
    UserId: number;
    UserName: string;
    DateOfBirth: string;
    Gender: number;
    Phone: number;
    Email: string;
  }

  const [user, setUser] = useState<UserInfor | null>(null);
  const loadUsers = async () => {
    const response = await axios.get(
      `http://localhost:8000/api/v1/users/${jsonUser.UserId}`
    );
    // console.log(response.data.data[0]);
    setUser(response.data.data[0]);
    setName(response.data.data[0]?.UserName);
    setGender(response.data.data[0]?.Gender);
    setDateOfBrith(response.data.data[0]?.DateOfBirth);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleChangeGender = (e: any) => {
    setGender(e.target.value);
  };

  const userUpdate = {
    UserName: name,
    DateOfBirth: dateOfBirth,
    Gender: gender,
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/v1/users/edit_User/${jsonUser.UserId}`,
        userUpdate
      );
      if (response.status === 200) {
        notification.success({
          message: "Cập nhật thông tin thành công",
        });
      }
      const updateJsonUser = { ...jsonUser, ...userUpdate };
      localStorage.setItem("flagUser", JSON.stringify(updateJsonUser));
      loadUsers();
      navigate("/")
    } catch (error) {
      console.error(error);
    }
  };

  const handlePasswordOld = (e : React.ChangeEvent<HTMLInputElement>) => {
    setPasswordOld(e.target.value)
  }

  const handleNewPassword = (e : React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value)
  }

  const handleNewPasswordAgain = (e : React.ChangeEvent<HTMLInputElement>) => {
    setNewPasswordAgain(e.target.value)
  }

  const handleSaveChange = async(id : number ) => {
    const change = {
      PassWord: passwordOld,
      newPassWord :newPassword
    }
    
    if(passwordOld === "" || newPassword === "" || newPasswordAgain === ""){
      notification.error({
        message: "Bạn chưa nhập mật khẩu để thay đổi",
      });
      return;
    }

    if(newPassword != newPasswordAgain){
      notification.error({
        message: "Mật khẩu nhập lại không đúng",
      });
      return;
    }
    const response = await axios.patch(`http://localhost:8000/api/v1/users/edit_passWord/${id}` , change)
    if (response.data.status === 401) {
      notification.error({
        message: "Sai mật khẩu",
      });
    }
    if (response.data.status === 200) {
      notification.success({
        message: "Đổi mật khẩu thành công",
      });
    }
    setNewPassword("")
    setNewPasswordAgain("")
    setPasswordOld("")
    navigate("/")
  }

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Thông tin tài khoản`,
      children: (
        <>
          <div className="itemTop">
            <h4>Dữ liệu cá nhân</h4>
            <hr />
            <p>Tên đầy đủ</p>
            <Form.Control
              type="text"
              placeholder="Normal text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div className="item1">
              <div>
                <p>
                  Giới tính :
                  {user?.Gender === 1 ? (
                    <>
                      <span>Nữ</span>
                    </>
                  ) : (
                    <>
                      <span>Nam</span>
                    </>
                  )}
                </p>
                <Form.Select value={gender} onChange={handleChangeGender}>
                  <option value="">Lựa chọn</option>
                  <option value="0">Nam</option>
                  <option value="1">Nữ</option>
                </Form.Select>
              </div>
              <div>
                <p>Ngày sinh</p>
                <input
                  style={{
                    outline: "none",
                    width: "160px",
                    height: "30px",
                    borderRadius: "5px",
                    borderColor: "#b6b6b6",
                  }}
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBrith(e.target.value)}
                />
              </div>
            </div>
            <div className="btn-infor">
              <Link  to = "/"><button>Hủy</button></Link>
              <button onClick={() => handleSave()}>Lưu</button>
            </div>
          </div>
          <div className="itemMiddle">
            <h4>Email</h4>
            <p>
              chỉ có thể thêm tối đa 3 email
              <button
                style={{
                  marginLeft: "420px",
                  height: "40px",
                  width: "130px",
                  borderRadius: "10px",
                  backgroundColor: "white",
                }}
              >
                + Thêm mới
              </button>
            </p>
            <hr />
            <p style={{ fontWeight: "600", fontSize: "large" }}>
              1.{user?.Email}
            </p>
          </div>
          <div className="itemBottom">
            <div>
              <h4>Số di động</h4>
              <p>chỉ có thể thêm tối đa 3 số điện thoại</p>
              <p style={{ fontWeight: "500" }}>{user?.Phone}</p>
            </div>
            <button
              style={{
                display: "inline-block",
                marginLeft: "363px",
                height: "40px",
                width: "130px",
                borderRadius: "10px",
                backgroundColor: "white",
              }}
            >
              + Thêm mới
            </button>
          </div>
        </>
      ),
    },
    {
      key: "2",
      label: `Mật khẩu & bảo mật`,
      children: <>
      <div className="itemTop">
        <h4>Đổi mật khẩu</h4>
            <hr />
            <p>Mật khẩu cũ</p>
            <Form.Control
              type="password"
              value={passwordOld}
              onChange={handlePasswordOld}
            />
            <p>Mật khẩu mới</p>
            <Form.Control
              type="password"
              value={newPassword}
              onChange={handleNewPassword}
            />
            <p>Nhập lại mật khẩu</p>
            <Form.Control
              type="password"
              value={newPasswordAgain}
              onChange={handleNewPasswordAgain}
            />
            <div className="btn-infor">
              <Link to = "/"><button>Hủy</button></Link>
              <button onClick={() => handleSaveChange(jsonUser.UserId)}>Lưu</button>
            </div>
          </div>
      </>,
    },
    {
      key: "3",
      label: `Bản tin & Tin khuyến mãi`,
      children: <>
        <h1>Xin chào</h1>
      </>,
    },
  ];

  return (
    <>
      <div className="containerInfor">
        <div className="itemLeft">
          <div className="inforName">
            <img
              style={{ borderRadius: "50%" }}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwq-QgDNZh6feEWndoETeXuE1_TebPF77uhBIRtymuh5ke5E0iq3RiUqkc-R335fN3aVU&usqp=CAU"
              height={100}
              width={100}
            />
            <div>
              <p
                style={{
                  fontWeight: "600",
                  fontSize: "x-larger",
                  marginTop: "16px",
                }}
              >
                {name}
              </p>
              <p>{user?.Email}</p>
            </div>
          </div>
          <div className="listInfor">
            <ul>
              <li>
                <img src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/8/825f4dbdd091e72c803ff3a24ca58c26.svg" />{" "}
                Điểm thưởng của tôi
              </li>
              <li>
                <img src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/f/f883d30731f5559aadffe0c6060fdded.svg" />{" "}
                Thẻ của tôi
              </li>
              <hr />
              <li>
                <img src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/8/8c9954122d8006592fbcbd4a82ac994c.svg" />{" "}
                Đặt chỗ của tôi
              </li>
              <li>
                <img src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/f/fc823715dd8dd7b269a5526f8651d058.svg" />{" "}
                Danh sách giao dịch
              </li>
              <li>
                <img src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/e/e018f881345b8043e52ad61597ff9831.svg" />{" "}
                Thông báo giá vé máy bay
              </li>
              <li>
                <img src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/3/306886d7684a4b93b41b2726dabb61c7.svg" />{" "}
                Passenger Quick Pick
              </li>
              <li>
                <img src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/8/8c163aea0d70a7f11c9b2963b3fd0534.svg" />{" "}
                Khuyến mãi
              </li>
              <hr />
              <li>
                <img src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/f/f1e5ba7cea40df07a49fbd2cadb81dd0.svg" />{" "}
                Tài khoản
              </li>
              <li>
                <img src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/3/336593031502efcd0f97e6b35e7703a1.svg" />{" "}
                Đang đăng nhập
              </li>
            </ul>
          </div>
        </div>
        <div className="itemRight">
          <h3 style={{ fontWeight: "600" }}>Cài đặt</h3>
          <div>
            <Tabs defaultActiveKey="1" items={items} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Information;
