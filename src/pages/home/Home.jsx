import React from "react";
import Screen from "../../components/screen/Screen";
import "./home.css";
import { Col } from "react-bootstrap";
import Control from "../../components/control/Control";
import ApexChart from "../../components/apexcharts/ApexChart";
import Helmet from "../../components/helmet/Helmet";
function Home() {
  return (
    <Helmet title={"Home"}>
    <section className="hero__section" id="home">
      <div className="container-left">
        <Col lg="6" md="6">
          <Screen />
        </Col>
        <Col lg="6" md="6">
          <Control />
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
