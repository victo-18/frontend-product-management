import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import { Products ,loader as ProductLoader,action as UpdateProductActions} from "./pages/Products";
import  NewProduct ,{action as NewProductAction} from "./pages/NewProduct";
import EditForm,{loader as editProductLoader,action as editProductAction}from "./components/EditForm";
import { action as DeleteActionProduct} from "./components/ProductDetail";

const router = createBrowserRouter([
    {
        path:"/",
        element:<Layout/>,
        children:[
           {
            index:true,
            element:<Products/>,
            loader:ProductLoader,
            action:UpdateProductActions
           },
           {
            path:"new-product",
            element:<NewProduct/>,
            action: NewProductAction
           },{
            path:"/edit-product/:id",
            element:<EditForm/>,
           loader:editProductLoader,
           action:editProductAction
           },
           {
            path:"/delete-product/:id",
            action:DeleteActionProduct
           }
        ]
    }
])

export default router