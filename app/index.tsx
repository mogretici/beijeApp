import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import LottieView from "lottie-react-native";
import { router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { loginUser, fetchProfile, fetchMenstruationDays, fetchInsights } from "@/lib/thunks/userThunks";

export default function SplashScreen() {
    const animation = useRef<LottieView>(null);
    const [animationCount, setAnimationCount] = useState(0);
    const dispatch = useDispatch<AppDispatch>();

    const { token, profile, menstruationDays, insights } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        dispatch(loginUser());
    }, [dispatch]);

    useEffect(() => {
        if (token) {
            dispatch(fetchProfile());
            dispatch(fetchMenstruationDays());
            dispatch(fetchInsights());
        }
    }, [token, dispatch]);

    useEffect(() => {
        if (animationCount >= 3 && profile && menstruationDays.length > 0 && insights.length > 0) {
            router.push("/(tabs)/cycle");
        }
    }, [animationCount, profile, menstruationDays, insights]);

    return (
        <View className="flex flex-1 items-center justify-center">
            <LinearGradient colors={["#FDF4F1", "#FBE9E5", "#FAE6E2"]} style={StyleSheet.absoluteFillObject} />
            <View className="flex flex-1 items-center justify-center">
                <LottieView
                    autoPlay
                    loop={false}
                    ref={animation}
                    style={{ width: 200, height: 200 }}
                    source={require("../assets/animations/animation_splash.json")}
                    onAnimationFinish={() => {
                        setAnimationCount((prev) => prev + 1);
                        if (animationCount < 2) animation.current?.play();
                    }}
                />
            </View>

            <Image source={require("../assets/logo.png")} className="bottom-20 w-20 h-8 object-contain" />
        </View>
    );
}