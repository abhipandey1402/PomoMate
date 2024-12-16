import { useState } from 'react';

export const useCurrentDay = () => {
    const [currentDay, setCurrentDay] = useState({
        date: 13,
        day: "Friday",
        month: "December",
    });

    return currentDay;
};
