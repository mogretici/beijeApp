import React from 'react';
import {
    Svg,
    G,
    Path,
    Ellipse,
    Defs,
    RadialGradient,
    Stop, Circle,
} from 'react-native-svg';
import {View} from "react-native-ui-lib";
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";

interface EllipseOverride {
    rx?: number;
    ry?: number;
    fill?: string;
}

interface CustomSvgProps {
    viewMode: 'near' | 'far';
    ellipseOverrides?: {
        [id: string]: EllipseOverride;
    };
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

const ellipsesData: EllipseData[] = [
    {
        id: '1',
        cx: 6.01593,
        cy: 6,
        rx: 4,
        ry: 4,
        transform: 'matrix(0.994551 0.104249 -0.104809 0.994492 185.274 64.5331)',
        fill: '#F3F3F3',
    },
    {
        id: '2',
        cx: 6.17569,
        cy: 6.16216,
        rx: 4,
        ry: 4,
        transform:
            'matrix(0.951302 0.30826 -0.309775 0.95081 220.662 67.4397)',
        fill: '#F3F3F3',
    },
    {
        id: '3',
        cx: 6.17052,
        cy: 6.16216,
        rx: 4,
        ry: 4,
        transform: 'matrix(0.866611 0.498984 -0.501017 0.865438 253.364 80.439)',
        fill: '#F3F3F3',
    },
    {
        id: '4',
        cx: 6.16391,
        cy: 6.16216,
        rx: 4,
        ry: 4,
        transform:
            'matrix(0.744046 0.668129 -0.670132 0.742242 278.167 96.9414)',
        fill: '#F3F3F3',
    },
    {
        id: '5',
        cx: 2.27821,
        cy: 2.28012,
        rx: 4,
        ry: 4,
        transform:
            'matrix(0.588828 0.808258 -0.809774 0.586743 298.986 122.334)',
        fill: '#F3F3F3',
    },
    {
        id: '6',
        cx: 2.27599,
        cy: 2.28012,
        rx: 4,
        ry: 4,
        transform:
            'matrix(0.407657 0.913135 -0.913954 0.405817 314.914 147.471)',
        fill: '#F3F3F3',
    },
    {
        id: '7',
        cx: 2.27448,
        cy: 2.28012,
        rx: 4,
        ry: 4,
        transform:
            'matrix(0.208451 0.978033 -0.978262 0.207373 325.254 175.361)',
        fill: '#F3F3F3',
    },
    {
        id: '8',
        cx: 327.274,
        cy: 207.059,
        rx: 4,
        ry: 4,
        transform: 'rotate(90 327.274 207.059)',
        fill: '#F3F3F3',
    },
    {
        id: '9',
        cx: 2.27448,
        cy: 2.28012,
        rx: 4,
        ry: 4,
        transform:
            'matrix(-0.208451 0.978033 -0.978262 -0.207373 327.623 234.458)',
        fill: '#F3F3F3',
    },
    {
        id: '10',
        cx: 2.27599,
        cy: 2.28012,
        rx: 4,
        ry: 4,
        transform:
            'matrix(-0.407657 0.913135 -0.913954 -0.405817 319.552 263.083)',
        fill: '#F3F3F3',
    },
    {
        id: '11',
        cx: 6.157,
        cy: 6.16216,
        rx: 4,
        ry: 4,
        transform:
            'matrix(-0.588828 0.808258 -0.809774 -0.586743 310.688 288.516)',
        fill: '#F3F3F3',
    },
    {
        id: '12',
        cx: 6.16391,
        cy: 6.16216,
        rx: 4,
        ry: 4,
        transform:
            'matrix(-0.744046 0.668129 -0.670132 -0.742242 294.637 310.392)',
        fill: '#F3F3F3',
        opacity: 0.76,
    },
    {
        id: '13',
        cx: 6.17052,
        cy: 6.16216,
        rx: 4,
        ry: 4,
        transform:
            'matrix(-0.866611 0.498984 -0.501017 -0.865438 273.237 330.817)',
        fill: '#E4F2F2',
    },
    {
        id: '14',
        cx: 6.17569,
        cy: 6.16216,
        rx: 4,
        ry: 4,
        transform:
            'matrix(-0.951302 0.30826 -0.309775 -0.95081 245.506 344.987)',
        fill: '#E4F2F2',
    },
    {
        id: '15',
        cx: 2.28617,
        cy: 2.28012,
        rx: 4,
        ry: 4,
        transform:
            'matrix(-0.994551 0.104249 -0.104809 -0.994492 207.612 351.219)',
        fill: '#F3F3F3',
    },
    {
        id: '16',
        cx: 2.28617,
        cy: 2.28012,
        rx: 4,
        ry: 4,
        transform:
            'matrix(-0.994551 -0.104249 0.104809 -0.994492 177.819 352.408)',
        fill: '#F3F3F3',
    },
    {
        id: '17',
        cx: 2.28512,
        cy: 2.28012,
        rx: 4,
        ry: 4,
        transform:
            'matrix(-0.951302 -0.30826 0.309775 -0.95081 148.432 347.393)',
        fill: '#F3F3F3',
    },
    {
        id: '18',
        cx: 2.28321,
        cy: 2.28012,
        rx: 4,
        ry: 4,
        transform:
            'matrix(-0.866611 -0.498984 0.501017 -0.865438 120.729 336.394)',
        fill: '#F3F3F3',
    },
    {
        id: '19',
        cx: 2.28076,
        cy: 2.28012,
        rx: 4,
        ry: 4,
        transform:
            'matrix(-0.744046 -0.668129 0.670132 -0.742242 95.9265 319.891)',
        fill: '#F3F3F3',
    },
    {
        id: '20',
        cx: 2.27821,
        cy: 2.28012,
        rx: 4,
        ry: 4,
        transform:
            'matrix(-0.588828 -0.808258 0.809774 -0.586743 75.1071 298.606)',
        fill: '#F3F3F3',
    },
    {
        id: '21',
        cx: 2.27599,
        cy: 2.28012,
        rx: 4,
        ry: 4,
        transform:
            'matrix(-0.407657 -0.913135 0.913954 -0.405817 59.1797 273.47)',
        fill: '#F3F3F3',
    },
    {
        id: '22',
        cx: 2.27448,
        cy: 2.28012,
        rx: 4,
        ry: 4,
        transform:
            'matrix(-0.208451 -0.978033 0.978262 -0.207373 48.839 245.58)',
        fill: '#F3F3F3',
    },
    {
        id: '23',
        cx: 46.8194,
        cy: 213.881,
        rx: 4,
        ry: 4,
        transform: 'rotate(-90 46.8194 213.881)',
        fill: '#F3F3F3',
    },
    {
        id: '24',
        cx: 2.27448,
        cy: 2.28012,
        rx: 4,
        ry: 4,
        transform:
            'matrix(0.208451 -0.978033 0.978262 0.207373 46.4698 186.482)',
        fill: '#F3F3F3',
    },
    {
        id: '25',
        cx: 2.27599,
        cy: 2.28012,
        rx: 4,
        ry: 4,
        transform:
            'matrix(0.407657 -0.913135 0.913954 0.405817 54.5415 157.858)',
        fill: '#F3F3F3',
    },
    {
        id: '26',
        cx: 2.27821,
        cy: 2.28012,
        rx: 4,
        ry: 4,
        transform:
            'matrix(0.588828 -0.808258 0.809774 0.586743 68.4048 131.533)',
        fill: '#F3F3F3',
    },
    {
        id: '27',
        cx: 2.28076,
        cy: 2.28012,
        rx: 4,
        ry: 4,
        transform:
            'matrix(0.744046 -0.668129 0.670132 0.742242 87.4563 108.657)',
        fill: '#F3F3F3',
    },
    {
        id: '28',
        cx: 2.28321,
        cy: 2.28012,
        rx: 4,
        ry: 4,
        transform:
            'matrix(0.866611 -0.498984 0.501017 0.865438 110.856 90.2318)',
        fill: '#F3F3F3',
    },
    {
        id: '29',
        cx: 2.28512,
        cy: 2.28012,
        rx: 4,
        ry: 4,
        transform:
            'matrix(0.951302 -0.30826 0.309775 0.95081 136.588 77.0616)',
        fill: '#F3F3F3',
    },
];

const CircularPicker: React.FC<CustomSvgProps> = ({
    viewMode,
                                                 ellipseOverrides = {},
                                                 onEllipsePress,
                                                 bleedingAreaLength=1,
                                                 bleedingAreaStart=1,
                                                 fertilityAreaLength=1,
                                                 fertilityAreaStart=1,
    currentDay
                                             }) => {
    const bleedingRotation = (360/29.5)*(bleedingAreaStart-8.1)
    const fertilityRotation = (360/29.5)*(fertilityAreaStart-8.1)
    const bleedingLength=(bleedingAreaLength-0.75)/30
    const fertilityLength=(fertilityAreaLength-0.75)/30
    const size =305;
    const strokeWidth = 25.5;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    const rotateValue = useSharedValue((-360 / 29) * (currentDay - 1));

    React.useEffect(() => {
        rotateValue.value = withTiming((-360 / 29.5) * (currentDay - 1), { duration: 300 });
    }, [currentDay]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${rotateValue.value}deg` }]
    }));
    return (
        <View>

            <Animated.View style={animatedStyle}>
            <Svg width={375} height={421}  viewBox="0 0 375 421" fill="none" className='relative'>
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

            <Path
                d="M181.12 71.2452C180.885 64.5335 186.144 58.8517 192.853 59.1542C227.578 60.7203 260.86 74.1594 287.016 97.4228C316.212 123.39 334.287 159.603 337.489 198.545C340.69 237.487 328.773 276.167 304.21 306.554C279.646 336.941 244.325 356.702 205.577 361.734C166.829 366.766 127.631 356.684 96.1209 333.58C64.6104 310.475 43.2076 276.123 36.3555 237.656C29.5034 199.188 37.7282 159.559 59.3227 126.995C78.6686 97.8218 107.413 76.3268 140.586 65.9425C146.995 63.9362 153.531 68.0862 155.019 74.6351C156.507 81.184 152.378 87.6432 146.001 89.7469C118.918 98.6801 95.4805 116.475 79.5911 140.436C61.4517 167.789 54.5428 201.078 60.2986 233.391C66.0544 265.704 84.0328 294.559 110.502 313.967C136.97 333.375 169.896 341.844 202.445 337.617C234.993 333.389 264.663 316.79 285.296 291.265C305.929 265.74 315.94 233.249 313.251 200.538C310.561 167.827 295.378 137.408 270.853 115.595C249.37 96.4881 222.165 85.2708 193.699 83.552C186.995 83.1472 181.354 77.9569 181.12 71.2452Z"
                fill="#FCFCFC"
                // fill="black"
            />

                {
                    viewMode === 'far' && (
                        <>
                            <Circle
                                id="circle-blue"
                                cy={209}
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
                )
                }


                {ellipsesData.map(ellipse => {
                    const override = ellipseOverrides[ellipse.id] || {};
                    const isCurrentDay = viewMode === 'near' && ellipse.id === currentDay.toString();

                    return (
                        <Ellipse
                            key={ellipse.id}
                            cx={ellipse.cx}
                            cy={ellipse.cy}
                            rx={isCurrentDay ? 20 : viewMode==='near'? 8: (override.rx !== undefined ? override.rx : ellipse.rx)}
                            ry={isCurrentDay ? 20 : viewMode==='near'? 8: (override.ry !== undefined ? override.ry : ellipse.ry)}
                            fill={override.fill || ellipse.fill}
                            transform={ellipse.transform}
                            opacity={ellipse.opacity}
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