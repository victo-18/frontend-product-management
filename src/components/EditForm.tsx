import {
  Link,
  Form,
  useActionData,
  ActionFunctionArgs,
  LoaderFunctionArgs,
  useLoaderData,
} from "react-router-dom";
import { ErrorMessage } from "../components/ErrorMessage";
import { editProductByid, getProductById } from "../services/productServices";
import { redirect } from "react-router-dom";
import { ProductProps } from "../types";
import { toast } from "react-toastify";
export async function loader({ params }: LoaderFunctionArgs) {
  if (params.id !== undefined) {
    const result = await getProductById(+params.id);
    if (!result) {
      return redirect("/");
    }
    return result;
  }
}
export async function action({ request, params }: ActionFunctionArgs) {
  //fetching data fron the form
  const data = Object.fromEntries(await request.formData());
  let error = "";
  if (Object.values(data).includes("")) {
    error = "All the fields are required";
  }
  if (error.length) {
    return error;
  }
  const response = await editProductByid(data, Number(params.id));
  if (response.message) {
    const { message } = response;
    toast.info(message);
  }

  return redirect("/");
}
const availabilityOptions = [
  { name: "Disponible", value: true },
  { name: "No Disponible", value: false },
];

const EditForm = () => {
  const error = useActionData() as string;
  const product = useLoaderData() as ProductProps;

  return (
    <>
      <div className=" flex justify-between">
        <h2 className=" text-4xl text-slate-500 font-black ml-4">
          {" "}
          Create a new product
        </h2>
        <Link
          to={"/"}
          className=" bg-indigo-500 rounded-lg p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-600 mr-4"
        >
          Back to products
        </Link>
      </div>
      <Form className="mt-10" method="POST">
        {error ? <ErrorMessage>{error}</ErrorMessage> : ""}
        <div className="mb-4">
          <label className="text-gray-800" htmlFor="name">
            Product name:
          </label>
          <input
            id="name"
            type="text"
            className="mt-2 block w-full p-3 bg-gray-50"
            placeholder="Product name"
            name="name"
            defaultValue={product.name}
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-800" htmlFor="price">
            Price:
          </label>
          <input
            id="price"
            type="number"
            className="mt-2 block w-full p-3 bg-gray-50"
            placeholder="Example of price. ej. 200, 300"
            name="price"
            defaultValue={product.price}
          />
        </div>

        <div className="mb-4">
          <label className="text-gray-800" htmlFor="availability">
            Disponibilidad:
          </label>
          <select
            id="availability"
            className="mt-2 block w-full p-3 bg-gray-50"
            name="availability"
            defaultValue={product?.availability.toString()}
          >
            {availabilityOptions.map((option) => (
              <option key={option.name} value={option.value.toString()}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value={'Edit product'}
        />
        
      </Form>
    </>
  );
};
export default EditForm;
