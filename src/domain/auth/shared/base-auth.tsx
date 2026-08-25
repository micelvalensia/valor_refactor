import Image from "next/image";

type BaseAuthProps = {
    children: React.ReactNode;
    type: "login" | "register";
    direction?: 'left' | 'right';
};

export function BaseAuth({ children, direction = 'left', type }: BaseAuthProps) {
    return (
        <div className="bg-background flex items-center justify-center">
            <div className="w-full max-w-full ">
                {/* Desktop Layout */}
                <div className="hidden md:flex rounded-lg overflow-hidden shadow-2xl min-h-dvh">
                    {direction === 'left' ? (
                        <>
                            {/* Circle Section - Left */}
                            <div className="w-[40%] flex relative p-10 @container">
                                {/* Logo */}
                                <div className="absolute top-10 left-10 right-10 flex items-center gap-4">
                                    <Image
                                        alt="logo"
                                        src="/icon.png"
                                        width={80}
                                        height={80}
                                        className="w-[clamp(32px,8cqw,80px)] h-auto rounded-lg"
                                    />

                                    <span className="text-white font-semibold text-[clamp(1rem,3cqw,1.6rem)]">
                                        DevForum
                                    </span>
                                </div>

                                {/* Mascot */}
                                {type === "login" ? (
                                    <Image
                                        alt="mascot"
                                        src="/mascot/login-mascot.webp"
                                        width={900}
                                        height={800}
                                        className="absolute w-[70%] h-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                                    />
                                ) : (
                                    <Image
                                        alt="mascot"
                                        src="/mascot/register-mascot.webp"
                                        width={900}
                                        height={800}
                                        className="absolute w-[80%] h-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                                    />
                                )}
                            </div>
                            {/* Form Section - Right */}
                            <div className="w-[60%] text-white p-12 bg-[#232229] rounded-tl-[5rem] rounded-bl-[5rem] flex items-center justify-center">
                                {children}
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Form Section - Left */}
                            <div className="w-[50%] text-white p-12 bg-[#232229] rounded-tr-[5rem] rounded-br-[5rem] flex items-center justify-center">
                                {children}
                            </div>
                            {/* Circle Section - Right */}
                            <div className="w-[50%] bg-[#0F0F0F] flex items-center justify-center relative">
                                <div className="absolute top-6 right-6 w-[10%] h-[8%] bg-[#38C67A] rounded-lg" />
                            </div>
                        </>
                    )}
                </div>

                {/* Mobile Layout - Form Only */}
                <div className="md:hidden bg-[#1A1A1A] rounded-lg shadow-2xl">
                    <div className="flex items-center justify-center p-8 min-h-[100dvh]">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}