import React, {useEffect, useState} from 'react';
import {Text,View} from "react-native";
import {useSelector} from "react-redux";
import {RootState} from "@/lib/store";

function NoteCard(
    {
        currentDay
    }: {
        currentDay: number;
    }
) {
    const selectedDay = useSelector((state: RootState) => state.user.selectedDay);

    const [randomNote, setRandomNote] = useState('');
    const randomNotes = [
        'Bugün kendine nazik ol, bedenin ve ruhun her şeyden önemli. 💖',
        'Kendini yorgun hissediyorsan, biraz dinlenmek hakkın. 🌿',
        'Bir bardak sıcak bitki çayı ve sevdiğin bir kitap sana iyi gelebilir. 📖☕',
        'Bugün hislerine kulak ver. Kendini nasıl hissediyorsun? 💭',
        'Unutma, en küçük adımlar bile büyük değişimlere yol açar. 🌱',
        'Bedeninle barış içinde ol. O senin en güçlü yol arkadaşın. 💪',
        'Kendine biraz zaman ayır ve sevdiğin bir şeyi yap. 🎶💃',
        'Duygularını bastırma, onları kucakla. Bugün hissettiğin her şey senin bir parçan.🤍',
        'Biraz temiz hava almak iyi gelebilir. Kısa bir yürüyüş bile mucizeler yaratır. 🚶‍♀️🍃',
        'Su içmeyi unutma, vücudun sana teşekkür edecek. 💧',
        'Bazen en iyi terapi, en sevdiğin filmi tekrar izlemektir. 🎬🍿',
        'Bugün kendine sarılmayı unutma, harikasın! 🤗',
        'Hissettiğin her şey geçici. Kendine karşı sabırlı ol. ⏳',
        'Bugün kendine güzel bir şeyler söyle. Sen çok değerlisin! ✨',
        'Kendini rahatlatmak için derin bir nefes al ve bırak... 🌬️',
        'Bugün yapacakların için acele etme, kendine nazik davran. 💜',
        'Vücudunun ihtiyaçlarını dinle. Uyku, beslenme, hareket… 💤🥗🏃‍♀️',
        'Bazen en iyi çözüm, biraz mola vermektir. 🛑',
        'Hayat inişli çıkışlı olabilir ama sen her zaman güçlüsün. 🌊',
        'Bugün hislerini yazmayı dene. Kelimeler ruhuna iyi gelebilir. ✍️📓',
        'Sen olduğun gibi mükemmelsin. 💕',
        'Bugün kendine küçük bir iyilik yap. Belki bir çiçek alabilirsin? 🌸',
        'Ne hissediyorsan, hissetmene izin ver. Duygularını bastırma. ❤️',
        'Unutma, bedenin mucizeler yaratıyor. Ona iyi davran. 🌟'
    ];

    useEffect(() => {
        const newNote = randomNotes[Math.floor(Math.random() * randomNotes.length)];
        setRandomNote(newNote);
    }, [currentDay]);

    return (
        <View className='w-full flex flex-row gap-5 h-28 bg-white rounded-lg p-5 mt-5'>
            <View className='flex flex-row items-center justify-between'>
                <View
                    className={`${
                        !selectedDay?.type ? 'bg-defaultBg border-defaultBg/95 ' :
                            selectedDay?.type === 'BLEEDING' ? 'bg-bleedingArea border-bleeding' :
                                selectedDay?.type === 'OVULATION' ? 'bg-fertilityArea border-fertility' :
                                    'bg-fertilityArea border-fertility'
                    } w-10 h-10 rounded-full flex items-center justify-center border-2`}
                >
                    <View className={`${
                        !selectedDay?.type ? 'bg-defaultBg' :
                            selectedDay?.type === 'BLEEDING' ? 'bg-bleeding' :
                                selectedDay?.type === 'OVULATION' ? 'bg-ovulation' :
                                    'bg-fertility'
                    } w-5 h-5 rounded-full`}>
                    </View>
                </View>
            </View>
            <View className='flex flex-row items-center justify-between mr-14'>
                <Text className='font-[Gordita]'>{selectedDay?.note || randomNote}</Text>
            </View>
        </View>
    );
}

export default NoteCard;