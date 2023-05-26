
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Button from '@mui/material/Button';


export const Categories = () => {

  const [data, setData] = useState([]);
  const [cmtrId, setCmtrId] = useState('')

  const [customerData, setCustomerData] = useState([]);

  const getNumber = () => {
    const value = document.getElementById('getNumber').value;
    console.log(value)
    setCmtrId(value)

  }

  const handleSubmit = (event) => {
    event.preventDefault();


    fetch(`http://localhost:8000/get_product/${cmtrId}`)
      .then((response) => response.json())
      .then((result) => {
        setData(result)

      })
      .catch(error => console.log(error))
  }


  return (
    <>
      <form onSubmit={handleSubmit} className="d-flex align-items-center" style={{ margin: '1rem' }}>
        <input
          type="number"
          className="form-control"
          id="getNumber"
          name="getNumber"
          defaultValue=""
          placeholder="Enter Customer ID"
          style={{ width: '15rem' }}
        />
        <button className="btn btn-primary ml-2" onClick={getNumber}>Submit</button>
      </form>



      <div className="p-2">
        <Row xs={2} sm={2} md={3} lg={4} xl={4} className="g-1 m-2 " >
          {(customerData.length > 0 ? customerData : data).map((categories, index) =>
          (
            <Col key={index} style={{width:'25rem'}} >
              <Link to={`${categories.name}`} style={{ textDecoration: 'none', color: '#832729' }}>
                <Card className="card" >

                  <Card.Img variant="top" src={categories.image} alt="" style={{ height: '16rem'}} />
                  <Card.Body >
                    <center> <Card.Title><small style={{ fontSize: "1rem" }}>{categories.name}</small></Card.Title>
                      <button className="btn-viewmore">VIEW&nbsp;MORE</button>
                    </center>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </div>
    </>
  )
}