import React, { useState } from "react";
import { Form, FormGroup, Container, Row, Col } from "reactstrap";
import { toast } from "react-toastify";
import { db, storage } from "../firebase.config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AddProducts = () => {
  const [enterTitle, setEnterTitle] = useState("");
  const [enterDescription, setEnterDescription] = useState("");
  const [enterPrice, setEnterPrice] = useState("");
  const [enterCategory, setEnterCategory] = useState("");
  const [enterProductImage, setEnterProductImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const addProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const storageRef = ref(storage, `productImages/${enterProductImage.name}`);
      const uploadTask = uploadBytesResumable(storageRef, enterProductImage);

      uploadTask.on(
        "state_changed",
        () => {},
        (error) => {
          setLoading(false);
          toast.error("Image upload failed!");
          console.error("Error uploading image:", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then(async (downloadURL) => {
              const docRef = await addDoc(collection(db, "products"), {
                productName: enterTitle,
                description: enterDescription,
                category: enterCategory,
                price: Number(enterPrice), 
                imgUrl: downloadURL,
              });

              await updateDoc(doc(db, "products", docRef.id), {
                id: docRef.id,
              });

              setLoading(false);
              toast.success("Product successfully added!");
              navigate("/dashboard/all-products");
            })
            .catch((downloadError) => {
              setLoading(false);
              toast.error("Product not added!");
              console.error("Error adding product:", downloadError);
            });
        }
      );
    } catch (error) {
      setLoading(false);
      toast.error("Product not added!");
      console.error("Error adding product:", error);
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
                <h4 className="mb-5">Add Product</h4>
                <Form onSubmit={addProduct}>
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
                          required
                          style={{ display: "none" }}
                        />
                      </label>
                      {enterProductImage && (
                        <span>{enterProductImage.name}</span>
                      )}
                    </FormGroup>
                  </div>
                  <button className="buy_btn" type="submit">
                    Add Product
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

export default AddProducts;
