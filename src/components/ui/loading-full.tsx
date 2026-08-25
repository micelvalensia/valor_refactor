import Image from "next/image";

export function LoadingFull() {
    return (
        <div className="fixed inset-0 bg-[#0F0F0F] flex items-center justify-center px-4">
            <div
                className="w-full max-w-[360px] min-w-[240px] flex flex-col items-center rounded-xl px-8 py-10"
                style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "0.5px solid rgba(0,255,136,0.2)",
                    backdropFilter: "blur(12px)",
                }}
            >
                {/* Logo */}
                <div className="flex flex-col items-center gap-2.5 mb-8">
                    <div className="relative w-[52px] h-[52px]">
                        <Image
                            alt="Logo"
                            src={"/icon.png"}
                            fill
                            className="object-contain rounded-full border-2 border-[rgba(0,255,136,0.2)]"
                        />                    </div>
                    <span
                        className="text-white text-lg tracking-widest uppercase"
                        style={{ fontWeight: 800 }}
                    >
                        Valor <span style={{ color: "#38C67A" }}>Refactor</span>
                    </span>
                </div>

                {/* Divider */}
                <div
                    className="w-full mb-8"
                    style={{ height: "0.5px", background: "rgba(0,255,136,0.12)" }}
                />

                {/* Spinning dots */}
                <div className="flex gap-[6px] items-center">
                    {[0, 150, 300].map((delay) => (
                        <div
                            key={delay}
                            className="w-[7px] h-[7px] rounded-full"
                            style={{
                                background: "#00FF88",
                                animation: `blink 1.2s ${delay}ms ease-in-out infinite`,
                            }}
                        />
                    ))}
                </div>
            </div>

            <style>{`
                @keyframes blink {
                    0%, 100% { opacity: 0.15; transform: scale(0.8); }
                    50% { opacity: 1; transform: scale(1); }
                }
            `}</style>
        </div>
    );
}