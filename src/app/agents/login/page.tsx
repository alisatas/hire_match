"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AgentsLogin() {
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const submit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        const res = await fetch("/api/agents/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password }),
        })
        setLoading(false)
        if (res.ok) {
            router.push("/agents")
        } else {
            setError("Wrong password.")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0f0f]">
            <div className="w-full max-w-sm">
                <div className="text-center mb-8">
                    <div className="text-5xl mb-4">🏢</div>
                    <h1 className="text-2xl font-black text-white">Agent HQ</h1>
                    <p className="text-white/50 text-sm mt-1">Internal access only</p>
                </div>
                <form onSubmit={submit} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                    <input
                        type="password"
                        placeholder="Enter password..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-cyan-500/50"
                        autoFocus
                    />
                    {error && <p className="text-red-400 text-sm">{error}</p>}
                    <button
                        type="submit"
                        disabled={loading || !password}
                        className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white font-extrabold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Checking..." : "Enter →"}
                    </button>
                </form>
            </div>
        </div>
    )
}
