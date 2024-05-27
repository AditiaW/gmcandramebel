/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from "react";
import { Form, FormGroup, Container, Row, Col } from "reactstrap";
import { toast } from "react-toastify";
import { db, storage } from "../firebase.config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { useNavigate, useLocation, useParams } from "react-router-dom";

const EditProducts = () => {
  const [enterTitle, setEnterTitle] = useState("");
  const [enterDescription, setEnterDescription] = useState("");
  const [enterPrice, setEnterPrice] = useState("");
  const [enterCategory, setEnterCategory] = useState("");
  const [enterProductImage, setEnterProductImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { productId } = useParams();
  const isEditMode = Boolean(productId);
  const productData = location.state?.product;

  useEffect(() => {
    if (isEditMode && productData) {
      setEnterTitle(productData.productName);
      setEnterDescription(productData.description);
      setEnterPrice(productData.price);
      setEnterCategory(productData.category);
    }
  }, [isEditMode, productData]);

  const addOrUpdateProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const imageUpload = enterProductImage
        ? new Promise((resolve, reject) => {
            const storageRef = ref(storage, `productImages/${enterProductImage.name}`);
            const uploadTask = uploadBytesResumable(storageRef, enterProductImage);

            uploadTask.on(
              "state_changed",
              () => {},
              (error) => reject(error),
              () => {
                getDownloadURL(uploadTask.snapshot.ref).then(resolve).catch(reject);
              }
            );
          })
        : Promise.resolve(productData.imgUrl);

      const downloadURL = await imageUpload;

      const productRef = isEditMode ? doc(db, "products", productId) : collection(db, "products");
      const productData = {
        productName: enterTitle,
        description: enterDescription,
        category: enterCategory,
        price: Number(enterPrice),
        imgUrl: downloadURL,
      };

      if (isEditMode) {
        await updateDoc(productRef, productData);
        toast.success("Product successfully updated!");
      } else {
        const docRef = await addDoc(productRef, productData);
        await updateDoc(doc(db, "products", docRef.id), { id: docRef.id });
        toast.success("Product successfully added!");
      }

      setLoading(false);
      navigate("/dashboard/all-products");
    } catch (error) {
      setLoading(false);
      toast.error("Product not added/updated!");
      console.error("Error adding/updating product:", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setEnterProductImage(file);
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            {loading ? (
              <h4 className="py-5">Loading......</h4>
            ) : (
              <>
                <h4 className="mb-5">{isEditMode ? "Edit Product" : "Add Product"}</h4>
                <Form onSubmit={addOrUpdateProduct}>
                  <FormGroup className="form_group">
                    <span>Product title</span>
                    <input
                      type="text"
                      placeholder="Double sofa"
                      value={enterTitle}
                      onChange={(e) => setEnterTitle(e.target.value)}
                      required
                      style={{ color: "black" }}
                    />
                  </FormGroup>
                  <FormGroup className="form_group">
                    <span>Description</span>
                    <input
                      type="text"
                      placeholder="Description....."
                      value={enterDescription}
                      onChange={(e) => setEnterDescription(e.target.value)}
                      required
                      style={{ color: "black" }}
                    />
                  </FormGroup>
                  <div className="d-flex align-items-center justify-content-between gap-5">
                    <FormGroup className="form_group w-50">
                      <span>Price</span>
                      <input
                        type="text"
                        placeholder="1000000"
                        value={enterPrice}
                        onChange={(e) => setEnterPrice(e.target.value)}
                        required
                        style={{ color: "black" }}
                      />
                    </FormGroup>
                    <FormGroup className="form_group w-50">
                      <span>Category</span>
                      <select
                        className="w-100 p-2"
                        value={enterCategory}
                        onChange={(e) => setEnterCategory(e.target.value)}
                        style={{ color: "black" }}
                      >
                        <option value="">Select Category</option>
                        <option value="meja">Meja</option>
                        <option value="kursi">Kursi</option>
                        <option value="pintu">Pintu</option>
                        <option value="jendela">Jendela</option>
                      </select>
                    </FormGroup>
                  </div>

                  <div>
                    <FormGroup className="form_group">
                      <span>Product Image</span>
                      <label htmlFor="productImage" className="file_label">
                        Choose File
                        <input
                          type="file"
                          id="productImage"
                          onChange={handleFileChange}
                          style={{ display: "none" }}
                        />
                      </label>
                      {enterProductImage && (
                        <span>{enterProductImage.name}</span>
                      )}
                    </FormGroup>
                  </div>
                  <button className="buy_btn" type="submit">
                    {isEditMode ? "Update Product" : "Add Product"}
                  </button>
                </Form>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default EditProducts;
