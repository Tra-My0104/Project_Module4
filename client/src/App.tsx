import Footer from "./Component/Footer/Footer";
import Header from "./Component/Header/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./Component/Home/Home";
import Register from "./Component/Register/Register";
import Information from "./Component/Information/Information";
import Adminuser from "./Component/Admin/AdminUser/Adminuser";
import Bookroom from "./Component/Bookroom/Bookroom";
import Detailroom from "./Component/Detailroom/Detailroom";
import Bookingroom from "./Component/Bookingromm/Bookingroom";
import Bookinginformation from "./Component/Bookinginfomation/Bookinginformation";


function App() {

  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element ={<Home></Home>}></Route>
        <Route path="/register" element ={<Register/>}></Route>
        <Route path="/information/:id" element ={<Information/>}></Route>
        <Route path="/adminuser" element={<Adminuser/>}></Route>
        <Route path="/bookroom" element={<Bookroom />} />
        <Route path="/detailroom/:id" element={<Detailroom/>}></Route>
        <Route path="/bookingroom/:id" element={<Bookingroom/>}></Route>
        <Route path="/bookinginformation/:id" element={<Bookinginformation/>}></Route>
      </Routes>
      <Footer></Footer>
    </>
  );
}

export default App;
