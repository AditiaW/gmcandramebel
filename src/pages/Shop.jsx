import React, { useState, useEffect } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { Container, Row, Col } from "reactstrap";
import "../styles/shop.css";
import ProductList from "../components/UI/ProductsList";
import useGetData from "../custom-hooks/useGetData";

const Shop = () => {
  const { data: products, loading } = useGetData("products");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortType, setSortType] = useState("");

  useEffect(() => {
    if (products && products.length > 0) {
      setFilteredProducts(products);
    }
  }, [products]);

  useEffect(() => {
    let updatedProducts = products;

    if (selectedCategory) {
      updatedProducts = updatedProducts.filter((item) =>
        item.category.includes(selectedCategory)
      );
    }

    if (searchTerm) {
      updatedProducts = updatedProducts.filter((item) =>
        item.productName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortType === "ascending") {
      updatedProducts.sort((a, b) => a.price - b.price);
    } else if (sortType === "descending") {
      updatedProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(updatedProducts);
  }, [products, searchTerm, selectedCategory, sortType]);

  const handleFilter = (e) => {
    const filterValue = e.target.value;
    setSelectedCategory(filterValue);
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
  };

  const handleSort = (e) => {
    const sortValue = e.target.value;
    setSortType(sortValue);
  };

  return (
    <Helmet title="Shop">
      <CommonSection title={"Products"} />
      <section>
        <Container>
          <Row>
            <Col lg="3" md="6">
              <div className="filter_widget">
                <select onChange={handleFilter}>
                  <option value="">Filter By Category</option>
                  <option value="meja">Meja</option>
                  <option value="kursi">Kursi</option>
                  <option value="pintu">Pintu</option>
                  <option value="jendela">Jendela</option>
                </select>
              </div>
            </Col>
            <Col lg="3" md="6" className="text-end">
              <div className="filter_widget">
                <select onChange={handleSort}>
                  <option>Sort By</option>
                  <option value="ascending">Ascending</option>
                  <option value="descending">Descending</option>
                </select>
              </div>
            </Col>
            <Col lg="6" md="12">
              <div className="search_box">
                <input
                  type="text"
                  placeholder="Search......"
                  onChange={handleSearch}
                  value={searchTerm}
                />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="pt-0">
        <Container>
          <Row>
            {loading ? (
              <h5 className="fw-bold">Loading.....</h5>
            ) : filteredProducts.length === 0 ? (
              <h1 className="text-center fs-4">No products are found!</h1>
            ) : (
              <ProductList data={filteredProducts} />
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Shop;
