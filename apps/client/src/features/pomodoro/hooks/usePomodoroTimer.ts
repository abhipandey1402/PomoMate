import { useState, useEffect, useRef } from 'react';

const usePomodoroTimer = (defaultWorkTime = 25, defaultBreakTime = 5) => {
    const [workTime, setWorkTime] = useState(defaultWorkTime);
    const [breakTime, setBreakTime] = useState(defaultBreakTime);
    const [timeLeft, setTimeLeft] = useState(defaultWorkTime * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [sessionType, setSessionType] = useState('work');
    const [rounds, setRounds] = useState(0);
    const [isCustomizing, setIsCustomizing] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined;
        if (isRunning && timeLeft > 0) {
            interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
        } else if (timeLeft === 0) {
            handleSessionEnd();
        }
        return () => clearInterval(interval);
    }, [isRunning, timeLeft]);

    const playNotification = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    };

    const handleSessionEnd = () => {
        playNotification();
        if (sessionType === 'work') {
            setRounds((prev) => prev + 1);
            setSessionType('break');
            setTimeLeft(breakTime * 60);
        } else {
            setSessionType('work');
            setTimeLeft(workTime * 60);
        }
        setIsRunning(false);
    };

    return {
        workTime,
        breakTime,
        timeLeft,
        isRunning,
        sessionType,
        rounds,
        isCustomizing,
        audioRef,
        setWorkTime,
        setBreakTime,
        setTimeLeft,
        setIsRunning,
        setSessionType,
        setIsCustomizing,
        playNotification,
        handleSessionEnd,
    };
};

export default usePomodoroTimer;
