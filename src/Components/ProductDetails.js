import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

export const ProductDetails = () => {
    const [productInfo, setProductInfo] = useState([])
    const { id, category } = useParams();

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


    return (
        <>
        
           


        </>
    )
}