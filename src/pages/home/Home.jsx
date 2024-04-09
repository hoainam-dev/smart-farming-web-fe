import React, { useEffect, useState } from "react";
import Screen from "../../components/screen/Screen";
import "./home.css";
import { Col } from "react-bootstrap";
import Control from "../../components/control/Control";
import ApexChart from "../../components/apexcharts/ApexChart";
import Helmet from "../../components/helmet/Helmet";
import io from 'socket.io-client';

function Home() {
  const [socket, setSocket] = useState(null);
  const [devices, setDevices] = useState([]);
  const [temps, setTemps] = useState([]);
  useEffect(() => {
    const newSocket = io('http://localhost:3100');
    setSocket(newSocket);

    newSocket.on('devices', data => {
      setDevices(data);
    });
    newSocket.on('temps', data => {
      setTemps(data);
    });

    return () => newSocket.disconnect();
  }, []);
  return (
    <Helmet title={"Home"}>
    <section className="hero__section" id="home">
      <div className="container-left">
        <Col lg="6" md="6">
          <Screen temps={temps}/>
        </Col>
        <Col lg="6" md="6">
          <Control devices={devices}/>
        </Col>
      </div>
      <div className="container-right">
        <Col>
          <ApexChart />
        </Col>
      </div>
    </section>
    </Helmet>
  );
}

export default Home;
