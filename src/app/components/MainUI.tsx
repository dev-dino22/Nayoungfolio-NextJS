'use client';

import React from 'react';
import { useWindowSize } from '@/context/WindowSizeContext';
import MBentoUI from './mobile/MBentoUI';
import BentoUI from './pc/BentoUI';

function MainUI() {
    const { isMobile } = useWindowSize(); // isMobile을 WindowSizeContext에서 가져옴

    return (
        <>
            {isMobile ? <MBentoUI /> : <BentoUI />}
        </>
    );
}

export default MainUI;
