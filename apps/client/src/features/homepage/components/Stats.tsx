
const Stats = () => (
    <div className="bg-gray-900/100 border-gray-700 backdrop-blur-sm py-16 mx-10">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                    { value: "10k+", label: "Active Users" },
                    { value: "1M+", label: "Pomodoros Completed" },
                    { value: "98%", label: "Team Efficiency" },
                    { value: "24/7", label: "Support" }
                ].map((stat, index) => (
                    <div key={index} className="text-center">
                        <div className="text-4xl font-bold text-blue-400 mb-2">{stat.value}</div>
                        <div className="text-gray-400">{stat.label}</div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default Stats;
