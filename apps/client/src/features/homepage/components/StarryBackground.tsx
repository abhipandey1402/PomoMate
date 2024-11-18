import { useEffect } from "react";

const StarryBackground = () => {
    useEffect(() => {
        const canvas = document.getElementById("starry-background") as HTMLCanvasElement;
        const ctx = canvas.getContext("2d");
        const stars = Array(100).fill(null).map(() => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2,
        }));

        const render = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#ffffff";
            stars.forEach((star) => {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fill();
            });
            requestAnimationFrame(render);
        };

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        render();

        window.addEventListener("resize", () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        return () => window.removeEventListener("resize", () => { });
    }, []);

    return <canvas id="starry-background" className="fixed inset-0 z-0 pointer-events-none"></canvas>;
};

export default StarryBackground;
