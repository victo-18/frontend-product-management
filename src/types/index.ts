import {object,string,number, boolean,array} from 'valibot'
import { InferOutput } from 'valibot';


export const DraftProductSchema = object({
    name:string(),
    price:number()
})

export const ProductsSchema = object({
    id:number(),
    name:string(),
    price:number(),
    availability:boolean()

})
export const Products =array(ProductsSchema)
export type ProductProps =InferOutput<typeof ProductsSchema>