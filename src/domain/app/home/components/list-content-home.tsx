import { Card } from "@/components/ui/card"

function CardContent() {
    return (
        <Card className="rounded-md border border-border/50 bg-secondary w-full min-h-64 lg:min-h-64 p-4 flex">
            <div className="bg-blue-700 font-medium text-white px-4 py-2 rounded-full ml-auto">
                Project
            </div>
        </Card>
    )
}

export function ListContentHome() {
    return (
        <div className="min-h-0 flex-1">
            <div className="grid grid-cols-1 gap-3">
                {[1, 2, 3, 4].map((i) => (
                    <CardContent key={i} />
                ))}
            </div>
        </div>
    )
}