import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import { Container, Row, Col } from "reactstrap";
import { toast } from "react-toastify";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const handleDeleteOrder = async (orderId) => {
    try {
      await deleteDoc(doc(db, "orders", orderId));
      setOrders(orders.filter((order) => order.id !== orderId));
      toast.success("Order deleted successfully!");
    } catch (error) {
      console.error("Error deleting order: ", error);
      toast.error("Failed to delete order");
    }
  };

  const formatToRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersCollection = collection(db, "orders");
        const ordersSnapshot = await getDocs(ordersCollection);
        const ordersData = ordersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders: ", error);
      }
    };

    fetchOrders();
  }, []);

  const sortedOrders = [...orders].sort((a, b) => a.noOrder - b.noOrder);

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <table className="table">
              <thead>
                <tr>
                  <th>No Order</th>
                  <th>Items</th>
                  <th>Total Price</th>
                  <th>Created At</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {sortedOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.noOrder}</td>
                    <td>
                      <ul
                        style={{ listStyleType: "disc", paddingLeft: "20px" }}
                      >
                        {order.cartItems.map((item, index) => (
                          <li key={index}>
                            <span>{item.productName}</span> -
                            <span> Price: {item.price}</span> -
                            <span> Quantity: {item.quantity}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td>{formatToRupiah(order.totalPrice)}</td>
                    <td>
                      {new Date(order.createdAt.seconds * 1000).toLocaleString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        }
                      )}
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteOrder(order.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Orders;
