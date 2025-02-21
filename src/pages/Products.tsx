import { ActionFunctionArgs, Link} from "react-router-dom";
import { getProducts, updataAvailability } from "../services/productServices";
import { useLoaderData } from "react-router-dom";
import { ProductDetail } from "../components/ProductDetail";
import { ProductProps } from "../types";
import { toast } from "react-toastify";
export async function loader(){
  const products = await getProducts()
  return products
}
export async function action({request}:ActionFunctionArgs) {
 const data= Object.fromEntries( await request.formData())
 if(data.id!==undefined){
  const id = +data.id
  const response = await updataAvailability(id)
  const {message}= response 
  toast.info(message)
 }
 

  return{}
}
export const Products = () => {

  const products = useLoaderData() as ProductProps[]

  return (
    <>
      <div className=" flex justify-between">
        <h2 className=" text-4xl text-slate-500 font-black ml-4">Products</h2>
        <Link
          to={"/new-product"}
          className=" bg-indigo-500 rounded-lg p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-600 mr-4"
        >
          Add product
        </Link>
      </div>
      <div className="p-2">
  <table className="w-full mt-5 table-auto">
    <thead className="bg-slate-800 text-white">
        <tr>
            <th className="p-2">Producto</th>
            <th className="p-2">Precio</th>
            <th className="p-2">Disponibilidad</th>
            <th className="p-2">Acciones</th>
        </tr>
    </thead>
    <tbody>
    {products.map((product)=>(
      <ProductDetail   
        key={product.id}
        product={product}
      />
    ))}
    </tbody>
  </table>
</div>
    </>
  );
};
