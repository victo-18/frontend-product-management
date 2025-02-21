import axios from "axios";
import {
  DraftProductSchema,
  ProductProps,
  Products,
  ProductsSchema,
} from "../types";
import { safeParse, number, parse } from "valibot";
import { toBoolean } from "../utilities/formatCurrency";

type DataProps = {
  [k: string]: FormDataEntryValue;
};
const ulrBase = import.meta.env.VITE_API_URL;
export async function createProduct(data: DataProps) {
  try {
    const result = safeParse(DraftProductSchema, {
      name: data.name,
      price: +data.price,
    });
    if (result.success) {
      const response = await axios.post(`${ulrBase}/api/product`, {
        name: result.output.name,
        price: result.output.price,
      });
      return response.data;
    } else {
      throw new Error("The data couldn't be sent");
    }
  } catch (error) {
    console.error("Something is going wrong", error);
  }
}

export async function getProducts() {
  try {
    const { data } = await axios.get(`${ulrBase}/api/product`);
    const result = safeParse(Products, data.data);
    if (result.success) {
      return result.output;
    } else {
      throw new Error("Something has been wrong");
    }
  } catch (error) {
    console.log(error);
  }
}
export async function getProductById(id: ProductProps["id"]) {
  try {
    const { data } = await axios.get(`${ulrBase}/api/product/${id}`);
    const result = safeParse(ProductsSchema, data.data);
    if (result.success) {
      return result.output;
    } else {
      throw new Error("Something has been wrong");
    }
  } catch (error) {
    console.log(error);
  }
}
export async function editProductByid(
  product: DataProps,
  id: ProductProps["id"]
) {
  try {
    const NumberSchema = number();
    const data = safeParse(ProductsSchema, {
      id,
      name: product.name,
      price: parse(NumberSchema, Number(product.price)),
      availability: toBoolean(product.availability.toString()),
    });
    if (data.success) {
      const response = await axios.put(
        `${ulrBase}/api/product/${id}`,
        data.output
      );
      return response.data;
    } else {
      console.error("The product couldn't be update");
    }
  } catch (error) {
    console.error(error);
  }
}
export async function deleteProductById(id: ProductProps["id"]) {
  try {
    const response = await axios.delete(`${ulrBase}/api/product/${id}`);
    return response.data;
  } catch (error) {
    console.error("The product couldn't be delete", error);
  }
}

export async function updataAvailability(id: ProductProps["id"]) {
  try {
    const response = await axios.patch(`${ulrBase}/api/product/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
