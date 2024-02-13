import { Image, Text, ImageSourcePropType, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { forwardRef } from "react"

type ProductDataProps = {
    title: string,
    price: number,
    description: string,
    thumbnail: ImageSourcePropType | undefined,
    quantity?: number
}

type ProductProps = TouchableOpacityProps & {
    data: ProductDataProps
}

export const Product = forwardRef<TouchableOpacity, ProductProps>(({data, ...rest }, ref) => {
    return (
        <TouchableOpacity ref={ref} className="w-full flex-row items-center pb-4" {...rest}>
            <View className="flex-row gap-4">
                <Image source={data.thumbnail} className="w-20 h-20 rounded-md" alt="image thumbnail" />
                <View className="flex-1 ml-3">
                    <View className="flex-row items-center gap-2">
                        <Text className="text-slate-100 font-subtittle text-base">{data.title}</Text>
                        {
                            data.quantity && (
                                <Text className="text-slate-400 font-subtittle text-sm">
                                    x {data.quantity}
                                </Text>
                            )
                        }
                    </View>
                    <Text className="text-slate-400 text-xs leading-5 mt-0.5 w-4/5">{data.description}</Text>
                </View> 
            </View>
        </TouchableOpacity>
    )
})