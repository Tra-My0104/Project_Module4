import { Input } from "antd";
import { useEffect, useState } from "react";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";

import "./Bookinginformation.css";
import axios from "axios";
import { useParams } from "react-router-dom";
const Bookinginformation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const getUser = localStorage.getItem("user");
  const userInfor = getUser ? JSON.parse(getUser) : null;
  const getSearch = localStorage.getItem("search");
  const searchInfor = getSearch ? JSON.parse(getSearch) : null;

  const [bookingInfor, setBookingInfor] = useState<BookInfor | null>(null);

  interface BookInfor {
    hotel_id: number;
    rooms_id :number;
    imgRoom: string;
    nameRoom: string;
    price_room: number;
    location: string;
    availability: string;
    direction: string;
    capacity: string;
    description: string;
    floor_area: string;
    amenities: string;
  }

  const loadRoom = async () => {
    const response = await axios.get(`http://localhost:8000/api/v1/room/${id}`);
    setBookingInfor(response.data.data[0]);
  };

  useEffect(() => {
    loadRoom();
  }, []);


  const totalPrice =bookingInfor?.price_room && searchInfor?.numberNight ? bookingInfor.price_room * searchInfor.numberNight : 0;

  const bookingData = {
    total_price : totalPrice,
    check_in_date : searchInfor.dateForm,
    number_night : searchInfor.numberNight,
    UserId : userInfor.UserId,
    rooms_id : bookingInfor?.rooms_id,
    check_out_date : searchInfor.checkoutDate,
  }

  
  const handlePay = async() => {
     try {
       await axios.post("http://localhost:8000/api/v1/booking" , bookingData)
       notification.success({
        message: "Thành công",
        description: "Thanh toán thành công",
      });
      await axios.put(`http://localhost:8000/api/v1/room/${bookingInfor?.rooms_id}`)
      navigate(`/bookingroom/${userInfor.UserId}`);
     } catch (error) {
       console.log(error);
     }
  }
  
  return (
    <>
      <h2 style={{ fontWeight: "500", textAlign: "center" }}>
        Điền thông tin đặt phòng
      </h2>
      <p style={{ fontWeight: "500", textAlign: "center", color: "gray" }}>
        Hãy chắc chắn rằng tất cả thông tin trên trang này là chính xác trước
        khi tiến hành thanh toán.
      </p>
      <div className="container-infor">
        <div className="formInfor">
          <h5>Chi tiết liên hệ (cho Vé điện tử/Phiếu xác nhận)</h5>
          <div className="infor">
          <label>Họ và tên</label>
          <Input placeholder="Basic usage" value={userInfor?.UserName} style={{marginBottom : 40}}/>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <label>Số điện thoại</label> <br />
              <Input type="number" value={userInfor?.Phone} /> <br />
            </div>
            <div>
              <label>Email</label> <br />
              <Input type="text" value={userInfor?.Email} /> <br />
              <p style={{ fontWeight: "500", color: "gray" }}>
                VD: email@example.com
              </p>
            </div>
          </div>
          </div>
          <h5>Chi tiết giá</h5>
          <div className="formMoney">
            <h5>
              Thành tiền : <span>{totalPrice.toLocaleString()} VND</span>
            </h5>
            <p style={{ fontWeight: "500", color: "#0194F3" }}>
              Thuế và phí là các khoản được Traveloka chuyển trả cho khách sạn.
              Mọi thắc mắc về thuế và hóa đơn, vui lòng tham khảo Điều khoản và
              Điều kiện của Traveloka để được giải đáp
            </p>
            <p>
              {bookingInfor?.nameRoom} ({searchInfor.numberNight} đêm)
            </p>
          </div>
          <button style={{ margin: 10 , marginBottom : 30}} className="btn btn-primary" onClick={handlePay}>
            Thanh toán
          </button>
        </div>
        <div className="inforHotel">
          <h5>{bookingInfor?.nameRoom}</h5>
          <hr />
          <p>Ngày nhận phòng : <span>{searchInfor.dateForm}</span></p>
          <p>Số đêm: <span>{searchInfor.numberNight} đêm</span></p>
          <p>Giá phòng một đêm: <span style={{color : "red"}}>{bookingInfor?.price_room.toLocaleString()} VND</span></p>
          <p>Số người : <span>{searchInfor.person}</span></p>
          <p>Trạng thái phòng : <span>Trống</span></p>
          <img
            src={bookingInfor?.imgRoom}
            style={{ height: 150, width: 150 }}
          />
        </div>
      </div>
    </>
  );
};

export default Bookinginformation;
