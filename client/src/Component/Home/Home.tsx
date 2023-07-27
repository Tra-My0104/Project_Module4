import Slider from "react-slick";
import "./Home.css";
import Dropdown from "react-bootstrap/Dropdown";
import { useState } from "react";
import { Select } from "antd";
import { Checkbox } from "antd";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";

function Home() {
  const settings = {
    className: "slider variable-width",
    dots: true,
    infinite: true,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const [location,setLocation] = useState("");
  const onChangeLocation= (value: string) => {
    setLocation(value);
  };
  
  const [numberNight, setNumberNight] = useState(1);

  const getTimeNow = () => {
    let timeNow = new Date();
    let day = timeNow.getDate();
    let month = timeNow.getMonth() + 1;
    let year = timeNow.getFullYear();

    return {
      day: day,
      month: month,
      year: year,
    };
  };

  const [selectedDate, setSelectedDate] = useState(getTimeNow());

const [dateForm, setDateForm] = useState("");
  const handleSelectDate = (day: number) => {
    const currentDate = getTimeNow();

    if (
      selectedDate.year < currentDate.year ||
      (selectedDate.year === currentDate.year &&
        selectedDate.month < currentDate.month) ||
      (selectedDate.year === currentDate.year &&
        selectedDate.month === currentDate.month &&
        day < currentDate.day)
    ) {
      return; // Không cho phép chọn ngày trong quá khứ
    }

    setSelectedDate({
      ...selectedDate,
      day: day,
    });
    setDateForm(`${day}/${currentMonth + 1}/${currentYear}`)
  };

  const [person,setPerson] = useState("");
  const onChangePerson = (value : string) => {
    setPerson(value)
  }

  
  const onChange = (value: number) => {
    setNumberNight(value);
  };

  const getDateFormat = () => {
    return `${selectedDate.year}-${selectedDate.month}-${selectedDate.day}`;
  };

  // Ngày bất kỳ
  const customDate = moment(getDateFormat()); // Thay đổi thành ngày bất kỳ mà bạn muốn

  // Cộng thêm 2 ngày
  const newDate = customDate.add(numberNight, "days");

  const getDayOfWeekInVietnamese = (dayOfWeek : string) => {
    switch (dayOfWeek) {
      case "Sunday":
        return "Chủ Nhật";
      case "Monday":
        return "Thứ Hai";
      case "Tuesday":
        return "Thứ Ba";
      case "Wednesday":
        return "Thứ Tư";
      case "Thursday":
        return "Thứ Năm";
      case "Friday":
        return "Thứ Sáu";
      case "Saturday":
        return "Thứ Bảy";
      default:
        return "";
    }
  };

  // Format ngày mới
  const dayOfWeek = getDayOfWeekInVietnamese(newDate.format("dddd"));

  const formatDate = () => {
    let day = selectedDate.day;
    let month = selectedDate.month;
    let year = selectedDate.year;
    return `${day}-${month}-${year}`;
  };

  const days = ["CN", "Th 2", "Th 3", "Th 4", "Th 5", "Th 6", "Th 7"];
  const currentDate = new Date();
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const renderCalendar = () => {
    const daysInMonth = moment(`${selectedDate.year}-${selectedDate.month}`, "YYYY-MM").daysInMonth();
    const firstDayOfMonth = new Date(
      selectedDate.year,
      selectedDate.month - 1,
      1
    ).getDay();
    const calendarDays = [];

    // Add empty cells for the days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(
        <div key={`empty${i}`} className="calendar-day"></div>
      );
    }

    // Add cells for each day of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const isPastDate =
        selectedDate.year < getTimeNow().year ||
        (selectedDate.year === getTimeNow().year &&
          selectedDate.month < getTimeNow().month) ||
        (selectedDate.year === getTimeNow().year &&
          selectedDate.month === getTimeNow().month &&
          i < getTimeNow().day);

          const isSunday = new Date(currentYear, currentMonth, i).getDay() === 0;

          const dayClassName = `calendar-day ${isPastDate ? 'past-day' : ''} ${isSunday ? 'sunday' : ''}`;
      
          calendarDays.push(
            <div
              key={`day${i}`}
              className={dayClassName}
              onClick={() => handleSelectDate(i)}
            >
              <div>{i}</div>
              <div>
               {i === 1 ? <div></div> : null} <br />
                  <div className="price">8.024K</div>
               </div>
            </div>
          );
    }
    return calendarDays;
  };
 
  const search = {
    dateForm,
    location,
    numberNight,
    person,
    checkoutDate: `${newDate.date()}/${newDate.month() + 1}/${newDate.year()}`
  }
  localStorage.setItem("search", JSON.stringify(search))
  const navigate = useNavigate()
  const handleSearch = () => {
  if(dateForm === "" || location === "" || numberNight === 0 || person === "") {
    notification.error({
      message: "Thất bại",
      description: "Bạn chưa chọn đủ thông tin",
    });
    return;
  }
  navigate("/bookroom")
  }
  return (
    <>
      <Slider {...settings}>
        <div>
          <img
            src="https://ik.imagekit.io/tvlk/image/imageResource/2023/05/09/1683597779257-949eecfbb570151eb5ea6732ff646fd9.jpeg?tr=h-230,q-75,w-472"
            style={{
              width: 472,
              height: 230,
              margin: "5px",
              borderRadius: "10px",
            }}
          />
        </div>
        <div>
          <img
            src="https://ik.imagekit.io/tvlk/image/imageResource/2023/06/19/1687164859647-3b49b5f6114e240e064d34b3aed447ea.png?tr=h-230,q-75,w-472"
            style={{
              width: 472,
              height: 230,
              margin: "5px",
              borderRadius: "10px",
            }}
          />
        </div>
        <div>
          <img
            src="https://ik.imagekit.io/tvlk/image/imageResource/2023/05/25/1684985597294-f22df6bd6baca1570ad5b411732f1203.jpeg?tr=h-230,q-75,w-472"
            style={{
              width: 472,
              height: 230,
              margin: "5px",
              borderRadius: "10px",
            }}
          />
        </div>
        <div>
          <img
            src="https://ik.imagekit.io/tvlk/image/imageResource/2023/05/09/1683597779257-949eecfbb570151eb5ea6732ff646fd9.jpeg?tr=h-230,q-75,w-472"
            style={{
              width: 472,
              height: 230,
              margin: "5px",
              borderRadius: "10px",
            }}
          />
        </div>
        <div>
          <img
            src="https://ik.imagekit.io/tvlk/image/imageResource/2023/06/11/1686488283549-e970238c5c2da9f11275e7184d8f2d8c.jpeg?tr=h-230,q-75,w-472"
            style={{
              width: 472,
              height: 230,
              margin: "5px",
              borderRadius: "10px",
            }}
          />
        </div>
        <div>
          <img
            src="https://ik.imagekit.io/tvlk/image/imageResource/2023/06/14/1686709065588-8ff3c690b755d5f6f638cb283801aff3.png?tr=h-230,q-75,w-472"
            style={{
              width: 472,
              height: 230,
              margin: "5px",
              borderRadius: "10px",
            }}
          />
        </div>
      </Slider>
      <div className="list-item">
        <ul className="item_left">
          <li>
            <img
              src="https://de2sjuwtxpj10.cloudfront.net/imageResource/sectionFilterIcon/81a9ac97-9a1d-42a6-bbf0-004008535448"
              style={{ width: 16, height: 16, marginRight: "10px" }}
            />
            Vé máy bay
          </li>
          <li>
            <img
              src="https://ik.imagekit.io/tvlk/image/imageResource/2023/06/01/1685631988109-4e2f068146d14d35aa47c5e9e9add5ff.png?_src=imagekit&tr=q-40,h-24"
              style={{ width: 16, height: 16, marginRight: "10px" }}
            />
            Khách sạn
          </li>
          <li>
            <img
              src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/4/4398e3dcb4519118ee600b7e7dbd284a.svg"
              style={{ width: 16, height: 16, marginRight: "10px" }}
            />
            Combo tiết kiệm
          </li>
          <li>
            <img
              src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/8/81512b90dde7bb19029bc60a9394ac3c.svg"
              style={{ width: 16, height: 16, marginRight: "10px" }}
            />
            Đưa đón sân bay
          </li>
          <li>
            <img
              src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/b/b52787f0d5e80f11898ff75143ba3381.svg"
              style={{ width: 16, height: 16, marginRight: "10px" }}
            />
            Điểm tham quan
          </li>
          <li>
            <img
              src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/7/733ae65fa004115936cf838e7bc1d588.svg"
              style={{ width: 16, height: 16, marginRight: "10px" }}
            />
            Cho thuê xe
          </li>
          <li>
            <img
              src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/e/e854273b455eb4426be10b778db6846b.svg"
              style={{ width: 16, height: 16, marginRight: "10px" }}
            />
            Bus & Shuttle
          </li>
          <li>
            <img
              src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/c/c00ab1f427ddf2519a3e080d9d9c1436.svg"
              style={{ width: 16, height: 16, marginRight: "10px" }}
            />
            Điểm thường của tôi
          </li>
          <li>
            <img
              src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/a/ab24015021953d26fba1b97a32464c8e.svg"
              style={{ width: 16, height: 16, marginRight: "10px" }}
            />
            Tình trạng chuyến bay
          </li>
          <li>
            <img
              src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/6/656d9f6953547ba93cf15954d7c6e220.svg"
              style={{ width: 16, height: 16, marginRight: "10px" }}
            />
            Thông báo giá vé
          </li>
        </ul>
        <div className="item_right">
          <div className="btn_itemRight">
            <button className="btn1">
              <i
                className="fa-solid fa-clock-rotate-left"
                style={{ color: "#52bdff", marginRight: "9px" }}
              ></i>
              Khách sạn xem gần đây
            </button>
          </div>
          <div className="form_itemRight">
            <label>Thành phố, địa điểm hoặc tên khách sạn:</label>
            <br />
            <Select
              style={{ width: "100%", marginBottom: "10px" }}
              placeholder="Thành phố khách sạn điểm đến"
              onChange = {onChangeLocation}
            >
              <option value="Nha Trang">Nha Trang</option>
              <option value="Đà Nẵng">Đà Nẵng</option>
              <option value="Bangkok">Bangkok</option>
              <option value="Singapore">Singapore</option>
            </Select>
            <br />
            <div className="item_middle">
              <div>
                <label>Nhận phòng</label> <br />
                <Dropdown>
                  <Dropdown.Toggle id="dropdown-basic">
                    <i className="fa-solid fa-calendar-days"></i> {formatDate()}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <div className="calendar">
                      <div className="calendar-header">
                        <button onClick={handlePrevMonth}>&lt;</button>
                        <h4>
                          {currentYear} - {currentMonth + 1}
                        </h4>
                        <button onClick={handleNextMonth}>&gt;</button>
                      </div>
                      <div className="calendar-body">
                        {days.map((day) => (
                          <div key={day} className="calendar-day-label">
                            {day}
                          </div>
                        ))}
                        {renderCalendar()}
                      </div>
                    </div>
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              <div>
                <label>Số đêm</label>
                <br />
                <Select
                  style={{ width: 120 }}
                  showSearch
                  placeholder="chọn số đêm"
                  optionFilterProp="children"
                  onChange={onChange}
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={[
                    {
                      value: 1,
                      label: "1 đêm",
                    },
                    {
                      value: 2,
                      label: "2 đêm",
                    },
                    {
                      value: 3,
                      label: "3 đêm",
                    },
                  ]}
                />
              </div>
              <div>
                <label>Trả phòng</label>
                <p style={{ fontWeight: "bold" }}>
              {dayOfWeek} , {newDate.date()}/{newDate.month() + 1}
                  /{newDate.year()}
                </p>
              </div>
            </div>

            <div className="item_bottom">
              <div>
                <label>Khách và phòng</label> <br />
                <Select
                  placeholder = "Chọn số người"
                  onChange={onChangePerson}
                  style={{width : "200%"}}
                >
                  <option value="1 người lớn">1 người lớn , 0 trẻ em , 1 phòng</option>
                  <option value="2 người lớn">2 người lớn , 1 trẻ em , 2 phòng</option>
                  <option value="3 người lớn">3 người lớn , 2 trẻ em , 3 phòng</option>
                  <option value="4 người lớn">4 người lớn , 3 trẻ em , 4 phòng</option>
                </Select>
              </div>
              <button
                style={{
                  backgroundColor: "rgb(255, 94, 31)",
                  color: "white",
                  borderRadius: "5px",
                  height: "40px",
                  border: "none",
                  marginTop: "23px",
                  width: "250px",
                  fontSize: "large",
                  fontWeight: 700,
                }}
                onClick={handleSearch}
              >
                <i
                  className="fa-solid fa-magnifying-glass"
                  style={{ color: "#ffffff" ,     marginRight: "5px"}}
                ></i>
                Tìm khách sạn
              </button>
            </div>
            <Checkbox
              style={{
                marginTop: "34px",
                marginLeft: "10px",
                fontSize: "large",
              }}
            >
              Tôi đi công tác
              <i
                className="fa-solid fa-question"
                style={{ color: "#3aa9fd", marginLeft: "8px" }}
              ></i>
            </Checkbox>
            <p
              style={{
                fontWeight: " bold",
                color: "#3aa9fd",
                margin: "20px 19px 4px 9px",
              }}
            >
              <i className="fa-solid fa-bell" style={{ color: "#57c7ff" }}></i>{" "}
              Thanh toán khi nhận phòng
            </p>
          </div>
        </div>
      </div>
      <div className="container_home">
        <h4 style={{marginLeft : "20px"}}>Nâng tầm chuyến đi theo cách bạn muốn</h4>
        <div className="item_1">
          <div>
            <img
              src="https://ik.imagekit.io/tvlk/image/imageResource/2023/06/20/1687227865303-92e8a9f380d1ac6cc541dee7a4d49a88.png?tr=q-75,w-256"
              style={{ borderRadius: "10px", marginLeft: "20px" }}
            />
            <p>Chuyến đi và Danh thắng</p>
          </div>
          <div>
            <img
              src="https://ik.imagekit.io/tvlk/image/imageResource/2023/06/20/1687227867984-3c8e84185751a99679e258b0e16bc914.png?tr=q-75,w-256"
              style={{ borderRadius: "10px", marginLeft: "30px" }}
            />
            <p>Fun Activities</p>
          </div>
          <div>
            <img
              src="https://ik.imagekit.io/tvlk/image/imageResource/2023/06/20/1687227873526-2c86a7c100d5a4bd96603a7eac3ec60a.png?tr=q-75,w-256"
              style={{ borderRadius: "10px", marginLeft: "30px" }}
            />
            <p>Fun Activities</p>
          </div>
        </div>
        <h4>
          <img src="https://ik.imagekit.io/tvlk/image/imageResource/2023/05/31/1685509983611-a25f46a53c13da46a43bf8f542076cd2.png?_src=imagekit&tr=q-40,h-24" style={{marginRight: "10px"}}/>
          Ưu đãi tốt nhất để có chuyến đi tiết kiệm chi phí!
        </h4>
        <div className="btn_home">
          <button>
            <img
              src="https://de2sjuwtxpj10.cloudfront.net/imageResource/sectionFilterIcon/81a9ac97-9a1d-42a6-bbf0-004008535448"
              style={{ width: 16, height: 16 , marginRight: "5px"}}
            />
            Vé máy bay
          </button>
          <button>
            <img
              src="https://de2sjuwtxpj10.cloudfront.net/imageResource/sectionFilterIcon/ad6ac3cb-fdcc-45d6-9b39-cd45d7ff8b25"
              style={{ width: 16, height: 16 , marginRight: "5px"}}
            />
            Khách sạn
          </button>
          <button>
            <img
              src="https://de2sjuwtxpj10.cloudfront.net/imageResource/sectionFilterIcon/607e3a37-2257-4ba6-aa6b-9038a64242ce"
              style={{ width: 16, height: 16 , marginRight: "5px"}}
            />
            Bus & Shuttle
          </button>
          <button>
            <img
              src="https://de2sjuwtxpj10.cloudfront.net/imageResource/sectionFilterIcon/b99c891a-ae81-4b03-baf9-26494914055d"
              style={{ width: 16, height: 16 , marginRight: "5px"}}
            />
            Đưa đón sân bay
          </button>
          <button>
            <img
              src="https://de2sjuwtxpj10.cloudfront.net/imageResource/sectionFilterIcon/f7a06d3c-d952-4cc4-a55b-3d2a9bfc330a"
              style={{ width: 16, height: 16 , marginRight: "5px"}}
            />
            Điểm tham quan
          </button>
        </div>
        <div className="item_2">
          <img src="https://ik.imagekit.io/tvlk/image/imageResource/2023/06/19/1687164859647-3b49b5f6114e240e064d34b3aed447ea.png?tr=q-75,w-427" />
          <img src="https://ik.imagekit.io/tvlk/image/imageResource/2023/05/25/1684985597294-f22df6bd6baca1570ad5b411732f1203.jpeg?tr=h-230,q-75,w-472" />
          <img src="https://ik.imagekit.io/tvlk/image/imageResource/2023/04/12/1681268942702-5fedbf6fda604956f4e8acf4ee16fa74.png?tr=q-75,w-427" />
        </div>
        <a
          href="#"
          style={{
            color: "blue",
            fontWeight: "bold",
            textAlign: "center",
            display: "block",
            marginTop: " 30px",
          }}
        >
          Xem tất cả khuyến mãi
        </a>
        <h4>
          <img src="https://ik.imagekit.io/tvlk/image/imageResource/2023/06/01/1685631988109-4e2f068146d14d35aa47c5e9e9add5ff.png?_src=imagekit&tr=q-40,h-24" style={{marginRight: "10px"}}/>
          Tái khám phá bản thân ở châu Á và những nơi khác
        </h4>
        <div className="item_3">
          <img src="https://ik.imagekit.io/tvlk/image/imageResource/2023/06/14/1686721948003-7928a0b56734caaca663b9239cde96da.png?tr=q-75,w-427" />
          <img src="https://ik.imagekit.io/tvlk/image/imageResource/2023/05/29/1685329328194-3d7df8cb31d4a3bf69f10209ba8402ec.png?tr=q-75,w-427" />
          <img src="https://ik.imagekit.io/tvlk/image/imageResource/2023/06/14/1686722015787-18de277528bf9856fc61a3be4cfe4a4e.png?tr=q-75,w-427" />
          <img src="https://ik.imagekit.io/tvlk/image/imageResource/2023/05/29/1685328965749-d622f5f8496a6dc11d9b1aca65c6d58e.png?tr=q-75,w-427" />
          <img src="https://ik.imagekit.io/tvlk/image/imageResource/2023/06/01/1685626590562-f7fc1564035ab9e353099a96c659b5c1.png?tr=q-75,w-427" />
          <img src="https://ik.imagekit.io/tvlk/image/imageResource/2023/06/01/1685626793768-ea048e16aff039145ae995a58a35cffd.png?tr=q-75,w-427" />
        </div>
        <h4 style={{ marginTop: "60px" }}>
          <img src="https://ik.imagekit.io/tvlk/image/imageResource/2023/06/01/1685631988109-4e2f068146d14d35aa47c5e9e9add5ff.png?_src=imagekit&tr=q-40,h-24" style={{marginRight: "10px"}}/>
          Sống thoải mái ở những thành phố được yêu thích nhất
        </h4>
        <div className="item_4">
          <img src="https://ik.imagekit.io/tvlk/image/imageResource/2022/12/13/1670914161196-afbce60dd45c63d6c5bed755d16a8120.jpeg?tr=q-75,w-320" />
          <img src="https://ik.imagekit.io/tvlk/image/imageResource/2022/12/13/1670914189698-b7723439f23156f14825ef5e5695cc26.jpeg?tr=q-75,w-320" />
          <img src="https://ik.imagekit.io/tvlk/image/imageResource/2022/12/13/1670914145711-fc8b8f2cd80cbf7dd48de3ce415ae463.jpeg?tr=q-75,w-320" />
          <img src="https://ik.imagekit.io/tvlk/image/imageResource/2022/12/13/1670914155982-3e98712315e9a68b9a942290be244fee.jpeg?tr=q-75,w-320" />
          <img src="https://ik.imagekit.io/tvlk/image/imageResource/2022/12/13/1670914138227-863c20c138ab9f145816d9043052f861.jpeg?tr=q-75,w-320" />
        </div>
        <a
          href="#"
          style={{
            color: "blue",
            fontWeight: "bold",
            textAlign: "center",
            display: "block",
            marginTop: " 30px",
          }}
        >
          Xem tất cả khách sạn
        </a>
        <h4>Không thể không đến</h4>
        <p style={{ color: "rgb(143, 143, 143)", fontWeight: "bold" }}>
          Đi cùng người thân vừa vui vừa thích
        </p>
        <button className="btn_att">Attraction</button>
        <button className="btn_tour">Tour</button>
        <div className="item_5">
          <div>
            <img
              src="https://ik.imagekit.io/tvlk/xpe-asset/AyJ40ZAo1DOyPyKLZ9c3RGQHTP2oT4ZXW+QmPVVkFQiXFSv42UaHGzSmaSzQ8DO5QIbWPZuF+VkYVRk6gh-Vg4ECbfuQRQ4pHjWJ5Rmbtkk=/2000908871772/Sun-World-Ba-Na-Hills-in-Da-Nang--435f9a3b-ca78-4576-ac5a-f6143bb4d01a.jpeg?_src=imagekit&tr=c-at_max,h-569,q-60,w-320"
              style={{ borderRadius: "10px", marginLeft: "20px" }}
            />
            <p>Sun World Ba Na Hills tại Đà Nẵng</p>
            <div style={{ color: "#F96D01", marginLeft: "80px" }}>
              VND 165.000
            </div>
          </div>
          <div>
            <img
              src="https://ik.imagekit.io/tvlk/xpe-asset/AyJ40ZAo1DOyPyKLZ9c3RGQHTP2oT4ZXW+QmPVVkFQiXFSv42UaHGzSmaSzQ8DO5QIbWPZuF+VkYVRk6gh-Vg4ECbfuQRQ4pHjWJ5Rmbtkk=/2000684219858/VinWonders-Nha-Trang-Tickets--82f7d908-199e-45a0-85cb-930281dc148d.jpeg?_src=imagekit&tr=c-at_max,h-569,q-60,w-320"
              style={{ borderRadius: "10px", marginLeft: "20px" }}
            />
            <p>Vé VinWonders tại Nha Trang</p>
            <div style={{ color: "#F96D01", marginLeft: "80px" }}>
              VND 165.000
            </div>
          </div>
          <div>
            <img
              src="https://ik.imagekit.io/tvlk/xpe-asset/AyJ40ZAo1DOyPyKLZ9c3RGQHTP2oT4ZXW+QmPVVkFQiXFSv42UaHGzSmaSzQ8DO5QIbWPZuF+VkYVRk6gh-Vg4ECbfuQRQ4pHjWJ5Rmbtkk=/2000908873783/Sun-World-Hon-Thom-Tickets-9606e9f1-d4ab-45af-84ec-350a29e641e1.jpeg?_src=imagekit&tr=c-at_max,h-569,q-60,w-320"
              style={{ borderRadius: "10px", marginLeft: "20px" }}
            />
            <p>Vé Sun World Hòn Thơm</p>
            <div style={{ color: "#F96D01", marginLeft: "80px" }}>
              VND 165.000
            </div>
          </div>
          <div>
            <img
              src="https://ik.imagekit.io/tvlk/xpe-asset/AyJ40ZAo1DOyPyKLZ9c3RGQHTP2oT4ZXW+QmPVVkFQiXFSv42UaHGzSmaSzQ8DO5QIbWPZuF+VkYVRk6gh-Vg4ECbfuQRQ4pHjWJ5Rmbtkk=/2000684220668/VinWonders-Phu-Quoc-Tickets-3f75a5db-e5a6-402e-bd77-9e14fd9f0f23.jpeg?_src=imagekit&tr=c-at_max,h-569,q-60,w-320"
              style={{ borderRadius: "10px", marginLeft: "20px" }}
            />
            <p>Vé VinWonders tại Phú Quốc</p>
            <div style={{ color: "#F96D01", marginLeft: "80px" }}>
              VND 165.000
            </div>
          </div>
        </div>
        <a
          href="#"
          style={{
            color: "blue",
            fontWeight: "bold",
            textAlign: "center",
            display: "block",
            marginTop: " 30px",
          }}
        >
          Xem tất cả
        </a>
        <h4>
          <img src="https://ik.imagekit.io/tvlk/image/imageResource/2023/06/01/1685632370538-63ea09621bb19474f36a8e6a994f4ab9.png?_src=imagekit&tr=q-40,h-24" style={{marginRight: "10px"}}/>
          Du hành quốc tế:nhận hướng dẫn
        </h4>
        <div className="item_6">
          <img src="https://ik.imagekit.io/tvlk/image/imageResource/2023/06/15/1686809745816-f79a1d39bd05dff74a28980cbb7875b1.png?tr=q-75,w-256" />
          <img src="https://ik.imagekit.io/tvlk/image/imageResource/2023/06/15/1686809749394-d6cd1791d20b3255f25cb3fb7a191acc.png?tr=q-75,w-256" />
          <img src="https://ik.imagekit.io/tvlk/image/imageResource/2023/06/15/1686809753588-b7415ac732c452b9207632846e6c4c3b.png?tr=q-75,w-256" />
          <img src="https://ik.imagekit.io/tvlk/image/imageResource/2023/06/15/1686809757422-818b6a6738fa9d78685617becf7e9428.png?tr=q-75,w-256" />
          <img src="https://ik.imagekit.io/tvlk/image/imageResource/2023/06/15/1686809760542-61384b1b7393cf68b60b740abd903861.png?tr=q-75,w-256" />
        </div>
        <hr />
        <h3 style={{ fontWeight: "bold", textAlign: "center" }}>
          Tại sao nên đặt chỗ với Traveloka ?
        </h3>
        <div className="item_7">
          <div>
            <img src="https://ik.imagekit.io/tvlk/image/imageResource/2017/05/17/1495008495760-d92160ea2b56fc1128cbdff93aa43774.png?tr=h-150,q-75,w-150" />
            <h5 style={{ fontWeight: "bold" }}>Giải pháp du lịch hoàn thiện</h5>
            <p style={{ fontWeight: "500" }}>
              Giải pháp toàn diện - giúp bạn tìm chuyến bay và khách sạn khắp
              Việt Nam và Đông Nam Á một cách tiết kiệm.
            </p>
          </div>
          <div>
            <img src="https://ik.imagekit.io/tvlk/image/imageResource/2017/05/17/1495008504598-6c1d5675c41e47eee0b27c59c07a2bbd.png?tr=h-150,q-75,w-150" />
            <h5 style={{ fontWeight: "bold" }}>Giá rẻ mỗi ngày</h5>
            <p style={{ fontWeight: "500" }}>
              Giá bạn thấy là giá bạn trả! Dễ dàng so sánh khi không cần phải
              trả thêm chi phí ẩn!
            </p>
          </div>
          <div>
            <img src="https://ik.imagekit.io/tvlk/image/imageResource/2017/05/17/1495008514239-c1d0a51538cd02053c9b1a6c567fe5b5.png?tr=h-150,q-75,w-150" />
            <h5 style={{ fontWeight: "bold" }}>
              Phương thức thanh toán an toàn và linh hoạt
            </h5>
            <p style={{ fontWeight: "500" }}>
              Giao dịch trực tuyến an toàn với nhiều lựa chọn như thanh toán tại
              cửa hàng tiện lợi, chuyển khoản ngân hàng, thẻ tín dụng đến
              Internet Banking. Không tính phí giao dịch.
            </p>
          </div>
          <div>
            <img src="https://ik.imagekit.io/tvlk/image/imageResource/2017/05/17/1495008521046-3cee046bb3ddb863398300f89d83c0f9.png?tr=h-150,q-75,w-150" />
            <h5 style={{ fontWeight: "bold" }}>Hỗ trợ khách hàng 24/7</h5>
            <p style={{ fontWeight: "500" }}>
              Đội ngũ nhân viên hỗ trợ khách hàng luôn sẵn sàng giúp đỡ bạn
              trong từng bước của quá trình đặt vé
            </p>
          </div>
        </div>
        <hr />
      </div>
    </>
  );
}

export default Home;
