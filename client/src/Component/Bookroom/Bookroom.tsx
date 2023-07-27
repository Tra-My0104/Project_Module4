import "./Bookroom.css";
import { Rate } from "antd";
import { Input } from "antd";
import { Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Bookroom = () => {
  const { Search } = Input;
  const [searchValue, setSearchValue] = useState<string>("");
  const [hasSearchResults, setHasSearchResults] = useState(false);

  const searchResultString = localStorage.getItem("search");
  let searchResult: any;

  if (searchResultString !== null) {
    searchResult = JSON.parse(searchResultString);
  }

  interface HotelInfor {
    hotel_id: number;
    imgRoom: string;
    nameRoom: string;
    price: string;
    location: string;
    availability: string;
  }

  const [hotel, setHotel] = useState<HotelInfor[]>([]);
  const location = searchResult.location
  
  const loadHotel = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/hotel/get/location?location=${searchResult?.location}`);
      setHotel(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/api/v1/hotel/search?searchValue=${searchValue}`, {location});
      if (response.data.data.length === 0) {
        setHasSearchResults(true);
      } else {
        setHotel(response.data.data);
        setHasSearchResults(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (searchValue) {
      handleSearch();
    }
  }, [searchValue]);

  useEffect(() => {
    loadHotel();
  }, []);

  return (
    <>
      <div>
        <img
          src="https://ik.imagekit.io/tvlk/image/imageResource/2023/03/06/1678075768488-07192977e5ad559fd16e2d67086a8a6b.png?tr=q-75"
          style={{ height: "300px", width: "100%", marginTop: "2px" }}
        />
      </div>
      <div className="containerBook">
        <div
          style={{ display: "flex", justifyContent: "center", gap: "100px" }}
        >
          <div>
            <h4
              style={{
                fontWeight: "bold",
                marginRight: "550px",
                marginTop: "15px",
              }}
            >
              Kết quả tìm kiếm của bạn
            </h4>
            <p style={{ color: "gray", fontWeight: "bold" }}>
              Ngày đặt : {searchResult.dateForm} - {searchResult.numberNight}{" "}
              đêm - {searchResult.location}
            </p>
          </div>
          <button
            style={{
              color: "white",
              fontWeight: "600",
              fontSize: "larger",
              height: "40px",
              backgroundColor: "rgb(37 180 252)",
              border: "none",
              width: "100px",
              borderRadius: "5px",
              marginTop: "15px",
            }}
          >
            Thay đổi
          </button>
        </div>
        <hr
          style={{ width: "80%", margin: "5px auto", marginBottom: "20px" }}
        />
        <div className="containerItem">
          <div className="item-right">
            <img
              src="https://cdn.mediamart.vn/images/news/hung-dn-cach-them-to-da-dim-len-google-maps-cc-d-dang_ecafe72e.jpg"
              style={{ height: "163px", width: "300px", borderRadius: "5px" }}
            />
            <div className="sort-results">
              <h5 style={{ fontWeight: "bold" }}>Sắp xếp kết quả</h5>
              <p style={{ color: "gray", fontWeight: "bold" }}>
                sắp xếp kết quả theo lựa chọn
              </p>
              <hr />
              <input type="radio" />
              <label>Giá cao nhất</label> <br />
              <input type="radio" />
              <label>Giá thấp nhất</label> <br />
              <input type="radio" />
              <label>Điểm đánh giá</label> <br />
              <input type="radio" />
              <label>Độ phổ biến</label>
            </div>
            <div className="containerFilter">
              <h5 style={{ fontWeight: "bold" }}>Lọc kết quả</h5>
              <p style={{ color: "gray", fontWeight: "bold" }}>
                Hiển thị kết quả phân loại theo :
              </p>
              <hr />
              <h5 style={{ fontWeight: "bold" }}>Chính sách đặt phòng</h5>
              <input type="radio" />
              <label>Miễn phí hủy phòng</label> <br />
              <hr />
              <h5 style={{ fontWeight: "bold" }}>Khoảng giá phòng mỗi đêm</h5>
              <p
                style={{
                  color: "gray",
                  fontWeight: "500",
                  marginTop: "11px",
                  marginLeft: "-3px",
                  border: "1px solid gray",
                  borderRadius: "40px",
                  paddingLeft: "28px",
                }}
              >
                0 VND---------24.000.000 VND
              </p>
              <input
                type="range"
                style={{
                  width: "100%",
                  height: "10px",
                  borderRadius: "5px",
                  background: "linear-gradient(to right, #00bfff, #00bfff)",
                  appearance: "none",
                }}
              />
              <hr />
              <h5 style={{ fontWeight: "bold" }}>Hạng sao</h5>
              <Rate allowHalf defaultValue={1} /> <br />
              <Rate allowHalf defaultValue={2} /> <br />
              <Rate allowHalf defaultValue={3} /> <br />
              <Rate allowHalf defaultValue={4} /> <br />
              <Rate allowHalf defaultValue={5} />
              <hr />
              <h5 style={{ fontWeight: "bold" }}>Tiện nghi</h5>
              <input type="radio" />
              <label>Wifi</label> <br />
              <input type="radio" />
              <label>Hồ bơi</label> <br />
              <input type="radio" />
              <label>Chỗ đậu xe</label> <br />
              <input type="radio" />
              <label>Nhà hàng</label> <br />
              <input type="radio" />
              <label>Lễ tân 24h</label> <br />
              <input type="radio" />
              <label>Thang máy</label> <br />
              <input type="radio" />
              <label>Lối dành cho xe lăn</label> <br />
              <input type="radio" />
              <label>Trung tâm thể dục</label> <br />
              <input type="radio" />
              <label>Phòng họp</label> <br />
              <input type="radio" />
              <label>Đưa đón sân bay</label> <br />
              <hr />
              <h5 style={{ fontWeight: "bold" }}>Ưu tiên nơi nghỉ</h5>
              <input type="radio" />
              <label>All</label> <br />
              <input type="radio" />
              <label>SALE 7.7</label> <br />
              <input type="radio" />
              <label>Thanh toán khi nhận phòng</label> <br />
              <input type="radio" />
              <label>Extra Benefit</label> <br />
              <input type="radio" />
              <label>Phù hợp với gia đình</label> <br />
              <input type="radio" />
              <label>Biệt thự và căn hộ</label> <br />
              <input type="radio" />
              <label>Nhà nghỉ</label> <br />
              <input type="radio" />
              <label>Ưu đãi đặc biệt</label> <br />
              <hr />
              <h5 style={{ fontWeight: "bold" }}>Loại hình lưu trú</h5>
              <input type="radio" />
              <label>Nhà khách gia đình</label> <br />
              <input type="radio" />
              <label>Nhà nghỉ</label> <br />
              <input type="radio" />
              <label>Nhà riêng</label> <br />
              <input type="radio" />
              <label>Khác</label> <br />
              <input type="radio" />
              <label>Nhà nghỉ Homestay</label> <br />
              <input type="radio" />
              <label>Căn hộ</label> <br />
              <input type="radio" />
              <label>Khu nghỉ dưỡng</label> <br />
              <input type="radio" />
              <label>Khách sạn</label> <br />
              <input type="radio" />
              <label>Biệt thự</label>
            </div>
          </div>
          <div className="item-left">
            <div style={{ display: "flex" }}>
              <img
                src="https://s3-ap-southeast-1.amazonaws.com/cntres-assets-ap-southeast-1-250226768838-cf675839782fd369/imageResource/2016/08/30/1472548515109-8d4c35f01f14da05a8e3d5260f2fe43a.png"
                style={{ position: "absolute", left: "556px" }}
              />
              <p
                style={{
                  fontWeight: "bold",
                  color: "white",
                  height: "100px",
                  backgroundColor: "rgb(37, 180, 252)",
                  width: "650px",
                  padding: "36px",
                  fontSize: "large",
                  margin: "10px 0px 0px 100px",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Giá rẻ hơn khi đặt trên ứng dụng.{" "}
                <a href="#" style={{ color: "blue" }}>
                  Nhấn để tải
                </a>
              </p>
            </div>
            {hasSearchResults ? (
              <>
                <Search
                  placeholder="Thành phố khách sạn hoặc điểm đến"
                  style={{
                    width: 500,
                    marginTop: "20px",
                    marginLeft: "20px",
                  }}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onSearch={handleSearch}
                />
                <Select
                  showSearch
                  style={{ width: 200, marginTop: "20px", marginLeft: "20px" }}
                  placeholder="Phòng/đêm"
                  options={[
                    {
                      value: "1",
                      label: "Phòng/đêm",
                    },
                    {
                      value: "2",
                      label: "Tổng giá tiền",
                    },
                  ]}
                />
                <p style={{fontWeight : "bold" , textAlign : "center" , marginTop : "10px"}} >Kết quả tìm kiếm không tồn tại</p>
              </>
            ) : (
              <>
                <div>
                  <Search
                    placeholder="Thành phố khách sạn hoặc điểm đến"
                    style={{
                      width: 500,
                      marginTop: "20px",
                      marginLeft: "20px",
                    }}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onSearch={handleSearch}
                  />
                  <Select
                    showSearch
                    style={{
                      width: 200,
                      marginTop: "20px",
                      marginLeft: "20px",
                    }}
                    placeholder="Phòng/đêm"
                    options={[
                      {
                        value: "1",
                        label: "Phòng/đêm",
                      },
                      {
                        value: "2",
                        label: "Tổng giá tiền",
                      },
                    ]}
                  />
                  {hotel?.map((hotel: any) => (
                    <div className="itemRoom">
                      <div>
                        <Link to={`/detailroom/${hotel.hotel_Id}`}>
                          <img src={hotel.imgRoom} width={130} height={209} />
                        </Link>
                      </div>
                      <div>
                        <h5 style={{ fontWeight: "bold" }}>{hotel.nameRoom}</h5>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginTop: "15px",
                          }}
                        >
                          <p
                            style={{
                              color: "white",
                              backgroundColor: "rgb(37 180 252)",
                              width: "90px",
                              borderRadius: "20px",
                              fontWeight: "500",
                              height: "27px",
                              paddingLeft: "8px",
                            }}
                          >
                            Khách sạn
                          </p>
                          <Rate allowHalf defaultValue={4} />
                        </div>
                        <p style={{ color: "gray", fontWeight: "500" }}>
                          <i
                            className="fa-solid fa-location-dot"
                            style={{ color: "#8a8a8a" }}
                          ></i>
                          {hotel.location}
                        </p>
                        <p
                          style={{
                            color: "rgb(37 180 252)",
                            fontWeight: "500",
                          }}
                        >
                          <img src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/5/5285ed4483dbe0a200497d4c3de31128.svg" />{" "}
                          Ấn tượng - 8.9 (105)
                        </p>
                        <p
                          style={{
                            color: "gray",
                            fontWeight: "500",
                            height: "29px",
                            width: "257px",
                            backgroundColor: "#FFF4EF",
                            borderRadius: "20px",
                            padding: "3px",
                          }}
                        >
                          <img src="https://ik.imagekit.io/tvlk/image/imageResource/2021/11/08/1636353268422-912e327979961207d3c875a811858c33.png?tr=h-16,q-75,w-16" />{" "}
                          Một số phòng có Extra Benefit
                        </p>
                      </div>
                      <div>
                        <p
                          style={{
                            color: "rgb(37 180 252)",
                            fontWeight: "500",
                          }}
                        >
                          Thanh toán khi nhận phòng
                        </p>
                        <p
                          style={{
                            color: "red",
                            fontWeight: "500",
                            fontSize: "25px",
                          }}
                        >
                          {hotel.price.toLocaleString()} VND
                        </p>
                        <p
                          style={{
                            color: "gray",
                            fontWeight: "500",
                            height: "40px",
                            width: "100px",
                            backgroundColor: "#FFF4EF",
                            borderRadius: "20px",
                            padding: "10px",
                          }}
                        >
                          {hotel.availability}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Bookroom;
