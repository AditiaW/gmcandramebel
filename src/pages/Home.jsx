import React from "react";
import Helmet from "../components/Helmet/Helmet";
import { Col, Container, Row } from "reactstrap";
import hero_img from "../assets/images/homepageuser.png";
import "../styles/Home.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Services from "../services/Services";

const Home = () => {
  return (
    <Helmet title={"Home"}>
      <section className="hero_section">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="hero_content">
                {/* <p className="hero_subtitle">Trending product in {year}</p> */}
                <h2>Buat Interior Anda Lebih Minimalis dan Indah </h2>
                <p>
                  Gm Candra Mebel terus berupaya untuk memberikan pengalaman
                  berbelanja mebel yang memuaskan, menggabungkan kenyamanan
                  modern dengan keindahan tradisional.
                </p>
                <motion.button whileTap={{ scale: 1.2 }} className="buy_btn">
                  <Link to={"/shop"}>SHOP NOW</Link>
                </motion.button>
              </div>
            </Col>
            <Col lg="6" md="6">
              <div className="hero_img">
                <img src={hero_img} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Services />
    </Helmet>
  );
};

export default Home;
