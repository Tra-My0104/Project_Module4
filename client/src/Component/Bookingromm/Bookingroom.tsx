import { useParams } from "react-router-dom";
import "./Bookingroom.css";
import axios from "axios";
import { useEffect, useState } from "react";

const Bookingroom = () => {
  const { id } = useParams();
  const getSearch = localStorage.getItem("search");
  const resultSearch = getSearch ? JSON.parse(getSearch) : null;

  console.log(resultSearch);

  const [inforBooking, setInforBooking] = useState<InforBooking[]>([]);

  interface InforBooking {
    nameRoom: string;
    rooms_id: number;
    check_in_date: string;
    number_night: string;
    total_price: string;
    location: string;
    booking_room_id: number;
    check_out_date : string
  }

  
  const loadInfror = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/booking/${id}`
      );
      setInforBooking(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(inforBooking);

  useEffect(() => {
    loadInfror();
  }, []);

  const handleDelete = async (id: number , room_id : number) => {
    try {
      let text = "Bạn có muốn hủy phòng không";
      if (confirm(text) == true) {
        await axios.delete(`http://localhost:8000/api/v1/booking/${id}`);
        await axios.patch(`http://localhost:8000/api/v1/room/${room_id}`);
        loadInfror();
      } else {
        text = "You canceled!";
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container-rooms-booking">
        <h1 style={{ textAlign: "center" }}>Thông tin đặt phòng của tôi</h1>
        <table className="table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên khách sạn</th>
              <th>Địa chỉ khách sạn</th>
              <th>Ngày đặt phòng</th>
              <th>Ngày trả phòng</th>
              <th>Số đêm</th>
              <th>Giá tiền</th>
              <th>Số người </th>
              <th>Hủy lịch </th>
            </tr>
          </thead>
          <tbody>
            {inforBooking?.map((infor, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{infor.nameRoom}</td>
                <td>{infor.location}</td>
                <td>{infor.check_in_date}</td>
                <td>{infor.check_out_date}</td>
                <td>{infor.number_night} đêm</td>
                <td>{infor.total_price.toLocaleString()} VND</td>
                <td>{resultSearch.person}</td>
                <td>
                  <button
                    className="btnroom btn-danger"
                    onClick={() => handleDelete(infor.booking_room_id,infor.rooms_id)}
                  >
                    Hủy phòng
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Bookingroom;
