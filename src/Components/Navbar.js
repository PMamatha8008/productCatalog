import React, { useState } from 'react';

import { Search } from '../Component/Search';
import SearchContext, { SearchProvider } from '../SearchContext';
import { Link } from 'react-router-dom';

export const Navbar = ({ setProductInfo }) => {
  

    return (
       
            <nav className="navbar navbar-light" style={{ backgroundColor: "#e3f2fd" }}>
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Products</a>
                    <form className="d-flex">
                        <Search  setProductInfo={setProductInfo}/>
                    </form>
                </div>
            </nav>
      


    );
};
