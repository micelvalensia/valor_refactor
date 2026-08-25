import { getServerSession } from "next-auth"

export async function GET(request: Request) {
    const session = await getServerSession()
    console.log(session)
    if(!session) {
        return Response.json({success: false, message: "You are unauthorized"})
    }
    const data = [{name: "micel", age: 18}, {name: "alince", age: 18}]
    return Response.json({data})
}