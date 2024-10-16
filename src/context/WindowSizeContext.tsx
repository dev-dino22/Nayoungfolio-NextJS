// context/WindowSizeContext.tsx
'use client'; // 클라이언트 사이드에서만 동작

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Context 생성
interface WindowSize {
    width: number;
    height: number;
    isMobile: boolean; // isMobile 추가
}

const WindowSizeContext = createContext<WindowSize | null>(null); // null 대신 WindowSize 타입 사용

// WindowSizeProvider: 전역 상태 제공
interface WindowSizeProviderProps {
    children: ReactNode; // children의 타입을 명시적으로 지정
}

export function WindowSizeProvider({ children }: WindowSizeProviderProps) {
    const [windowSize, setWindowSize] = useState<WindowSize>({
        width: 0,
        height: 0,
        isMobile: false, // 초기값 설정
    });

    useEffect(() => {
        // 윈도우 리사이즈 시 크기 업데이트
        function handleResize() {
            const width = window.innerWidth;
            setWindowSize({
                width,
                height: window.innerHeight,
                isMobile: width < 991, // 모바일 여부 업데이트
            });
        }

        // 초기 크기 설정
        handleResize();

        // 이벤트 리스너 추가
        window.addEventListener('resize', handleResize);

        // 컴포넌트 언마운트 시 이벤트 리스너 제거
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <WindowSizeContext.Provider value={windowSize}>
            {children}
        </WindowSizeContext.Provider>
    );
}

// Hook: Context를 쉽게 사용할 수 있는 함수
export function useWindowSize() {
    const context = useContext(WindowSizeContext);
    if (context === null) {
        throw new Error('useWindowSize must be used within a WindowSizeProvider');
    }
    return context;
}
