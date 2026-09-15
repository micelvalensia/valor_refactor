import Image from "next/image";
import { Input } from "../ui/input";
import { PlusIcon, Search } from "lucide-react";
import Link from "next/link";

export function Header() {
    return (
        <div className="bg-[#0F0F0F] w-full hidden lg:block p-5 border-b border-white/20">
            {/* Desktop */}
            <div className="hidden md:flex text-white items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="relative w-10 h-10 shrink-0">
                        <Image
                            alt="logo"
                            src={"/icon.png"}
                            fill
                            className="object-contain rounded-md border-2 border-[rgba(0,255,136,0.2)]"
                        />
                    </div>
                    <span className="font-semibold text-2xl">DevForum</span>
                </div>

                {/* Search Bar */}
                <div className="w-[40%] max-w-175 relative">
                    <Input className="rounded-sm border-0 bg-[#232229] pl-10 py-6" placeholder="Search Problems or Projects..." />
                    <Search className="absolute left-3 top-3 text-white/30" size={20} />
                </div>

                {/* Menu */}
                <div className="flex items-center gap-3">
                    <div className="bg-[#38C67A] w-10 h-10 rounded-full"></div>
                    <Link href="/create-post" className="bg-[#38C67A] hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-lg text-base transition-colors flex items-center"
                    > <PlusIcon /> Create </Link>
                    <div className="bg-white/20 w-10 h-10 rounded-full"></div>
                </div>
            </div>


            {/* Mobile */}
            <div className="md:hidden flex text-white">hello mobile</div>
        </div>
    )
}