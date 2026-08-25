import { Bell, Plus } from "lucide-react";
import { Button } from "../ui/button";

export function MobileHeader() {
    return (
        <div className="lg:hidden flex items-center justify-between p-4">
            <div>
                <Bell className="text-white" />
            </div>
            <div>
                <Button className="bg-main p-4">
                    <Plus className="font-medium text-white" />
                    Create
                </Button>
            </div>
        </div>
    )
}