'use client';

import React, { useEffect, useState } from 'react';
import GridLayout, { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import styled from 'styled-components';
import MHello from './MHello';
import Contact from '../pc/Contact';
import MPortfolioBanner from './MPortfolioBanner';
import LinkSNS from '../pc/LinkSNS';
import InfoTXT from '../pc//InfoTXT';
import PhotoNayoung from '../pc/PhotoNayoung';
import MTicket from './MTicket';
import { useRouter } from 'next/navigation';
import { useWindowSize } from '../../../context/WindowSizeContext';

//////////////  Style 컴포넌트들 시작 /////////////////////
const Card = styled.div`
    //Card
`;

const TicketCard = styled(MTicket)`
    // Ticket
`;

const HelloCard = styled(MHello)`
  // Hello
`;

const ContactCard = styled(Contact)`
    //contact 
`;

const PortfolioCard = styled(MPortfolioBanner)`
//portfolio
`;

const LinkSNSCard = styled(LinkSNS)`
//LinkSNS Comp
`;

const PhotoNayoungCard = styled(PhotoNayoung)`
    //nayoung
`;
//////////  Style 컴포넌트들 시작 끝 ///////////

//////////  ResponsiveGridLayout 정의 /////////////
const ResponsiveGridLayout = WidthProvider(Responsive);

////////// 메인 컴포넌트 작성 시작 ///////////
const MBentoBoxGrid = () => {
    const router = useRouter();
    const { width, height } = useWindowSize(); // 전역 상태에서 windowSize 가져오기
    const [isSelected, setIsSelected] = useState<string>('Go to...');
    // 각 카드 마우스 호버 시 카드 이름 저장 핸들러
    const handleMouseEnter = (cardName: string) => { setIsSelected(cardName); };
    const handleMouseLeave = () => { setIsSelected('Go to...'); };

    // 화면 높이를 기반으로 rowHeight 동적 계산
    const getRowHeight = () => {
        const baseHeight = height; // height를 사용
        return baseHeight / 40 - 10;
    };

    // rowHeight 상태 관리
    const [rowHeight, setRowHeight] = useState(getRowHeight());

    // 화면 크기가 변경될 때마다 rowHeight 업데이트
    useEffect(() => {
        setRowHeight(getRowHeight());
    }, [width, height]); // width와 height에 따라 업데이트

    // Playground 티켓 클릭 시 알람
    const onClick = () => { alert('아직 입장이 불가합니다.'); };

    // 그리드 레이아웃 설정
    const layouts = {
        fhd: [
            { i: 'hello', x: 2, y: 0, w: 6, h: 7 },
            { i: 'ticket', x: 0, y: 1, w: 6, h: 4 },
            { i: 'portfolio', x: 0, y: 2, w: 3, h: 13 },
            { i: 'sns', x: 12, y: 3, w: 3, h: 3 },
            { i: 'photo', x: 12, y: 5, w: 3, h: 7 },
            { i: 'contact', x: 12, y: 4, w: 3, h: 3 },
        ],

        // 추가 브레이크포인트 정의 가능...
    };


    return (
        <ResponsiveGridLayout
            className="layout"
            layouts={layouts}
            breakpoints={{ fhd: 1200 }}
            cols={{ fhd: 6 }}
            rowHeight={rowHeight} // 동적으로 계산된 rowHeight 적용
            style={{ width: '100%', height: '100%', }}
            margin={[15, 20]}
            isDraggable={false}
            isResizable={false}
        >
            <Card key="ticket" style={{ cursor: 'no-drop' }} onClick={onClick} onMouseEnter={() => handleMouseEnter('Playground')} onMouseLeave={handleMouseLeave}>
                <TicketCard />
            </Card>
            <Card key="hello" >
                <HelloCard />
            </Card>
            <Card key="portfolio" style={{ cursor: 'pointer' }} onMouseEnter={() => handleMouseEnter('Portfolio')} onMouseLeave={handleMouseLeave} onClick={() => router.push("/portfolio")}>
                <PortfolioCard />
            </Card>
            <Card key="sns" style={{ cursor: 'pointer' }} onMouseEnter={() => handleMouseEnter('SNS Links')} onMouseLeave={handleMouseLeave}>
                <LinkSNSCard />
            </Card>
            <Card key="photo" style={{ cursor: 'pointer' }} onMouseEnter={() => handleMouseEnter('Personal Statement')} onMouseLeave={handleMouseLeave}>
                <PhotoNayoungCard />
            </Card>
            <Card key="contact" style={{ cursor: 'pointer' }} onMouseEnter={() => handleMouseEnter('Contact')} onMouseLeave={handleMouseLeave}>
                <ContactCard />
            </Card>

        </ResponsiveGridLayout>
    );
};

export default MBentoBoxGrid;
