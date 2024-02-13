import { Product } from "@/components/Product";
import { Button } from "@/components/button";
import { Header } from "@/components/header";
import { ProductCartProps, useCartStorage } from "@/store/cart-store";
import { View, Text, ScrollView, Alert, Linking  } from "react-native";
import { Feather } from "@expo/vector-icons";
import { LinkButton } from "@/components/link-button";
import { formatCurrency } from "@/utils/functions/format-currancy";
import { Input } from "@/components/inout";
import { useState } from "react";
import { useNavigation } from "expo-router";

const PHONE_NUMBER = "558694193056"

export default function Cart () {
    const [address, SetAddress] = useState('')
    const cardStore = useCartStorage()

    const navigation = useNavigation()

    const total = cardStore.products.reduce((total, current) => (current.price * current.quantity) + total, 0)

    function handleProductRemove (product: ProductCartProps){
        const aceptRemove = Alert.alert("Remover", `Deseja remover ${product.title}?`, [
        {
            text: "Cancelar"
        },
        {
            text: "Remover",
            onPress: () => cardStore.remove(product.id)
        }
    ])
    }

    function handleOrder () {
        if(address.trim().length === 0){
            return Alert.alert("Pedido", "Informe os dados da entrega!")
        }
        const products = cardStore.products.map((product) => `\n ${product.quantity}x ${product.title}`).join("")

        const mensage = `
            \n🌭NOVO PEDIDO 
            \n-------------------------------
            ${products}
            \n-------------------------------
            \nEndereço de entrega: ${address}
           \n--------------------------------
            \nTotal cobrado: ${total}
        `
        Linking.openURL(`http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${mensage}`)
        cardStore.clean()
        navigation.goBack()
    }

    return(
        <View className="flex-1 pt-8">
            <Header title="Seu carrinho" />
            <ScrollView>

                {
                    cardStore.products.length > 0 ? (
                        <View className="p-5 flex-1 border-b border-slate-400">
                        {
                            cardStore.products.map((item, index) => (
                                <Product 
                                    onPress={()=>handleProductRemove(item)}
                                    key={index}
                                    data={item}
                                />
                            ))
                        }
                    </View>
                    ) : (
                        <Text className="font-body text-slate-400 text-center my-8">
                            Adicione items ao carrinho
                        </Text>
                    )
                }
            <Input 
                onSubmitEditing={handleOrder}
                blurOnSubmit={true}
                className="mx-4 my-4"
                onChangeText={(text)=> SetAddress(text)}
                placeholder="Informe o endereço de entrega com rua, bairro, CEP, número e complemento..."
            />
            <View className="flex-1 flex-row p-5 pb-8 fixed">
                <Text className="text-xl text-slate-100 font-heading">Total: </Text>
                <Text className="text-2xl text-lime-400 font-heading">
                    {formatCurrency(total)}
                </Text>
            </View>
            </ScrollView>


            <View className="p-5 pb-8 gap-5">
                <Button onPress={handleOrder}>
                    <Button.Text>
                        Enviar Pedido
                    </Button.Text>
                    <Button.Icon>
                        <Feather name="arrow-right-circle" size={20}/>
                    </Button.Icon>
                </Button>
                <LinkButton title="Voltar ao cardápio" href="/"/>
            </View>
           
        </View>
    )
}