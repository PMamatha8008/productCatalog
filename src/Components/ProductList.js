import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

export const ProductList = () => {
    const [productInfo, setProductInfo] = useState([])
    const { id, category } = useParams();

    useEffect(() => {
        fetch('http://localhost:8000/get-category')
        //  fetch('http://localhost:8000/get-subCategory')
        
            .then(res => res.json())
            .then(result => { 
                setProductInfo(result)
                console.log(result)
                // console.log(productInfo)
             })
            .catch(error => console.log(error))
    }, [])

    // const data = productInfo
    // const lists = data ? data.filter((item) => item.categoryId === category) : []
    // const item = lists.find((c) => c.id == id)
    // console.log(item)
    return (
        <>
        
            {/* {
                item ? (
                    <Row className="justify-content-center container-fluid">
                        <Card style={{ marginTop: '10rem', height: '25rem', width: '25rem', backgroundColor: "#F2F2F2" }}>
                            <Card.Body  >
                                <Card.Header>
                                    <Card.Subtitle>Product: {item.name}</Card.Subtitle>
                                </Card.Header>
                                <Row style={{ marginTop: '2rem' }}>
                                    <Card.Title>Price - &#x20B9;{item.categoryId}</Card.Title>
                                </Row>
                               
                            </Card.Body>
                        </Card>
                    </Row>
                ) : (
                    <div>Loading ...</div>
                )
            } */}


        </>
    )
}