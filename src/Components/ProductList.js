import React, { useEffect, useState } from "react";
import { Card, Carousel, Col, Row } from "react-bootstrap";

import { Link, useParams } from "react-router-dom";

export const ProductList = () => {
    const [productInfo, setProductInfo] = useState([])
    const { name } = useParams()

    useEffect(() => {
        fetch('http://localhost:8000/get-product')
            .then(res => res.json())
            .then(result => {
                setProductInfo(result)
            })
            .catch(error => console.log(error))
    }, [])



    const data = productInfo.filter((item) => item.subCategoryId === name)


    console.log(data)

    return (
        <>
            {
                data ? (
                    <Row className="justify-content-center container-fluid">
                        {data.map((item) => (
                            <Col key={item.id} >
                                <Link to={`${item.id}`} style={{ textDecoration: 'none', color: '#202124' }}>
                                  
                                        <Card.Body  style={{ margin: '1rem 13rem', height: '14rem', width: '80vw' }}  >
                                            <Row>
                                                <Col sm={2} >
                                                    <Card.Img src={item.image[0]} alt='' style={{ height: '12rem', width: '14rem' }} />
                                                </Col>

                                                <Col style={{ marginLeft: '1rem' ,backgroundColor: '#F7F7F7'}}>
                                                    <Row style={{ marginTop: '2rem' }}>
                                                        <Card.Subtitle>{item.name} </Card.Subtitle>

                                                    </Row>
                                                    <Row >
                                                        <Card.Title>Price - &#x20B9;{item.price}</Card.Title>
                                                    </Row>

                                                </Col>
                                            </Row>

                                        </Card.Body>
                                  
                                </Link>
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <div>Loading ...</div>
                )
            }


        </>
    )
}