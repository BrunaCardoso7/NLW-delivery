import { View, Text, Image } from "react-native";
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { PRODUCTS } from "@/utils/data/products";
import { formatCurrency } from "@/utils/functions/format-currancy";
import { Button } from "@/components/button";
import {Feather} from "@expo/vector-icons"
import { LinkButton } from "@/components/link-button";
import { useCartStorage } from "@/store/cart-store";
import { Redirect } from "expo-router";
export default function Product () {
    const cartStore = useCartStorage()
    const {id} = useLocalSearchParams()
    const navigation = useNavigation() 

    const product = PRODUCTS.find((item)=> item.id === id)

    function handleAddCart () {
        if(product){
            cartStore.add(product)
            navigation.goBack()
        }
    }

    if(!product){
        return <Redirect href={"/"}/>
    }

    return(
    <View className="flex-1">
        <Image className='w-full h-60' source={product.cover} resizeMode="cover" alt="foto do lanche"/>
        <View className="p-5 m-8 flex-1">
            <View className="gap-2">
                <Text className="text-slate-100 font-heading text-lg">
                    {product.title}
                </Text>
                <Text className="text-lime-400 font-heading text-2xl">
                    {formatCurrency(product.price)}
                </Text>
                <Text className="text-slate-400 font-body text-base leading-6 mb-6">
                    {product.description}
                </Text>
                <View>
                    {
                        product.ingredients.map((ingredient)=> <Text key={ingredient} className="text-slate-400 font-body leading-6"> {"\u2022"} {ingredient}</Text>)
                    }
                </View>
            </View>
        </View>
        <View className="p-5 pb-8 gap-5">
            <Button onPress={handleAddCart}>
                <Button.Icon>
                    <Feather name="plus-circle" size={20} />
                </Button.Icon>
                <Button.Text>
                    Adicionar ao pedido
                </Button.Text>
            </Button>
            <LinkButton title="Voltar ao cardápio" href="/"/>
        </View>
    </View>
    )
}