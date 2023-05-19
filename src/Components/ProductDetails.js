import React, { useEffect, useState } from "react";
import { Card, Carousel, Col, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

export const ProductDetails = () => {
    const [productInfo, setProductInfo] = useState([])
    const { id, name } = useParams();

    useEffect(() => {
        fetch('http://localhost:8000/get-product')
            //  fetch('http://localhost:8000/get-subCategory')

            .then(res => res.json())
            .then(result => {
                setProductInfo(result)
                console.log(result)
            })
            .catch(error => console.log(error))
    }, [])
    const data = productInfo.filter((item) => item.subCategoryId === name)
    const product = data.find((item) => item.id == id)
    // console.log(list)
    return (
        // <>

        //     {
        //         list ? (
        //             <Row className="justify-content-center container-fluid">

        //                 <Card style={{ marginTop: '10rem', height: '25rem', width: '25rem', backgroundColor: "#F2F2F2" }}>
        //                     <Card.Body  >
        //                         <Card.Header>
        //                             <Card.Subtitle>Product: {list.name}</Card.Subtitle>
        //                         </Card.Header>
        //                         <Row style={{ marginTop: '2rem' }}>
        //                             <Card.Title>Price - &#x20B9;{list.price}</Card.Title>
        //                         </Row>

        //                     </Card.Body>
        //                 </Card>

        //             </Row>
        //         ) : (
        //             <div>Loading ...</div>
        //         )
        //     }



        // </>
        <>
            {
                product ? (
                    <Row className="justify-content-center container-fluid" >
                        <Card.Body style={{ marginTop: '2rem', height: '20rem', width: '80vw', }}   >
                            <Row  >
                                <Col sm={3}>
                                    <Carousel >
                                        {product.image.map((item, index) => (
                                            <Carousel.Item key={index} >
                                                <Card.Img src={item} alt={`${index}`} style={{ height: '40rem', width: '30rem' }} />
                                            </Carousel.Item>
                                        ))}
                                    </Carousel>
                                </Col>
                                <Col >
                                    <Row>
                                        <Card.Subtitle>{product.name} </Card.Subtitle>
                                    </Row>
                                    <Row>
                                        <Card.Text>
                                            <h5>Description</h5>
                                            {product.description}
                                        </Card.Text>
                                    </Row>
                                    <Row style={{ marginTop: '2rem' }}>
                                        <Card.Title>Price - &#x20B9;{product.price}</Card.Title>
                                    </Row>

                                </Col>
                            </Row>
                        </Card.Body>



                    </Row>
                ) : (
                    <div>Loading ...</div>
                )
            }


        </>
    )
}