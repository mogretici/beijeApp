import { Text, View, ImageBackground } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

export default function CycleScreen() {
    const { profile, loading } = useSelector((state: RootState) => state.user);

    return (
        <ImageBackground
            source={require("../../assets/images/bg.jpg")}
            className="flex flex-1 items-center justify-center"
            resizeMode="cover"
        >
            {profile ?
                <View className="flex flex-1 items-center justify-center ">
                    <>
                        <Text className="text-lg font-bold text-black">Cycle Screen</Text>
                            <View className="mt-4 bg-white/80 p-4 rounded-lg">
                                <Text className="text-md text-gray-900">
                                    Ad: {profile.profileInfo.firstName} {profile.profileInfo.lastName}
                                </Text>
                                <Text className="text-md text-gray-900">
                                    E-posta: {profile.profileInfo.email}
                                </Text>
                                <Text className="text-md text-gray-900">
                                    Doğum Tarihi: {profile.profileInfo.birthDate}
                                </Text>
                            </View>
                    </>
            </View>
            : loading ? <Text className="text-lg font-bold text-white">Loading...</Text> : null
            }
        </ImageBackground>
    );
}