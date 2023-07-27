import "./Adminuser.css";
import Headeradmin from "../Header-admin/Headeradmin";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const Adminuser = () => {
  interface User {
    UserId: number;
    UserName: string;
    DateOfBirth: string;
    Gender: number;
    Phone: string;
    Email: string;
    Role: number;
    Status: number;
  }

  const [adminUser, setAdminUser] = useState<User[]>([]);
  const [show, setShow] = useState(false);
  const handleClose = (): void => setShow(false);

  const [editUser, setEditUser] = useState<User>({
    UserId: 0,
    UserName: "",
    DateOfBirth: "",
    Gender: 0,
    Phone: "",
    Email: "",
    Role: 0,
    Status: 0,
  });

  console.log('id', editUser.UserId);
  

  const loadUsers = async () => {
    await axios
      .get("http://localhost:8000/api/v1/users")
      .then((res) => {
        setAdminUser(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    loadUsers();
  }, []);


  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/users/deleteUser/${id}`);
      setAdminUser(prevUsers => prevUsers.filter(user => user.UserId !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleShow = (id: number) => {
    const findUser = adminUser.find((e) => e.UserId === id);
    if (findUser) {
      setEditUser(findUser);
      setShow(true);
    }
  };



  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8000/api/v1/users/update_User/${editUser.UserId}`, editUser);
      setAdminUser(prevUsers => prevUsers.map(user => {
        if (user.UserId === editUser.UserId) {
          return editUser;
        }
        return user;
      }));
      setShow(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container-adminUser">
        <Headeradmin></Headeradmin>
        <Table className="table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên người dùng</th>
              <th>Điện thoại</th>
              <th>Email</th>
              <th>Ngày sinh</th>
              <th>Giới tính</th>
              <th>Quyền</th>
              <th>Trạng thái</th>
              <th colSpan={2}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {adminUser?.map((user: any, index: number) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.UserName}</td>
                <td>{user.Phone}</td>
                <td>{user.Email}</td>
                <td>{user.DateOfBirth}</td>
                <td>{user.Gender === 1 ? <>Nữ</> : <>Nam</>}</td>
                <td>{user.Role === 1 ? <>admin</> : <>user</>}</td>
                <td>
                  {user.Status === 1 ? (
                    <>Ngừng hoạt động</>
                  ) : (
                    <>Đang hoạt động</>
                  )}
                </td>
                <td>
                  <button
                    style={{ border: "none", backgroundColor: "transparent" }}
                    onClick={() => handleDelete(user.UserId)}
                  >
                    <i
                      className="fa-solid fa-trash fa-lg"
                      style={{ color: "#ff0000" }}
                    ></i>
                  </button>
                </td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => handleShow(user.UserId)}
                  >
                    Sửa
                  </Button>
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Sửa thông tin</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <label>Tên</label> <br />
                      <input
                        type="text"
                        className="input"
                        value={editUser.UserName}
                        onChange={(e) =>
                          setEditUser({ ...editUser, UserName: e.target.value })
                        }
                      />
                      <br />
                      <label>Số điện thoại</label> <br />
                      <input
                        type="text"
                        className="input"
                        value={editUser.Phone}
                        onChange={(e) =>
                          setEditUser({
                            ...editUser,
                            Phone: e.target.value,
                          })
                        }
                      />
                      <br />
                      <label>Email</label> <br />
                      <input
                        type="text"
                        className="input"
                        value={editUser.Email}
                        onChange={(e) =>
                          setEditUser({ ...editUser, Email: e.target.value })
                        }
                      />
                      <br />
                      <br />
                      {editUser.Role === 0 ? (
                        <>
                          <label>Roles</label> <br />
                          <select
                            name="Roles"
                            value={editUser.Role}
                            onChange={(e) =>
                              setEditUser({
                                ...editUser,
                                Role: +e.target.value,
                              })
                            }
                          >
                            <option value="1">Admin</option>
                            <option value="0">User</option>
                          </select>
                          <br />
                        </>
                      ) : (
                        <>
                          <label>Role</label> <br />
                          <select
                            name="Roles"
                            value={editUser.Role}
                            onChange={(e) =>
                              setEditUser({
                                ...editUser,
                                Role: +e.target.value,
                              })
                            }
                          >
                            <option value="0">User</option>
                            <option value="1">Admin</option>
                          </select>
                          <br />
                        </>
                      )}
                      {editUser.Status === 0 ? (
                        <>
                          <label>Status</label> <br />
                          <select
                            name="Status"
                            value={editUser.Status}
                            onChange={(e) =>
                              setEditUser({
                                ...editUser,
                                Status: +e.target.value,
                              })
                            }
                          >
                            <option value="0">Khóa</option>
                            <option value="1">Mở khóa</option>
                          </select>
                        </>
                      ) : (
                        <>
                          <label>Status</label> <br />
                          <select
                            name="Status"
                            value={editUser.Status}
                            onChange={(e) =>
                              setEditUser({
                                ...editUser,
                                Status: +e.target.value,
                              })
                            }
                          >
                            <option value="0">Khóa</option>
                            <option value="1">Mở khóa</option>
                          </select>
                        </>
                      )}
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="primary" onClick={handleSave}>
                        Lưu thông tin
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default Adminuser;
