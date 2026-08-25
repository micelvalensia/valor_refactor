import { useSession } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { ChevronUp } from "lucide-react"

export function BottomNavbar() {
    const { data } = useSession()

    return (
        <div className="w-full p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <Avatar>
                    <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                        className="grayscale"
                    />
                    <AvatarFallback>{data?.user.name?.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="text-white">
                    {data?.user.name}
                </div>
            </div>
            <div>
                <ChevronUp className="text-white" />
            </div>
        </div>
    )
}