const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./Routes/users.routes");
const hotelRoute = require("./Routes/hotel.routes");
const roomRoute = require("./Routes/room.routes");
const bookingRoute = require("./Routes/booking.routes")
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cors());

server.use("/api/v1/users", userRoute);
server.use("/api/v1/hotel", hotelRoute);
server.use("/api/v1/room",roomRoute);
server.use("/api/v1/booking", bookingRoute)


server.listen(8000, () => {
    console.log("http://localhost:8000");
  });
  