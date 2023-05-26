import React, { useContext, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../SearchContext";
import { FaSearch } from "react-icons/fa";

export const Search = () => {
    const { updateSearchValue, setProductInfo } = useContext(SearchContext);
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();

    const handleSearchChange = async (e) => {
        const value = e.target.value;
        setSearchValue(value);
        updateSearchValue(value);

        try {
            const response = await fetch(`http://localhost:8000/search?q=${value}`);
            const data = await response.json();
            setProductInfo(data);
            navigate("/searchresult");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Form.Group controlId="search">
                <InputGroup>

                    <Form.Control
                        type="text"
                        placeholder="Search..."
                        value={searchValue}
                        onChange={handleSearchChange}
                    />
                    <InputGroup.Text >
                        <FaSearch />
                    </InputGroup.Text>
                </InputGroup>
            </Form.Group>
        </>
    );
};
