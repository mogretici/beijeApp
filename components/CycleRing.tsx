import { View } from 'react-native';
import CircularCyclePicker from "@/components/CircularPicker";
import {useDispatch, useSelector} from "react-redux";
import { RootState } from "@/lib/store";
import { Text } from "react-native-ui-lib";
import React, {useEffect} from "react";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import {Image} from "expo-image";
import {setSelectedDay} from "@/lib/slices/userSlice";
import {bleedingColor, fertilityColor, ovulationColor} from "@/lib/constants/colors";

export default function CycleRing(
    {
        currentDay,
        toggleCurrentDay,
        viewMode,
        toggleViewMode
    }: {
        currentDay: number;
        toggleCurrentDay: (day: number) => void;
        viewMode: 'near' | 'far';
        toggleViewMode: (mode: 'near' | 'far') => void;
    }
) {
    const { menstruationDays } = useSelector((state: RootState) => state.user);

    const scaleValue = useSharedValue(1);
    const marginTopValue = useSharedValue(0);


    useEffect(() => {

        if (viewMode === 'near') {
            scaleValue.value = withTiming(2.4, { duration: 300 });
            marginTopValue.value = withTiming(190, { duration: 300 });
        } else {
            scaleValue.value = withTiming(1, { duration: 300 });
            marginTopValue.value = withTiming(0, { duration: 300 });
        }
    }, [viewMode]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scaleValue.value }],
        marginTop: marginTopValue.value
    }));

    const [currentDate, bleedingDays, ovulationDays, fertilityDays] = menstruationDays.reduce(
        (acc, curr) => {
            if (acc[0] === "") acc[0] = curr.date;
            if (curr.type === 'BLEEDING') {
                acc[1].push(Number(curr.date.split('-')[2]));
            } else if (curr.type === 'OVULATION') {
                acc[2].push(Number(curr.date.split('-')[2]));
            } else if (curr.type === 'FERTILITY') {
                acc[3].push(Number(curr.date.split('-')[2]));
            }
            return acc;
        },
        [ "", [], [], [] ] as [string, number[], number[], number[]]
    );



    const ellipseOverrides = {
        ...bleedingDays.reduce((acc, day) => {
            acc[day] = { rx: 6, ry: 6, fill: bleedingColor };
            return acc;
        }, {} as Record<number, { rx: number; ry: number; fill: string }>),
        ...ovulationDays.reduce((acc, day) => {
            acc[day] = { rx: 6, ry: 6, fill: ovulationColor };
            return acc;
        }, {} as Record<number, { rx: number; ry: number; fill: string }>),
        ...fertilityDays.reduce((acc, day) => {
            acc[day] = { rx: 6, ry: 6, fill: fertilityColor };
            return acc;
        }, {} as Record<number, { rx: number; ry: number; fill: string }>)
    };

    const currentMonthString = new Date().toLocaleString('tr-TR', { month: 'long' });
    const dispatch = useDispatch();

    const handleEllipsePress = (id: string) => {
        const selected = menstruationDays.find((day) => {
            return Number(day.date.split('-')[2]) === Number(id);
        });
        if (selected) dispatch(setSelectedDay(selected));
         else dispatch(setSelectedDay(null));
        toggleViewMode("near");
        toggleCurrentDay(Number(id));
    };

    useEffect(() => {
        const date = new Date();
        const selected = menstruationDays.find((day) => {
            return Number(day.date.split('-')[2]) === date.getDate();
        });
        if (selected) dispatch(setSelectedDay(selected));
    }, []);
    return (
        <View
        >
            <Text
                className='font-[Gordita] text-[#343131] font-black '
                style={{  textAlign: 'center', fontSize: 18 }}
            >
                {currentDay} {currentMonthString}
            </Text>
            {
                viewMode==='near'&&(
                    <Image
                        source={require('@/assets/icons/arrow-down.png')}
                        style={{  width: 18, height: 18, alignSelf: 'center',marginTop: 10 }}
                    />
                )
            }
            <Animated.View style={animatedStyle}>
                <CircularCyclePicker
                    viewMode={viewMode}
                    currentDay={currentDay}
                    ellipseOverrides={ellipseOverrides}
                    bleedingAreaStart={bleedingDays[0]}
                    bleedingAreaLength={bleedingDays.length}
                    fertilityAreaLength={fertilityDays.length + ovulationDays.length}
                    fertilityAreaStart={fertilityDays[0]}
                    onEllipsePress={handleEllipsePress}
                />
            </Animated.View>
        </View>
    );
}