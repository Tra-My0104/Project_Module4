import "./Header.css";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { notification } from "antd";
import axios from "axios";

interface LoginResponse {
  data: {
    Status: number;
    Role: number;
  };
}

function Header() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (email === "" || password === "") {
      notification.error({
        message: "Thất bại",
        description: "Mời nhập đủ thông tin",
      });
      return;
    }
    try {
      const response = await axios.post<LoginResponse>(
        "http://localhost:8000/api/v1/users/login",
        { Email: email, PassWord: password }
      );
      console.log(response);

      if (response.status === 200) {
        const { Status, Role } = response.data.data;
        if (Status === 1) {
          notification.error({
            message: "Đăng nhập thất bại",
            description: "Tài khoản của bạn đã bị chặn",
          });
          setEmail("");
          setPassword("");
          setShowDropdown(false);
          navigate("/");
          return;
        } else if (Status === 0) {
          if (Role === 1) {
            setIsAdmin(true);
            localStorage.setItem("admin", "true");
            notification.success({
              message: "Thành công",
              description: "Đăng nhập thành công, Xin chào Admin",
            });
            setEmail("");
            setPassword("");
            setShowDropdown(false);
            navigate("/adminuser");
          } else {
            setIsAdmin(false);
            localStorage.setItem("user", JSON.stringify(response.data.data));
            notification.success({
              message: "Thành công",
              description: "Đăng nhập thành công",
            });
            const flagUser: User | null = JSON.parse(
              localStorage.getItem("user") || "null"
            );
            console.log(flagUser);
            setEmail("");
            setPassword("");
            setShowDropdown(false);
            navigate(`/information/${flagUser?.UserId}`);
          }
          return;
        }
      }
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        notification.error({
          message: "Thất bại",
          description: "Email hoặc mật khẩu không tồn tại",
        });
        return;
      } else if (error.response && error.response.status === 400) {
        notification.error({
          message: "Thất bại",
          description: "Email sai định dạng",
        });
        return;
      } else if (error.response && error.response.status === 401) {
        notification.error({
          message: "Thất bại",
          description: "Email hoặc mật khẩu không đúng",
        });
        return;
      } else {
        notification.error({
          message: "Thất bại",
          description: "Đăng nhập thất bại",
        });
        return;
      }
    }
  };

  type User = {
    UserId: number;
    Email: string;
    Phone: string;
    UserName: string;
    DateOfBirth: string;
    Gender: number;
    PassWord: string;
    PassWord_Again: string;
    Role: number;
    Status: number;
  };

  const flagUser: User | null = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  useEffect(() => {
    const isAdmin = localStorage.getItem("admin") === "true";
    setIsAdmin(isAdmin);
  }, []);

  const handleLogOut = () => {
    setIsAdmin(false);
    setShowDropdown(false);
    localStorage.removeItem("user"); // Xóa thông tin đăng nhập của người dùng khỏi local storage
    localStorage.removeItem("admin");
    navigate("/"); // Chuyển hướng về trang chủ
  };

  return (
    <div className="containerNavHeader">
      <div className="color-line"></div>
      <div className="navbar_item">
        <div className="navbarHeader">
          <div>
            <img
              src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/5/5391d86e5f4c5e92de04ef4461a09259.svg"
              style={{
                marginRight: "10px",
              }}
            />
            <Link to="/">
              <img src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/9/97f3e7a54e9c6987283b78e016664776.svg" />
            </Link>
          </div>
          <Dropdown>
            <Dropdown.Toggle
              className="btnHeader"
              style={{ backgroundColor: "#fff", color: "#333" }}
            >
              <i
                className="fa-solid fa-download"
                style={{ color: "#4ebcf4", marginRight: "5px" }}
              ></i>
              Tải ứng dụng
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <div className="textHeader">
            <p>
              <img
                src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/a/a5b77c2fab5e454e3271588503cd94d9.svg"
                style={{ marginRight: "5px" }}
              />
              Hợp tác với chúng tôi
            </p>
          </div>
          <div className="textHeader">
            <p>
              <img
                src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/6/687f7095ed36a75c21cc52726d55b2c5.svg"
                style={{ marginRight: "5px" }}
              />
              Đã lưu
            </p>
          </div>
          <div className="textHeader">
            <p>
              <img
                src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/8/8c9954122d8006592fbcbd4a82ac994c.svg"
                style={{ marginRight: "5px" }}
              />
              Đặt chỗ của tôi
            </p>
          </div>

          <Dropdown>
            <Dropdown.Toggle
              className="btnHeader"
              style={{ backgroundColor: "#fff", color: "#333" }}
            >
              <img
                src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/a/a3478fc6e57b8681609c1458bd50cbb9.svg"
                alt=""
              />
              VND
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {isAdmin ? (
            <div>
              <Dropdown>
                <Dropdown.Toggle
                  className="btnHeader"
                  style={{ backgroundColor: "#fff", color: "#333" }}
                >
                  <img
                    src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/8/8cec58721410d02b594f877b8abe9503.svg"
                    style={{
                      backgroundColor: "rgb(173, 173, 173)",
                      borderRadius: "50%",
                      marginRight: "5px",
                    }}
                  />
                  Xin chào admin
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <button className="log-out" onClick={handleLogOut}>
                    <i className="fa-solid fa-power-off"></i> Đăng xuất
                  </button>
                  <Link to="/adminuser">
                    <button className="edit-infor">
                      <i
                        className="fa-solid fa-user"
                        style={{
                          color: "#0084ff",
                          marginRight: "14px",
                          marginLeft: "-8px",
                        }}
                      ></i>
                      Admin
                    </button>
                  </Link>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          ) : (
            <Dropdown>
              {flagUser ? (
                <>
                  <Dropdown>
                    <Dropdown.Toggle
                      className="btnHeader"
                      style={{ backgroundColor: "#fff", color: "#333" }}
                    >
                      <img
                        src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/8/8cec58721410d02b594f877b8abe9503.svg"
                        style={{
                          backgroundColor: "rgb(173, 173, 173)",
                          borderRadius: "50%",
                          marginRight: "5px",
                        }}
                      />
                      Xin chào {flagUser.UserName}
                    </Dropdown.Toggle>

                    <Dropdown.Menu
                      style={{ maxWidth: "400px", minWidth: "226px" }}
                    >
                      <button className="log-out" onClick={handleLogOut}>
                        <i className="fa-solid fa-power-off"></i> Đăng xuất
                      </button>
                      <Link to={`/information/${flagUser.UserId}`}>
                        <button className="edit-infor">
                          <i
                            className="fa-solid fa-gear"
                            style={{
                              color: "#0084ff",
                              marginRight: "5px",
                              marginLeft: "-8px",
                            }}
                          ></i>
                          Chỉnh sửa hồ sơ
                        </button>
                      </Link>
                      <Link to={`/bookingroom/${flagUser.UserId}`}>
                        <button className="edit-infor">
                          <i
                            className="fa-solid fa-gear"
                            style={{
                              color: "#0084ff",
                              marginRight: "5px",
                              marginLeft: "-8px",
                            }}
                          ></i>
                          Thông tin phòng đã đặt
                        </button>
                      </Link>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              ) : (
                <>
                  <Dropdown.Toggle
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="btnHeader"
                    style={{ backgroundColor: "#fff", color: "#333" }}
                  >
                    <img
                      src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/8/8cec58721410d02b594f877b8abe9503.svg"
                      style={{
                        backgroundColor: "rgb(173, 173, 173)",
                        borderRadius: "50%",
                        marginRight: "5px",
                      }}
                    />
                    Đăng nhập
                  </Dropdown.Toggle>
                </>
              )}
              {showDropdown ? (
                <>
                  <div id="toggle-form" style={{ width: 300, height: 430 }}>
                    <p
                      style={{
                        fontWeight: "bold",
                        textAlign: "center",
                        fontSize: "larger",
                      }}
                    >
                      Đăng nhập tài khoản
                    </p>
                    <form className="login" onSubmit={handleSubmit}>
                      <label>Email hoặc số di động</label> <br />
                      <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />{" "}
                      <br />
                      <label>Mật khẩu</label>
                      <span>
                        <a href="#" style={{ color: "blue" }}>
                          Quên mật khẩu
                        </a>
                      </span>
                      <br />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button className="btn-login" type="submit">
                        Đăng nhập
                      </button>
                      <p style={{ marginTop: "18px" }}>
                        Bạn chưa có tài khoản?
                        <a
                          href="/register"
                          style={{ marginLeft: "10px", color: "blue" }}
                        >
                          Đăng ký
                        </a>
                      </p>
                    </form>
                    <p style={{ textAlign: "center" }}>Hoặc đăng nhập bằng:</p>
                    <div className="btn-fb-gg">
                      <Button
                        style={{
                          backgroundColor: "rgb(59, 89, 152)",
                          fontWeight: "700",
                          height: "40px",
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
                </>
              ) : (
                <></>
              )}
            </Dropdown>
          )}
          <Link to="/register">
            <Button variant="primary" className="registerBtn">
              Đăng ký
            </Button>
          </Link>
        </div>
        <div className="dropdown-navbar">
          <Dropdown>
            <Dropdown.Toggle
              className="btnHeader"
              style={{ backgroundColor: "#fff", color: "#333" }}
            >
              Vận chuyển
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">
                <img src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/d/d60b9f5df56bbe964a72ee31d064f07b.svg" />{" "}
                Vé máy bay
              </Dropdown.Item>
              <Dropdown.Item href="#/action-2">
                <img src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/4/4398e3dcb4519118ee600b7e7dbd284a.svg" />{" "}
                Comobo tiết kiệm
              </Dropdown.Item>
              <Dropdown.Item href="#/action-3">
                <img src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/8/81512b90dde7bb19029bc60a9394ac3c.svg" />{" "}
                Đưa đón sân bay
              </Dropdown.Item>
              <Dropdown.Item href="#/action-3">
                <img src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/7/733ae65fa004115936cf838e7bc1d588.svg" />{" "}
                Cho thuê xe
              </Dropdown.Item>
              <Dropdown.Item href="#/action-3">
                <img src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/e/e854273b455eb4426be10b778db6846b.svg" />{" "}
                Bus & Shuttle
              </Dropdown.Item>
              <Dropdown.Item href="#/action-3">
                <img
                  src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/a/ab24015021953d26fba1b97a32464c8e.svg"
                  style={{ marginLeft: "-6px" }}
                />{" "}
                Tình trạng chuyến bay
              </Dropdown.Item>
              <Dropdown.Item href="#/action-3">
                <img
                  src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/6/656d9f6953547ba93cf15954d7c6e220.svg"
                  style={{ marginLeft: "-5px" }}
                />{" "}
                Thông báo giá vé
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown>
            <Dropdown.Toggle
              className="btnHeader"
              style={{ backgroundColor: "#fff", color: "#333" }}
            >
              Chỗ ở
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">
                <img src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/d/d27f082b7bccc8a5eff371779e020b83.svg" />{" "}
                Khách sạn
              </Dropdown.Item>
              <Dropdown.Item href="#/action-2">
                <img src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/4/4398e3dcb4519118ee600b7e7dbd284a.svg" />{" "}
                Combo tiết kiệm
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown>
            <Dropdown.Toggle
              className="btnHeader"
              style={{ backgroundColor: "#fff", color: "#333" }}
            >
              Hoạt động và giải trí
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">
                <img
                  src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/b/b52787f0d5e80f11898ff75143ba3381.svg"
                  style={{ marginRight: "3px" }}
                />{" "}
                Xperience
              </Dropdown.Item>
              <Dropdown.Item href="#/action-2">
                <i
                  className="fa-solid fa-star"
                  style={{ color: "#ffa21f", marginRight: "3px" }}
                ></i>
                Điểm tham quan
              </Dropdown.Item>
              <Dropdown.Item href="#/action-3">
                <i
                  className="fa-solid fa-person-walking-luggage"
                  style={{ color: "#ff8f33", marginRight: "3px" }}
                ></i>
                Tour
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown>
            <Dropdown.Toggle
              className="btnHeader"
              style={{ backgroundColor: "#fff", color: "#333" }}
            >
              Sản phẩm bổ sung
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">
                <img
                  src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/c/c00ab1f427ddf2519a3e080d9d9c1436.svg"
                  style={{ marginRight: "3px" }}
                />
                Điểm thưởng của tôi
              </Dropdown.Item>
              <Dropdown.Item href="#/action-2">
                <img
                  src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/5/59275d7daf01b546a3f807623ecb6239.svg"
                  style={{ marginRight: "3px" }}
                />{" "}
                Phiếu quà tặng
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
export default Header;
