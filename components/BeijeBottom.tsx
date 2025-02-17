import React, { useCallback, useRef } from 'react';
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Text } from "react-native";
import NoteCard from "@/components/NoteCard";

function BeijeBottom(
    {
        currentDay,
        toggleViewMode,
        viewMode
    }: {
        currentDay: number;
        toggleViewMode: (mode: 'near' | 'far') => void;
        viewMode: 'near' | 'far';
    }
) {
    const bottomSheetRef = useRef<BottomSheet>(null);

    const handleSheetChanges = useCallback((index: number) => {
        toggleViewMode(index === 0 ? 'far' : 'near');
    }, []);


    return (
        <BottomSheet
            ref={bottomSheetRef}
            snapPoints={['17%', '55%']}
            index={viewMode === 'near' ? 1 : 0}
            backgroundStyle={{ backgroundColor: '#f7f7f7' }}
            enableDynamicSizing={false}
            onChange={handleSheetChanges}
            handleIndicatorStyle={{ backgroundColor: '#696969', opacity:0.2 }}

        >
            <BottomSheetView className='flex-1 mx-10 mt-5'>
                <Text className='text-2xl font-[Gordita] font-medium'>Bugün Öne Çıkanlar</Text>
                <NoteCard
                    currentDay={currentDay}
                />
            </BottomSheetView>
        </BottomSheet>
    );
}

export default BeijeBottom;