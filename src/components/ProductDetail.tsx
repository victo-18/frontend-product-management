import {
  ActionFunctionArgs,
  Form,
  redirect,
  useFetcher,
  useNavigate,
} from "react-router-dom";
import { ProductProps } from "../types";
import { formatcurrency } from "../utilities/formatCurrency";
import { deleteProductById } from "../services/productServices";
import { toast } from "react-toastify";

type ProductDetail = {
  product: ProductProps;
};
export async function action({ params }: ActionFunctionArgs) {
  if (params.id !== undefined) {
    const response = await deleteProductById(+params.id);
    if (response) {
      const { message } = response;
      toast.info(message);
    }
    return redirect("/");
  }
}
export const ProductDetail = ({ product }: ProductDetail) => {
  const fetcher = useFetcher()
  const navegate = useNavigate();
  const isavailable = product.availability;

  return (
    <tr className="border-b ">
      <td className="p-3 text-lg text-gray-800">{product.name}</td>
      <td className="p-3 text-lg text-gray-800">
        {formatcurrency(product.price)}
      </td>
      <td className="p-3 text-lg text-gray-800">
        <fetcher.Form method="POST">
          <button
            type="submit"
            name="id"
            value={product.id}
            className={`${
              isavailable ? "text-black" : "text-red-600"
            } rounded-lg font-bold uppercase text-sm p-2
              w-full border border-black hover:cursor-pointer`
            }
          >
            {isavailable ? " Product in stock" : "Product not in stock"}
          </button>
        </fetcher.Form>
      </td>
      <td className="p-3 text-lg text-gray-800 ">
        <div className="flex gap-2 items-center justify-center h-full">
          <button
            className="w-full bg-indigo-600 text-white rounded-lg p-2 uppercase font-bold text-xs text-center hover:cursor-pointer hover:bg-indigo-700"
            onClick={() => navegate(`/edit-product/${product.id}`)}
          >
            Edit
          </button>
          <Form
            className="w-full"
            method="POST"
            action={`/delete-product/${product.id}`}
            onSubmit={(e) => {
              if (!confirm("Are you sure to delete the product?")) {
                e.preventDefault();
              }
            }}
          >
            <input
              type="submit"
              className="mt-5 w-full bg-red-600 p-1 text-white font-bold text-lg cursor-pointer rounded hover:cursor-pointer hover:bg-red-700"
              value={"Delete"}
            />
          </Form>
        </div>
      </td>
    </tr>
  );
};
