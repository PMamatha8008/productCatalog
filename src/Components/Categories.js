import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

export const Categories = () => {

  const [data, setData] = useState([]);
  const [cmtrId ,setCmtrId] = useState('')

  const [customerData, setCustomerData] = useState([]);

  const getNumber =()=>{
    const value = document.getElementById('getNumber').value;
    console.log(value)
    setCmtrId(value)

  }

  const handleSubmit =(event)=>{
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
    <form onSubmit={handleSubmit}>
    <input  type="number" id='getNumber' name="getNumber" defaultValue='' />
        <button  onClick={getNumber}>submit</button> 

        </form>
      <div className="p-2">
        <Row xs={2} sm={2} md={3} lg={4} xl={4} className="g-3 m-2 " >
          {(customerData.length > 0 ? customerData : data).map((categories, index) =>
          (
            <Col key={index} >
              <Link to={`${categories.name}`} style={{ textDecoration: 'none', color: '#af493d' }}>
                <Card className="card">
                  {/* <Card.Img  variant="top" src={process.env.PUBLIC_URL + "/images/" +categories.image.split('\\').pop()} style={{ height: '14rem',width:'auto', backgroundColor: '#dcdedc' }} alt="" /> */}
                  {/* <Card.Img  variant="top" src={current server path + "/jewelimages/Goldring1.jpg"} style={{ height: '14rem',width:'auto', backgroundColor: '#dcdedc' }} alt="" /> */}
                  <Card.Img variant="top" src={categories.image} alt=""  style={{height:'16rem'}}/>
                  <Card.Body >
                    <center> <Card.Title><small style={{fontSize:"1rem"}}>{categories.name}</small></Card.Title>
                      <Button variant="flat" size="xxl">VIEW&nbsp;MORE</Button>
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