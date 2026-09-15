import { Bell, Plus } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export function MobileHeader() {
    return (
        <div className="lg:hidden flex items-center justify-between p-4">
            <div>
                <Bell className="text-white" />
            </div>
            <div>
                <Link href={"/create-post"} className="bg-main p-4 flex items-center px-2 py-1 rounded-md gap-2 text-white font-medium" >
                    <Plus className="font-medium text-white" />
                    Create
                </Link>
            </div>
        </div>
    )
}