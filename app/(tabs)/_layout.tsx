import {Tabs} from 'expo-router';
import React from 'react';
import { View ,TouchableOpacity} from "react-native";
import { Image } from 'expo-image';


export default function TabLayout() {

    return (
            <Tabs
                screenOptions={{
                    tabBarShowLabel: true,
                    headerShown: false,
                    tabBarStyle: {
                        height: 100,
                        paddingTop: 10,
                        backgroundColor: "#f7f7f7",
                    },
                }}
            >
                <Tabs.Screen
                    name="cycle"
                    options={{
                        tabBarLabel: 'Döngü',
                        tabBarLabelStyle: {
                            color: '#343131',
                            fontFamily: 'Gordita',
                            paddingTop: 1,
                        },
                        tabBarIcon: ({color, focused}) => (
                            <Image
                                source={require('../../assets/icons/cycle.svg')}
                                style={{width: 24, height: 24}}
                                contentFit="contain"
                                transition={1000}
                            />
                        ),
                        tabBarButton: (props) => (
                            <View {...props} pointerEvents="none">
                                <TouchableOpacity activeOpacity={1}>
                                    {props.children}
                                </TouchableOpacity>
                            </View>
                        ),
                    }}
                />
                <Tabs.Screen
                    name="calendar"
                    options={{
                        tabBarLabel: 'Takvim',
                        tabBarLabelStyle: {
                            color: '#b1b1b1',
                            fontFamily: 'Gordita',
                            paddingTop: 2,

                        },
                        tabBarIcon: ({color, focused}) => (
                            <Image
                                source={require('../../assets/icons/calendar.svg')}
                                style={{width: 24, height: 24}}
                                contentFit="contain"
                                transition={1000}
                            />
                        ),
                        tabBarButton: (props) => (
                            <View {...props} pointerEvents="none">
                                <TouchableOpacity activeOpacity={1}>
                                    {props.children}
                                </TouchableOpacity>
                            </View>
                        ),
                    }}
                />
                <Tabs.Screen
                    name="analytics"
                    options={{
                        tabBarLabel: 'Analiz',
                        tabBarLabelStyle: {
                            color: '#b1b1b1',
                            fontFamily: 'Gordita',
                            paddingTop: 2,

                        },
                        tabBarIcon: ({color, focused}) => (
                            <Image
                                source={require('../../assets/icons/analytics.svg')}
                                style={{width: 24, height: 24}}
                                contentFit="contain"
                                transition={1000}
                            />
                        ),
                        tabBarButton: (props) => (
                            <View {...props} pointerEvents="none">
                                <TouchableOpacity activeOpacity={1}>
                                    {props.children}
                                </TouchableOpacity>
                            </View>
                        ),
                    }}
                />
                <Tabs.Screen
                    name="guide"
                    options={{
                        tabBarLabel: 'Rehber',
                        tabBarLabelStyle: {
                            color: '#b1b1b1',
                            fontFamily: 'Gordita',
                            paddingTop: 2,

                        },
                        tabBarIcon: ({color, focused}) => (
                            <Image
                                source={require('../../assets/icons/guide.svg')}
                                style={{width: 24, height: 24}}
                                contentFit="contain"
                                transition={1000}
                            />
                        ),
                        tabBarButton: (props) => (
                            <View {...props} pointerEvents="none">
                                <TouchableOpacity activeOpacity={1}>
                                    {props.children}
                                </TouchableOpacity>
                            </View>
                        ),
                    }}
                />
            </Tabs>
    );
}