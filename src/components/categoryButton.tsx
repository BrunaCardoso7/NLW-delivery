import { Text, Pressable, PressableProps } from "react-native";
import clsx from "clsx";

type CategoryProps = PressableProps & {
    title: string,
    isSelect?: boolean
}

export function CategoryButton ({ title, isSelect, ...rest }: CategoryProps) {


    return(
        <Pressable className={
            clsx("bg-slate-800 px-4 item justify-center rounded-md h-10", isSelect && "border-2 border-lime-300")
        } {...rest}>
            <Text className="text-slate-100 font-subtittle text-sm">{title}</Text>
        </Pressable>
    )
}