import { ImageBackground, Pressable} from "react-native";
import CycleRing from "@/components/CycleRing";
import React from "react";
import BeijeBottom from "@/components/BeijeBottom";
import {View,Text} from "react-native";
import {RootState} from "@/lib/store";
import {useSelector} from "react-redux";
import {Image} from "expo-image";

export default function CycleScreen() {
    const [viewMode, setViewMode] = React.useState<'near' | 'far'>('far');
    const [currentDay, setCurrentDay] = React.useState<number>(new Date().getDate());
    const {profile} = useSelector((state: RootState) => state.user);
    const toggleViewMode = (mode: 'near' | 'far') => {
        setViewMode(mode);
    };

    const toggleCurrentDay = (day: number) => {
        setCurrentDay(day);
    }

    return (
        <ImageBackground
            source={require("../../assets/images/bg.jpg")}
            className="flex flex-1 items-center justify-center"
            resizeMode="cover"
        >
            <Pressable
                style={{ flex: 1,height: '100%', width: '100%', alignItems: 'center', justifyContent: 'space-between', paddingTop: 70,marginBottom: 250 }}
                onPress={() => toggleViewMode('far')}
            >
            <View className={`flex flex-row items-center justify-between ml-10 w-full pl-2 `}>
                <View
                 className='flex rounded-full bg-bleeding/70 w-10 h-10 items-center justify-center'
                >
                    <Text
                        className="text-xl text-white font-[Gordita] ">
                        {
                            (profile?.profileInfo.firstName)?.charAt(0).toUpperCase()
                        }

                    </Text>
                </View>
                <View
                    className='flex rounded-full bg-white w-10 h-10 mr-10 items-center justify-center'
                >
                    <Image
                        source={require('../../assets/icons/notify-icon.png')}
                        style={{ width: 16, height: 20 }}
                    />
                </View>
            </View>
                <CycleRing
                    currentDay={currentDay}
                    toggleCurrentDay={toggleCurrentDay}
                    viewMode={viewMode}
                    toggleViewMode={toggleViewMode} />
            </Pressable>
            <BeijeBottom
                currentDay={currentDay}
                toggleViewMode={toggleViewMode}
                viewMode={viewMode}
            />
        </ImageBackground>
    );
}