import { ProductProps } from "@/utils/data/products";
import { create } from "zustand";
import {createJSONStorage, persist} from 'zustand/middleware'
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as CartInMemory from './helpers/cart-in-memory'

export type ProductCartProps = ProductProps & {
    quantity: number
}

type StateProps = {
    products: ProductCartProps[]
    add: (product: ProductProps) => void
    remove: (productId: string) => void
    clean: () => void
}

export const useCartStorage = create (persist<StateProps>((set) => ({
    products: [],
    add: (product: ProductProps)=> set((state)=>({
        products: CartInMemory.add(state.products, product),
    })),
    remove: (productId: string) => set((state)=>({
        products: CartInMemory.remove(state.products, productId)
    })),
    clean: () =>set((state)=>({
        products: []
    }))
    }),
    {
    name: "nlw-expert:cart",
    storage: createJSONStorage(()=>AsyncStorage),
}))

