import Link from "next/link"

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background text-white p-4">
            <h2 className="text-4xl font-bold mb-2">404</h2>
            <p className="text-white/60 mb-6">Halaman tidak ditemukan</p>
            <Link
                href="/home"
                className="px-4 py-2 rounded-lg bg-main hover:bg-emerald-500 text-white font-medium transition-colors"
            >
                Kembali ke Beranda
            </Link>
        </div>
    )
}
