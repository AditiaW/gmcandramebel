import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import "../styles/dashboard.css";
import useGetData from "../custom-hooks/useGetData";

const Dashboard = () => {
  const { data: products } = useGetData("products");
  const { data: users } = useGetData("users");
  const { data: orders } = useGetData("orders");
  const [totalSales, setTotalSales] = useState(0);

  useEffect(() => {
    if (orders && orders.length > 0) {
      // Menghitung total penjualan dari setiap pesanan
      const total = orders.reduce((acc, order) => acc + order.totalPrice, 0);
      setTotalSales(total);
    }
  }, [orders]);

  // Fungsi untuk mengkonversi nilai numerik menjadi format mata uang Rupiah
  const formatToRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="3">
            <div className="revenue_box">
              <h5>Total Sales</h5>
              <span>{formatToRupiah(totalSales)}</span>
            </div>
          </Col>
          <Col lg="3">
            <div className="order_box">
              <h5>Orders</h5>
              <span>{orders.length}</span>
            </div>
          </Col>
          <Col lg="3">
            <div className="products_box">
              <h5>Total Products</h5>
              <span>{products.length}</span>
            </div>
          </Col>
          <Col lg="3">
            <div className="users_box">
              <h5>Total Users</h5>
              <span>{users.length}</span>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Dashboard;
