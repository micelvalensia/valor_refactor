import Image from "next/image"
import Link from "next/link"
import { FileCode2, Folder, ArrowRight } from "lucide-react"

export function CreatePostContent() {
    return (
        <div className="w-full flex flex-col items-center justify-center min-h-[calc(100vh-140px)] px-4 sm:px-6 py-6 sm:py-10">
            <div className="w-full max-w-md md:max-w-4xl lg:max-w-5xl mx-auto flex flex-col items-center">
                {/* Mascot Center */}
                <div className="w-full flex justify-center items-center relative sm:-mb-14 md:-mb-16 z-0 pointer-events-none select-none text-center">
                    <Image
                        src="/mascot/post.png"
                        alt="Post Mascot"
                        width={340}
                        height={340}
                        priority
                        className="w-48 sm:w-60 md:w-72 h-auto drop-shadow-2xl mx-auto block"
                    />
                </div>

                {/* Selection Cards Container */}
                <div className="relative z-10 w-full">
                    <div className="flex flex-col md:grid md:grid-cols-2 gap-5 sm:gap-6 md:gap-8">
                        {/* Problem Card */}
                        <Link
                            href="/create-post/problem"
                            className="group relative flex flex-col justify-between bg-[#232229] border border-white/10 hover:border-[#C69238]/60 rounded-3xl p-8 sm:p-9 md:p-10 transition-all duration-300 hover:shadow-2xl hover:shadow-[#C69238]/15 hover:-translate-y-1.5 cursor-pointer min-h-[250px] sm:min-h-[280px] md:min-h-[320px]"
                        >
                            <div>
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-4 sm:gap-5">
                                        <div className="size-16 sm:size-18 md:size-20 rounded-2xl bg-[#C69238] flex items-center justify-center text-white shrink-0 shadow-lg shadow-amber-900/30 group-hover:scale-105 transition-transform duration-300">
                                            <FileCode2 className="size-8 sm:size-9 md:size-10 stroke-[1.8]" />
                                        </div>
                                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-wide">
                                            Problem
                                        </h2>
                                    </div>
                                    <div className="size-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 group-hover:text-[#C69238] group-hover:bg-[#C69238]/10 group-hover:translate-x-1 transition-all duration-300">
                                        <ArrowRight className="size-5" />
                                    </div>
                                </div>

                                <p className="text-white/60 text-base sm:text-lg md:text-xl mt-6 sm:mt-8 leading-relaxed">
                                    Tanyakan kendala coding, diskusikan error bug, dan temukan solusi terbaik bersama developer lain.
                                </p>
                            </div>

                            <div className="mt-6 pt-4 border-t border-white/5 flex items-center text-xs sm:text-sm text-[#C69238] font-semibold tracking-wide uppercase">
                                Mulai Bertanya &rarr;
                            </div>
                        </Link>

                        {/* Mobile Divider (OR) */}
                        <div className="flex md:hidden items-center justify-center gap-4 my-2 px-4 w-full">
                            <div className="h-px bg-white/15 flex-1" />
                            <span className="text-sm font-bold italic text-white/60 tracking-wider">
                                OR
                            </span>
                            <div className="h-px bg-white/15 flex-1" />
                        </div>

                        {/* Project Card */}
                        <Link
                            href="/create-post/project"
                            className="group relative flex flex-col justify-between bg-[#232229] border border-white/10 hover:border-[#385EC6]/60 rounded-3xl p-8 sm:p-9 md:p-10 transition-all duration-300 hover:shadow-2xl hover:shadow-[#385EC6]/15 hover:-translate-y-1.5 cursor-pointer min-h-[250px] sm:min-h-[280px] md:min-h-[320px]"
                        >
                            <div>
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-4 sm:gap-5">
                                        <div className="size-16 sm:size-18 md:size-20 rounded-2xl bg-[#385EC6] flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-900/30 group-hover:scale-105 transition-transform duration-300">
                                            <Folder className="size-8 sm:size-9 md:size-10 stroke-[1.8]" />
                                        </div>
                                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-wide">
                                            Project
                                        </h2>
                                    </div>
                                    <div className="size-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 group-hover:text-[#385EC6] group-hover:bg-[#385EC6]/10 group-hover:translate-x-1 transition-all duration-300">
                                        <ArrowRight className="size-5" />
                                    </div>
                                </div>

                                <p className="text-white/60 text-base sm:text-lg md:text-xl mt-6 sm:mt-8 leading-relaxed">
                                    Pamerkan karya, aplikasi, atau proyek open source yang sudah kamu bangun untuk dapatkan feedback.
                                </p>
                            </div>

                            <div className="mt-6 pt-4 border-t border-white/5 flex items-center text-xs sm:text-sm text-[#385EC6] font-semibold tracking-wide uppercase">
                                Showcase Proyek &rarr;
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}