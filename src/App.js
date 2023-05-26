
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Categories } from './Components/Categories';
import { BrowserRouter, Outlet, Route, Router, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Subcategory } from './Components/Subcategory';
import { ProductList } from './Components/ProductList';
import AddCategory from './Components/AddCategory';
import AddSubCategory from './Components/AddSubCategory';
import AddProductDetails from './Components/AddProductDetails';
import { ProductDetails } from './Components/ProductDetails';
import PopupProduct from './Components/PopupProduct';
import { ProductTable } from './Components/ProductTable';
import { Navbar } from './Components/Navbar';
import { Search } from './Component/Search';
import SearchContext, { SearchProvider } from './SearchContext';
import React, { useState } from 'react';
import { SearchResult } from './Component/SearchResult';
import { SearchProductDetails } from './Component/searchprodcutInfo';





function App() {

  const [productInfo, setProductInfo] = React.useState([]);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Categories />
    },
    {
      path: '/:category',
      element: <Subcategory />
    },
    {
      path: '/:category/:name',
      element: <ProductList />
    },
    {
      path: '/:category/:name/:id',
      element: <ProductDetails />
    },
    {
      path: '/producttable',
      element: <ProductTable />
    },
    {
      path: '/popupproduct',
      element: <PopupProduct />
    },
    {
      path: '/addcategory',
      element: <AddCategory />
    },
    {
      path: '/addsubcategory',
      element: <AddSubCategory />
    },
    {
      path: '/addproductdetails',
      element: <AddProductDetails />
    },
    {
      path: '/searchresult',
      element: <SearchResult />
    }, {
      path: '/search',
      element: <Search />
    },
    {
      path:'/searchresult/:id',
      element:<SearchProductDetails/>

    }
    
  ])

  return (
    <SearchProvider>
      <>
        <BrowserRouter>
          <Navbar  setProductInfo={setProductInfo}/>
        </BrowserRouter>
        <RouterProvider router={router}>
          <Outlet />
        </RouterProvider>
      </>
  </SearchProvider>
  );
}

export default App;
