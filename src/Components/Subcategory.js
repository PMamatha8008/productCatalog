// import React, { useCallback, useEffect, useState } from "react";
// import { Button, Card, CardImg, Carousel, Col, Row } from "react-bootstrap";
// import { Link, useParams } from "react-router-dom";


// export const Subcategory = () => {

//     const [productlist, setProductList] = useState([])
//     const { category } = useParams()

//     useEffect(() => {

//         fetch('http://localhost:8000/get-subCategory')
//             .then(res => res.json())
//             .then(result => {
//                 setProductList(result)

//             })
//             .catch(error => console.log(error))
//     }, [])

//     // console.log(category)
//     const data = productlist
//     console.log(data)
//     const lists = data ? data.filter((item) => item.categoryId === category) : []
//     console.log(lists)
//     return (
//         <>

//             <div >
//                 <Row className="container-fluid g-3 m-2" xs={2} sm={2} md={3} lg={4} xl={4}>
//                     {lists.map((item, index) => (
//                         <Col key={index}>
//                             <Link to={`${item.name}`} style={{ textDecoration: 'none', color: '#202124' }}>
//                                 <Card className="card">

//                                     <Card.Img variant="top" src={item.image} alt=""  style={{height:'16rem'}}/>
//                                     <Card.Body>
//                                         <center><Card.Title style={{ fontSize: "1rem" }}>{item.name}</Card.Title></center>
//                                     </Card.Body>
//                                     <Card.Footer style={{ backgroundColor: '#E3F2FD'  ,border:'none'}}>
//                                         <center><small>ADD TO CART</small></center>
//                                     </Card.Footer>
//                                 </Card>
//                             </Link>
//                         </Col>
//                     ))}
//                 </Row>

//             </div>
//         </>
//     )

// }


import { width } from "@mui/system";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Card, CardImg, Carousel, Col, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";


export const Subcategory = () => {

    const [productlist, setProductList] = useState([])
    const { category } = useParams()

    useEffect(() => {

        fetch('http://localhost:8000/get-subCategory')
            .then(res => res.json())
            .then(result => {
                setProductList(result)

            })
            .catch(error => console.log(error))
    }, [])

    // console.log(category)
    const data = productlist
    console.log(data)
    const lists = data ? data.filter((item) => item.categoryId === category) : []
    console.log(lists)
    return (
        <>

            <div >
                <Row className="container-fluid g-3 m-2" xs={2} sm={2} md={3} lg={4} xl={4}>
                    {lists.map((item, index) => (
                        <Col key={index} style={{width:'25rem'}}>
                            <Link to={`${item.name}`} style={{ textDecoration: 'none', color: '#832729' }}>
                                <Card className="card" >

                                    <Card.Img variant="top" src={item.image} alt="" style={{ height: '16rem' }} />
                                    <Card.Body>
                                        <center><Card.Title style={{ fontSize: "1rem",padding:"10px" }}>{item.name}</Card.Title>
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