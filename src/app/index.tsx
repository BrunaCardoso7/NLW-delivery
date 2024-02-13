import { CategoryButton } from '@/components/categoryButton'
import { Header } from '@/components/header'
import { View, Text, FlatList, SectionList } from 'react-native'
import { CATEGORIES, MENU } from '@/utils/data/products'
import { Product } from '@/components/Product'
import { useState } from 'react'

export default function Home () {
    const [category ,setCategory] = useState(CATEGORIES[0])

    const haddleSelect = (categorySelected: string) => {
        setCategory(categorySelected)  
    }

    return(
        <View className="pt-6">
            <Header title={'Faça seu pedido'} />    

            <FlatList
                data={CATEGORIES}
                keyExtractor={(item)=> item}
                renderItem={({item})=>(
                    <CategoryButton title={item} isSelect={item===category} onPress={()=> haddleSelect(item)}/>
                )}
                horizontal
                className='max-h-10 mt-5'
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
            />
            <SectionList 
                sections={MENU}
            
                keyExtractor={(item)=> item.id}
                stickySectionHeadersEnabled={false}
                renderItem={({item} )=> (
                    <Product 
                        data={item}
                    />
                )}
                renderSectionHeader={({section: {title}})=>(
                    <Text className='text-xl text-white font-heading mt-8 mb-3'>{title}</Text>
                )}
                className='m-5'
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 100}}
            />
        </View>
    )
}
