import React, { useEffect, useState } from "react";
// import "../src/table.css"
import { Button, Form, Modal } from "react-bootstrap";


export const ProductTable = () => {

  const [data, setData] = useState([])
  const [editingItem, setEditingItem] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);


  const handleDeleteClick = (id) => {

    fetch(`http://localhost:8000/delete_product/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        console.log(setData((data) => data.filter((item) => item.id !== id)));
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetch('http://localhost:8000/get-product')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        console.log(data)
      })
      .catch((error) => console.log(error))

      
  }, [])

  const handleEditClick = (item) => {
    setEditingItem(item);
    setEditedData(item);
    setShowEditModal(true);
  };

  const handleEditSave = () => {
    fetch(`http://localhost:8000/put_product/${editingItem.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedData),
    })
      .then((res) => res.json())
      .then(() => {
        setData((prevData) =>
          prevData.map((item) => (item.id === editingItem.id ? editedData : item))
        );
        setShowEditModal(false);
      })
      .catch((error) => console.log(error));
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  return (
    <>
      <div className="p-5">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Weight</th>
            <th scope="col">CategoryId</th>
            <th scope="col">SubCategoryId</th>
            <th scope="col">Description</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) && data.length > 0 ? (
            data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.weight}</td>
                <td>{item.categoryId}</td>
                <td>{item.subCategoryId}</td>
                <td>{item.description}</td>
               <td>
                  <button onClick={() => handleEditClick(item)}>edit</button>
                </td>
                <td>
                  <button onClick={() => handleDeleteClick(item.id)}>delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No data available</td>
            </tr>
          )}
        </tbody>

      </table>
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            className={currentPage === pageNumber ? "active" : ""}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>
              Name</Form.Label>
              <Form.Control
                type="text"
                value={editedData.name || ""}
                onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>price</Form.Label>
              <Form.Control
                type="text"
                value={editedData.price || ""}
                onChange={(e) => setEditedData({ ...editedData, price: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Weight</Form.Label>
              <Form.Control
                type="text"
                value={editedData.weight || ""}
                onChange={(e) => setEditedData({ ...editedData, weight: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                value={editedData.categoryId || ""}
                onChange={(e) => setEditedData({ ...editedData, categoryId: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Sub Category</Form.Label>
              <Form.Control
                type="text"
                value={editedData.subCategoryId || ""}
                onChange={(e) => setEditedData({ ...editedData, subCategoryId: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={editedData.description || ""}
                onChange={(e) => setEditedData({ ...editedData, description: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEditSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};