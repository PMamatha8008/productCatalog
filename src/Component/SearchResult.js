import React, { useContext, useEffect, useState } from "react";
import { SearchContext } from "../SearchContext";
import { Col, Row, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const SearchResult = () => {
  const { searchValue } = useContext(SearchContext);
  const [searchResults, setSearchResults] = useState([]);
  const [sortedResults, setSortedResults] = useState([]);
  const [sortOption, setSortOption] = useState("high");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/search?q=${searchValue}`);
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [searchValue]);

  useEffect(() => {
    const sortResults = () => {
      let sorted = [...searchResults];
      if (sortOption === "high") {
        sorted.sort((a, b) => a.price - b.price);
      } else if (sortOption === "low") {
        sorted.sort((a, b) => b.price - a.price);
      }
      setSortedResults(sorted);
    };

    sortResults();
  }, [searchResults, sortOption]);

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <>
      <div className="sort-options d-flex justify-content-end " style={{margin:'0.5rem'}}>
        Sort by:
        <select value={sortOption} onChange={handleSortChange} style={{ width: "12rem" }}>
          <option value="high">Price: Low to High</option>
          <option value="low">Price: High to Low</option>
        </select>
      </div>
      {sortedResults.length > 0 ? (
        <Row className="justify-content-center container-fluid">
          {sortedResults.map((item) => (
            <Col key={item.id}>
              <Link to={`${item.id}`} style={{ textDecoration: "none", color: "#202124" }}>
                <Card.Body style={{ margin: "1rem 13rem", height: "14rem", width: "80vw" }}>
                  <Row>
                    <Col sm={2}>
                      <Card.Img
                        src={item.image[0]}
                        alt=""
                        style={{ height: "12rem", width: "14rem" }}
                      />
                    </Col>
                    <Col style={{ marginLeft: "1rem", backgroundColor: "#F7F7F7" }}>
                      <Row style={{ marginTop: "2rem" }}>
                        <Card.Subtitle>{item.name}</Card.Subtitle>
                      </Row>
                      <Row>
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
        <div>Loading...</div>
      )}
    </>
  );
};
