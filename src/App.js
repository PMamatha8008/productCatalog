
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Categories } from './Components/Categories';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Subcategory } from './Components/Subcategory';
import { ProductList } from './Components/ProductList';
import AddCategory from './Components/AddCategory';
import AddSubCategory from './Components/AddSubCategory';
import AddProductDetails from './Components/AddProductDetails';
import { ProductDetails } from './Components/ProductDetails';
import PopupProduct from './Components/PopupProduct';
import { ProductTable } from './Components/ProductTable';


function App() {
     const router = createBrowserRouter([
      {
        path:'/',
        element:<Categories/>
      },
      // {
      //   path:'/:customerId',
      //   element:<Categories/>
      // },
      {
         path:'/:category',
         element:<Subcategory/>
      },
      {
        path:'/:category/:id',
        element:<ProductList/>
      },
      {
        path:'/productdetails',
        element:<ProductDetails/>
      },
      {
        path:'/producttable',
        element:<ProductTable/>
      },
      {
        path:'/popupproduct',
        element:<PopupProduct/>
      },
      {
        path:'/addcategory',
        element:<AddCategory/>
      },
      {
        path:'/addsubcategory',
        element:<AddSubCategory/>
      },
      {
        path:'/addproductdetails',
        element:<AddProductDetails/>
      },
     ])

  return (
   <>
   <RouterProvider router={router}/> 
   
   </>
  );
}

export default App;
