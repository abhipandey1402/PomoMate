import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import TimerDisplay from '../components/TimerDisplay';
import SessionInfo from '../components/SessionInfo';
import TimerControls from '../components/TimerControls';
import CustomizeTimer from '../components/CustomizeTimer';
import usePomodoroTimer from '../hooks/usePomodoroTimer';
import { formatTime } from '../utils/timeFormatter';
import styled from 'styled-components';

const PomodoroPage: React.FC = () => {
    const {
        workTime,
        breakTime,
        timeLeft,
        isRunning,
        sessionType,
        isCustomizing,
        setWorkTime,
        setBreakTime,
        setTimeLeft,
        setIsRunning,
        setSessionType,
        setIsCustomizing,
        audioRef,
    } = usePomodoroTimer();

    return (
        <Container>
            <Card className="bg-gradient-to-br from-black via-gray-900 to-black text-white  w-2/6 h-2/4 max-w-full mx-auto px-10 py-10 flex-col items-center justify-items-center">
                <CardContent className="flex-col justify-items-center items-center">
                    <audio ref={audioRef} src="/api/placeholder/bell.mp3" />

                    {!isCustomizing ? (
                        <>
                            <SessionInfo
                                workTime={workTime}
                                breakTime={breakTime}
                                sessionType={sessionType}
                                onCustomize={() => setIsCustomizing(true)}
                            />
                            <TimerDisplay timeLeft={timeLeft} formatTime={formatTime} />
                            <TimerControls
                                isRunning={isRunning}
                                onStart={() => setIsRunning(true)}
                                onPause={() => setIsRunning(false)}
                                onReset={() => {
                                    setTimeLeft(workTime * 60);
                                    setSessionType('work');
                                    setIsRunning(false);
                                }}
                            />
                        </>
                    ) : (
                        <CustomizeTimer
                            workTime={workTime}
                            breakTime={breakTime}
                            onWorkTimeChange={setWorkTime}
                            onBreakTimeChange={setBreakTime}
                            onApply={() => {
                                setTimeLeft(workTime * 60);
                                setIsCustomizing(false);
                            }}
                        />
                    )}
                </CardContent>
            </Card>
        </Container>
    );
};

export default PomodoroPage;



const Container = styled.div`
width: 98vw;
height: 100vh;
box-sizing: border-box;
display: flex;
align-items: center;
justify-content: center;
margin: auto;



`