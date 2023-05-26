// import React, { useEffect, useState } from "react";
// import { Card, Carousel, Col, Row } from "react-bootstrap";

// import { Link, useParams } from "react-router-dom";


// export const ProductList = () => {
//     const [productInfo, setProductInfo] = useState([])
//     const { name } = useParams()

//     useEffect(() => {
//         fetch('http://localhost:8000/get-product')
//             .then(res => res.json())
//             .then(result => {
//                 setProductInfo(result)
//             })
//             .catch(error => console.log(error))
//     }, [])

//     const data = productInfo.filter((item) => item.subCategoryId === name)
//     console.log(data)

//     return (
//         <>         
//             {
//                 data ? (
//                     <Row className="justify-content-center container-fluid">
//                         {data.map((item) => (
//                             <Col key={item.id} >
//                                 <Link to={`${item.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                                  
//                                         <Card.Body  style={{ margin: '1rem 13rem', height: '14rem', width: '80vw' }}  >
//                                             <Row>
//                                                 <Col sm={2} >
//                                                     <Card.Img src={item.image[0]} alt='' style={{ height: '12rem', width: '14rem' }} />
//                                                 </Col>

//                                                 <Col style={{ marginLeft: '1rem' ,backgroundColor: '#F7F7F7'}}>
//                                                     <Row style={{ marginTop: '2rem' }}>
//                                                         <Card.Subtitle>{item.name} </Card.Subtitle>

//                                                     </Row>
//                                                     <Row >
//                                                         <Card.Title>Price - &#x20B9;{item.price}</Card.Title>
//                                                     </Row>

//                                                 </Col>
//                                             </Row>

//                                         </Card.Body>
                                  
//                                 </Link>
//                             </Col>
//                         ))}
//                     </Row>
//                 ) : (
//                     <div>Loading ...</div>
//                 )
//             }


//         </>
//     )
// }

import React, { useEffect, useState } from "react";
import { Card, Carousel, Col, Row } from "react-bootstrap";
// import Image1 from "../../public/logo192.png";

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
                    <Row xs={1} sm={1} md={1} lg={1} xl={1} className="g-3 m-2  container-fluid">
                        {data.map((item) => (
                            <Col key={item.id} >
                                <Link to={`${item.id}`} style={{ textDecoration: 'none', color: '#202124' }}>

                                    <div className="card mb-3" style={{maxWidth: '540'}}>
                                        <div className="row no-gutters">
                                            <div className="col-md-2">
                                                <img src={item.image[0]} alt="" className="card-img" style={{ height: '14rem', width: '16rem' }} />
                                            </div>
                                            <div className="col-md-10">
                                            <div className="card-body">
                                                    <h5 className="card-title" style={{fontSize:"15px"}}>{item.name}</h5>
                                                    <p className="card-text"><small className="text-muted">{item.description}</small></p>
                                                    <p className="card-text"><small>Price -<b> &#x20B9;{item.price}</b></small></p>
                                                    <span class="fa fa-star checked" style={{color:"#ffc107"}}></span>
                                                    <span class="fa fa-star checked" style={{color:"#ffc107"}}></span>
                                                    <span class="fa fa-star checked" style={{color:"#ffc107"}}></span>
                                                    <span class="fa fa-star checked" style={{color:"#ffc107"}}></span>
                                                    <span class="fa fa-star "></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <Card.Body  style={{ margin:"0.3rem", height: '30vh', width: '80vw',border: '1px solid #ccc',backgroundColor: '#F7F7F7' }}  >
                                            <Row>
                                                <Col xs={3} >
                                                    <Card.Img src={item.image[0]} alt='' style={{ height: '12rem', width: '14rem' }} />
                                                </Col>

                                                <Col xs={9}>
                                                    <Row style={{ marginTop: '2rem' }}>
                                                        <Card.Subtitle>{item.name} </Card.Subtitle>

                                                    </Row>
                                                    <Row >
                                                        <Card.Title>Price - &#x20B9;{item.price}</Card.Title>
                                                    </Row>

                                                </Col>
                                            </Row>

                                        </Card.Body> */}

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