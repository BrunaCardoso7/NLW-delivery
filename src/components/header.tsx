import React from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons'
import colors from "tailwindcss/colors";
import { Link } from "expo-router";

interface HeaderProps {
    title: string,
    cardQuatity?: number
}

export function Header({ title, cardQuatity=0 }: HeaderProps) {

    return( 
        <View className="flex-row items-center border-b border-slate-700 pb-5 mx-5">
                <View className="flex-1">
                    <Image source={require("@/assets/logo.png")} className="w-32 h-6"/>
                    <Text className="text-white text-xl font-heading">{title}</Text>
                </View>
            {
                cardQuatity > 0 &&
                (
                    <Link href={'/cart'} asChild>
                        <TouchableOpacity className="relative">
                            <View className="w-4 h-4 bg-lime-300 rounded-full items-center justify-center top-2 z-10 -right-3.5">
                                <Text className="text-slate-900 font-bold text-xs">{cardQuatity}</Text>
                            </View>
                            <Feather name="shopping-bag" color={colors.white} size={24} />
                        </TouchableOpacity>
                    </Link>
                )
            }

        </View>
    )
}