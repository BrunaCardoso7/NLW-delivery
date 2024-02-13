import { Image, Text, ImageSourcePropType, TouchableOpacity, TouchableOpacityProps, View } from "react-native";

type ProductDataProps = {
    title: string,
    price: number,
    description: string,
    thumbnail: ImageSourcePropType | undefined
}

type ProductProps = TouchableOpacityProps & {
    data: ProductDataProps
}

export function Product ({data}: ProductProps) {
    return (
        <TouchableOpacity className="w-full flex-row items-center" {...data}>
            <Image source={data.thumbnail} className="w-20 h-20 rounded-md" alt="image thumbnail" />
            <View className="m-3">
                <Text className="text-slate-100 font-subtittle text-base flex-1">{data.title}</Text>
                <Text className="text-slate-400 text-xs leading-5 mt-0.5">{data.description}</Text>
            </View>
        </TouchableOpacity>
    )
}