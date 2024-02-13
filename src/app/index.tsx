import { CategoryButton } from '@/components/categoryButton'
import { Header } from '@/components/header'
import { View, FlatList, SectionList } from 'react-native'
import { CATEGORIES, ProductProps } from '@/utils/data/products'

import { useState, useRef } from 'react'


export default function Home () {
    const [category ,setCategory] = useState(CATEGORIES[0])
    
    const sectionListRef = useRef<SectionList<ProductProps>>(null);

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
        </View>
    )
}
