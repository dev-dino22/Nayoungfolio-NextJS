'use client';
import React, { useEffect, useState } from 'react';
import GridLayout, { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import styled from 'styled-components';
import Hello from './Hello';
import Contact from './Contact';
import PortfolioBanner from './PortfolioBanner';
import LinkSNS from './LinkSNS';
import InfoTXT from './InfoTXT';
import PhotoNayoung from './PhotoNayoung';
import Ticket from './Ticket';
import { useRouter } from 'next/navigation';
import IntroduceAlert from './IntroduceAlert';
import { useWindowSize } from '../../../context/WindowSizeContext';
import { useNavMenu } from '../../../context/NavContext'; // NavContext에서 가져오기

////////////// 인터페이스 정의 ////////////////////////////

interface IonClose {
    onClose: () => void;
}

//////////////  Style 컴포넌트들 시작 /////////////////////
const AlertContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
    background-color: #ffffff9a;
    position: absolute;
    justify-content: center;
    z-index: 4;
    backdrop-filter: blur(8px);
`;

const Container = styled.div<{ height: number }>`
    height: ${props => props.height}px; // botHeight를 사용하여 높이 설정
    overflow: hidden; // 스크롤을 숨기기 위해 overflow를 hidden으로 설정
`;

const Card = styled.div`
    //Card
`;

const TicketCard = styled(Ticket)`
    // Ticket
`;

const HelloCard = styled(Hello)`
  // Hello
`;

const ContactCard = styled(Contact)`
    //contact 
`;

const PortfolioCard = styled(PortfolioBanner)`
//portfolio
`;

const LinkSNSCard = styled(LinkSNS)`
//LinkSNS Comp
`;

const InfoTXTCard = styled(InfoTXT)`
    //InfoTXT
`;

const PhotoNayoungCard = styled(PhotoNayoung)`
    //nayoung
`;
//////////  Style 컴포넌트들 시작 끝 ///////////

//////////  ResponsiveGridLayout 정의 /////////////
const ResponsiveGridLayout = WidthProvider(Responsive);

////////// 메인 컴포넌트 작성 시작 ///////////
const BentoBoxGrid = () => {
    const router = useRouter();
    const [isSelected, setIsSelected] = useState<string>('Go to...');
    const handleMouseEnter = (cardName: string) => { setIsSelected(cardName); };
    const handleMouseLeave = () => { setIsSelected('Go to...'); };
    const [clickPhoto, setClickPhoto] = useState<boolean>(false);

    // WindowSizeContext에서 width와 height 가져오기
    const { width, height } = useWindowSize();
    const { botHeight } = useNavMenu(); // NavContext에서 botHeight 가져오기

    // 화면 높이를 기반으로 rowHeight 동적 계산
    const getRowHeight = () => {
        const baseHeight = height; // WindowSizeContext에서 가져온 height 사용
        return baseHeight / 12 - 18; // 20px은 마진을 고려한 값
    };

    // rowHeight 상태 관리
    const [rowHeight, setRowHeight] = useState(getRowHeight());

    // 화면 크기가 변경될 때마다 rowHeight 업데이트
    useEffect(() => {
        setRowHeight(getRowHeight());
    }, [height]); // height가 변경될 때마다 실행

    // Playground 티켓 클릭 시 알람
    const onClick = () => { alert('아직 입장이 불가합니다.'); };

    // 그리드 레이아웃 설정
    const layouts = {
        fhd: [
            { i: 'ticket', x: 0, y: 0, w: 2, h: 10 },
            { i: 'hello', x: 2, y: 0, w: 8, h: 7, },
            { i: 'portfolio', x: 2, y: 0, w: 7, h: 3 },
            { i: 'sns', x: 12, y: 0, w: 2, h: 2 },
            { i: 'info', x: 12, y: 1, w: 2, h: 1 },
            { i: 'photo', x: 12, y: 2, w: 2, h: 4 },
            { i: 'contact', x: 12, y: 3, w: 3, h: 3 },
        ],
        // 추가 브레이크포인트 정의 가능...
    };

    return (
        <Container height={botHeight}> {/* botHeight를 사용하여 높이 설정 */}
            {clickPhoto &&
                <AlertContainer>
                    <IntroduceAlert onClose={() => setClickPhoto(false)} />
                </AlertContainer>
            }

            <ResponsiveGridLayout
                className="layout"
                layouts={layouts}
                breakpoints={{ fhd: 1200 }}
                cols={{ fhd: 12 }}
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
                    <HelloCard isSelected={isSelected} />
                </Card>
                <Card key="portfolio" style={{ cursor: 'pointer' }} onMouseEnter={() => handleMouseEnter('Portfolio')} onMouseLeave={handleMouseLeave}>
                    <PortfolioCard />
                </Card>
                <Card key="sns" style={{ cursor: 'pointer' }} onMouseEnter={() => handleMouseEnter('SNS Links')} onMouseLeave={handleMouseLeave}>
                    <LinkSNSCard />
                </Card>
                <Card key="info" onMouseEnter={() => handleMouseEnter('Information')} onMouseLeave={handleMouseLeave}>
                    <InfoTXTCard />
                </Card>
                <Card key="photo" style={{ cursor: 'pointer' }} onMouseEnter={() => handleMouseEnter('Personal Statement')} onMouseLeave={handleMouseLeave} onClick={() => setClickPhoto(!clickPhoto)}>
                    <PhotoNayoungCard />
                </Card>
                <Card key="contact" style={{ cursor: 'pointer' }} onMouseEnter={() => handleMouseEnter('Contact')} onMouseLeave={handleMouseLeave}>
                    <ContactCard />
                </Card>
            </ResponsiveGridLayout>
        </Container>
    );
};

export default BentoBoxGrid;
