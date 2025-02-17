import React from 'react';
import {
    Svg,
    G,
    Path,
    Ellipse,
    Defs,
    RadialGradient,
    Stop,
    Circle,
} from 'react-native-svg';
import { View } from 'react-native-ui-lib';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { TouchableOpacity, ViewStyle } from 'react-native';

interface EllipseOverride {
    rx?: number;
    ry?: number;
    fill?: string;
}

interface CustomSvgProps {
    viewMode: 'near' | 'far';
    ellipseOverrides?: { [id: string]: EllipseOverride };
    onEllipsePress?: (id: string) => void;
    bleedingAreaLength?: number;
    bleedingAreaStart?: number;
    fertilityAreaLength?: number;
    fertilityAreaStart?: number;
    currentDay: number;
}

interface EllipseData {
    id: string;
    cx: number;
    cy: number;
    rx: number;
    ry: number;
    transform: string;
    fill: string;
    opacity?: number;
}
const numEllipses = 29;
const centerX = 187.5;
const centerY = 210.5;
const ellipseCircleRadius = 140;

const ellipsesData: EllipseData[] = Array.from({ length: numEllipses }, (_, i) => {
    const angleStep = 360 / numEllipses;
    const angleDeg = angleStep * i - 90;
    const angleRad = angleDeg * (Math.PI / 180);
    const cx = centerX + ellipseCircleRadius * Math.cos(angleRad);
    const cy = centerY + ellipseCircleRadius * Math.sin(angleRad);
    return {
        id: `${i + 1}`,
        cx,
        cy,
        rx: 4,
        ry: 4,
        transform: `rotate(${angleDeg.toFixed(2)} ${cx.toFixed(2)} ${cy.toFixed(2)})`,
        fill: '#F3F3F3',
    };
});

const getEllipsePosition = (ellipse: EllipseData): ViewStyle => ({
    position: 'absolute',
    left: ellipse.cx - 20,
    top: ellipse.cy - 20,
    width: 40,
    height: 40,
    zIndex: 1,
    // backgroundColor: 'rgba(255, 0, 0, 0.2)',
    // borderWidth: 1,
    // borderRadius: 20,
    // borderColor: 'red',
});

const CircularPicker: React.FC<CustomSvgProps> = ({
                                                      viewMode,
                                                      ellipseOverrides = {},
                                                      onEllipsePress,
                                                      bleedingAreaLength = 1,
                                                      bleedingAreaStart = 1,
                                                      fertilityAreaLength = 1,
                                                      fertilityAreaStart = 1,
                                                      currentDay,
                                                  }) => {
    const numEllipses = 29;
    const bleedingRotation = (360 / numEllipses) * (bleedingAreaStart - 1) - 90;
    const fertilityRotation = (360 / numEllipses) * (fertilityAreaStart - 1) - 90;
    const bleedingLength = (bleedingAreaLength - 0.75) / numEllipses;
    const fertilityLength = (fertilityAreaLength - 0.75) / numEllipses;   const size = 305;
    const radius = 140
    const circumference = 2 * Math.PI * radius;
    const arcFraction = 28/30;
    const arcLength = circumference * arcFraction;
    const gapLength = circumference - arcLength;
    const strokeWidth = 26;

    const rotateValue = useSharedValue((-360 / 29) * (currentDay - 1));

    React.useEffect(() => {
        rotateValue.value = withTiming((-360 / 29) * (currentDay - 1), { duration: 300 });
    }, [currentDay]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${rotateValue.value}deg` }],
    }));

    return (
        <View>
            <Animated.View style={animatedStyle} pointerEvents="box-none">
                {ellipsesData.map(ellipse => (
                    <TouchableOpacity
                        key={`touch-${ellipse.id}`}
                        style={getEllipsePosition(ellipse)}
                        onPress={() => {
                            onEllipsePress && onEllipsePress(ellipse.id);
                        }}
                        activeOpacity={0.7}
                    />
                ))}
                <Svg width={375} height={421} viewBox="0 0 375 421" fill="none" pointerEvents="box-none">
                    <Defs>
                        <RadialGradient
                            id="paint0_radial_0_1"
                            cx="0"
                            cy="0"
                            r="1"
                            gradientUnits="userSpaceOnUse"
                            gradientTransform="translate(39.5 110) rotate(41.0613) scale(108.089)"
                        >
                            <Stop offset="0" stopColor="white" />
                            <Stop offset="0.979167" stopColor="white" stopOpacity="0" />
                        </RadialGradient>
                        <RadialGradient
                            id="paint1_radial_0_1"
                            cx="0"
                            cy="0"
                            r="1"
                            gradientUnits="userSpaceOnUse"
                            gradientTransform="translate(298 374) rotate(-132.837) scale(177.964)"
                        >
                            <Stop offset="0.00111343" stopColor="white" />
                            <Stop offset="0.979167" stopColor="white" stopOpacity="0" />
                        </RadialGradient>
                    </Defs>

                    <G>
                        <Path
                            d="M351 210.5C351 300.799 277.799 374 187.5 374C97.2014 374 24 300.799 24 210.5C24 120.201 97.2014 47 187.5 47C277.799 47 351 120.201 351 210.5ZM73.05 210.5C73.05 273.709 124.291 324.95 187.5 324.95C250.709 324.95 301.95 273.709 301.95 210.5C301.95 147.291 250.709 96.05 187.5 96.05C124.291 96.05 73.05 147.291 73.05 210.5Z"
                            fill={`${viewMode === 'near' ? '#FCFCFC' : '#F3F3F3'}`}
                        />
                        <Path
                            d="M351 210.5C351 300.799 277.799 374 187.5 374C97.2014 374 24 300.799 24 210.5C24 120.201 97.2014 47 187.5 47C277.799 47 351 120.201 351 210.5ZM73.05 210.5C73.05 273.709 124.291 324.95 187.5 324.95C250.709 324.95 301.95 273.709 301.95 210.5C301.95 147.291 250.709 96.05 187.5 96.05C124.291 96.05 73.05 147.291 73.05 210.5Z"
                            fill="url(#paint0_radial_0_1)"
                        />
                        <Path
                            d="M351 210.5C351 300.799 277.799 374 187.5 374C97.2014 374 24 300.799 24 210.5C24 120.201 97.2014 47 187.5 47C277.799 47 351 120.201 351 210.5ZM73.05 210.5C73.05 273.709 124.291 324.95 187.5 324.95C250.709 324.95 301.95 273.709 301.95 210.5C301.95 147.291 250.709 96.05 187.5 96.05C124.291 96.05 73.05 147.291 73.05 210.5Z"
                            fill="url(#paint1_radial_0_1)"
                        />
                    </G>

                    <Circle
                        id="circle-white"
                        cy={209}
                        cx={187}
                        r={radius}
                        stroke="#FCFCFC"
                        strokeWidth={strokeWidth}
                        fill="none"
                        originX={187.5}
                        rotation={-90}
                        originY={210.5}
                        strokeDasharray={`${arcLength} ${gapLength}`}
                        strokeLinecap="round"
                    />
                    {viewMode === 'far' && (
                        <>
                            <Circle
                                id="circle-blue"
                                cy={212}
                                cx={187}
                                r={radius}
                                stroke="#BDE1E0"
                                strokeWidth={strokeWidth}
                                fill="none"
                                strokeDasharray={circumference}
                                strokeDashoffset={circumference * (1 - fertilityLength)}
                                rotation={fertilityRotation}
                                originX={187.5}
                                originY={210.5}
                                strokeLinecap="round"
                            />
                            <Circle
                                id="circle-red"
                                cy={209}
                                cx={187}
                                r={radius}
                                stroke="#FBD7CE"
                                strokeWidth={strokeWidth}
                                fill="none"
                                strokeDasharray={circumference}
                                strokeDashoffset={circumference * (1 - bleedingLength)}
                                rotation={bleedingRotation}
                                originX={187.5}
                                originY={210.5}
                                strokeLinecap="round"
                            />
                        </>
                    )}
                    {ellipsesData.map(ellipse => {
                        const override = ellipseOverrides[ellipse.id] || {};
                        const isCurrentDay = viewMode === 'near' && ellipse.id === currentDay.toString();
                        return (
                            <Ellipse
                                key={ellipse.id}
                                cx={ellipse.cx}
                                cy={ellipse.cy}
                                rx={
                                    isCurrentDay
                                        ? 20
                                        : viewMode === 'near'
                                            ? 8
                                            : override.rx !== undefined
                                                ? override.rx
                                                : ellipse.rx
                                }
                                ry={
                                    isCurrentDay
                                        ? 20
                                        : viewMode === 'near'
                                            ? 8
                                            : override.ry !== undefined
                                                ? override.ry
                                                : ellipse.ry
                                }
                                fill={override.fill || ellipse.fill}
                                transform={ellipse.transform}
                                opacity={ellipse.opacity}
                                pointerEvents="auto"
                                onPress={() => onEllipsePress && onEllipsePress(ellipse.id)}
                            />
                        );
                    })}
                </Svg>
            </Animated.View>
        </View>
    );
};

export default CircularPicker;