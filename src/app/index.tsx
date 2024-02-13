import { CategoryButton } from '@/components/categoryButton'
import { Header } from '@/components/header'
import { View, Text, FlatList, SectionList } from 'react-native'
import { CATEGORIES, MENU, ProductProps } from '@/utils/data/products'
import { Product } from '@/components/Product'
import { useState, useRef } from 'react'
import { Link } from 'expo-router'
import { useCartStorage } from '@/store/cart-store'

export default function Home () {
    const [category ,setCategory] = useState(CATEGORIES[0])

    const sectionListRef = useRef<SectionList<ProductProps>>(null)
    const cartstore = useCartStorage()
    const cartquantity =  cartstore.products.reduce((total, product) => total + product.quantity ,0)

    const haddleSelect = (categorySelected: string) => {
        setCategory(categorySelected)  

        const sectionIndex = CATEGORIES.findIndex((category) => category === categorySelected)
        
        if(sectionListRef.current){
            sectionListRef.current.scrollToLocation({
                animated: true,
                sectionIndex,
                itemIndex: 0,
            })
        }
    }

    return(
        <View className="flex-1 pt-8">
            <Header title={'Faça seu pedido'} cardQuatity={cartquantity} />    

            <FlatList
                data={CATEGORIES}
                keyExtractor={(item)=> item}
                renderItem={({item})=>(
                    <CategoryButton title={item} isSelect={item===category} onPress={()=> haddleSelect(item)}/>
                )}
                horizontal
                className='flex-1 max-h-10 mt-5'
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
            />
            <SectionList 
                ref={sectionListRef}
                sections={MENU}
                keyExtractor={(item)=> item.id}
                stickySectionHeadersEnabled={false}
                renderItem={({item})=> (
                    <Link href={`/product/${item.id}`} asChild>
                        <Product 
                            data={item}
                        />
                    </Link>
                )}
                renderSectionHeader={({section: {title}})=>(
                    <Text className='text-xl text-white font-heading mt-8 mb-5'>{title}</Text>
                )}
                className=' flex-1 p-4'
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 100}}
            />
        </View>
    )
}
