"use client"

import { useEffect, useState } from "react"

export default function UsersPageClient() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("/api/users")
            const result = await res.json()
            setData(result.data)
            setLoading(false)
        }

        fetchData()
    }, [])

    if (loading) return <div>Loading...</div>

    return (
        <div>
            <div>hello world</div>
            {/* {data.length > 0 ? data.map((d) => (
                <div key={d.id}>{d.name} - {d.email}</div>
            )) : null} */}
        </div>
    )
}