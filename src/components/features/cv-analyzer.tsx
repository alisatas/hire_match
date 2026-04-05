"use client"

import React, { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { RatingInteraction } from "@/components/ui/emoji-rating"
import { 
    Sparkles, 
    FileText, 
    UploadCloud, 
    ArrowRight, 
    PieChart, 
    Dumbbell, 
    CheckCircle2, 
    AlertTriangle, 
    Target,
    Save,
    Search,
    Zap,
    Shield,
    Cpu,
    BarChart,
    TrendingUp
} from "lucide-react"
import { cn } from "@/lib/utils"

// PDF.js - Loaded dynamically
let pdfjsLib: any = null;

export default function CVAnalyzer() {
    const [cvText, setCvText] = useState("")
    const [jobText, setJobText] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [results, setResults] = useState<any>(null)
    const [pdfStatus, setPdfStatus] = useState("")
    const [showRating, setShowRating] = useState(false)

    useEffect(() => {
        // Load PDF.js worker
        import("pdfjs-dist").then((pdfjs) => {
            pdfjsLib = pdfjs
            // Optimized worker resolution for Next.js 15+ & Turbopack
            pdfjs.GlobalWorkerOptions.workerSrc = new URL(
              "pdfjs-dist/build/pdf.worker.min.mjs",
              import.meta.url
            ).toString()
        }).catch(err => {
            console.error("Failed to load PDF.js", err)
            setPdfStatus("Analytics Engine Error")
        })
    }, [])



    const processPdf = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file || file.type !== "application/pdf") return

        setPdfStatus("Reading PDF...")
        try {
            if (!pdfjsLib) {
                // Force reload attempt
                const pdfjs = await import("pdfjs-dist")
                pdfjsLib = pdfjs
                pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`
            }
            
            const arrayBuffer = await file.arrayBuffer()
            const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer })
            const pdf = await loadingTask.promise
            
            let fullText = ""
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i)
                const content = await page.getTextContent()
                fullText += content.items.map((item: any) => item.str).join(" ") + " "
            }
            
            const cleanedText = fullText.replace(/\s+/g, " ").trim()
            if (cleanedText.length < 10) throw new Error("PDF seems empty or non-text")
            
            setCvText(cleanedText)
            setPdfStatus(`✓ ${file.name} loaded`)
        } catch (err: any) {
            console.error("PDF Read Error:", err)
            setPdfStatus("Error reading PDF. Try pasting text below.")
            // Allow manual fallback on error
            setResults(null) 
        }
    }

    const doAnalyze = async () => {
        if (!cvText || !jobText) {
            alert("Please provide both CV and Job Description.")
            return
        }

        setIsLoading(true)
        setShowRating(false)
        setResults(null)

        let targetJobText = jobText
        if (jobText.trim().startsWith("http")) {
            try {
                const res = await fetch("/api/scrape", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ url: jobText.trim() })
                })
                if (res.ok) {
                    const data = await res.json()
                    if (data.text) targetJobText = data.text
                }
            } catch (err) {
                console.error("Scraping failed:", err)
            }
        }

        try {
            const res = await fetch("/api/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ cvText, jobText: targetJobText })
            });
            
            if (!res.ok) {
                throw new Error("Analysis failed. Did you add the API Key?");
            }

            const data = await res.json();
            
            // Map the API results to our UI state format
            setResults({
                score: data.score,
                persona: {
                    id: "ai-persona",
                    label: data.persona.label,
                    desc: data.persona.desc,
                    icon: <Target className="h-5 w-5 text-indigo-400" />,
                    color: "text-indigo-400"
                },
                summary: data.summary,
                matched: data.matched,
                growth: data.growth
            });
        } catch (error) {
            console.error("AI Error:", error);
            alert("Analysis failed. Please check your console or ensure OPENAI_API_KEY is configured in .env.local on your server.");
        } finally {
            setIsLoading(false);
            setShowRating(true);
        }
    }

    const loadSample = () => {
        setCvText("Alex Johnson\nFrontend Developer | 3+ years React, JS, Tailwind.")
        setJobText("Senior Frontend Developer Wanted!\n- 5+ years React\n- TypeScript proficiency\n- Agile experience")
    }

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
                <div className="flex items-center gap-3">
                    <Sparkles className="text-primary h-8 w-8" />
                    <h1 className="text-2xl font-bold tracking-tight">CV Scorer</h1>
                </div>
            </header>

            <section className="text-center mb-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
                <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight tracking-tighter">
                    Get Hired in <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 drop-shadow-sm">Style ✨</span>
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto px-2">
                    Stop guessing. Start matching. Let our algorithm vibe-check your resume against your dream job. 🎯
                </p>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                {/* Input Panel */}
                <Card className="bg-background/40 backdrop-blur-xl border-border/50 overflow-hidden">
                    <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                            <FileText className="text-primary h-5 w-5" />
                            <CardTitle className="font-black uppercase tracking-tighter">The Essentials 🎒</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-bold uppercase tracking-widest text-primary/80">Upload your future</label>
                                <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">REQUIRED</span>
                            </div>
                            <div className="border-2 border-dashed border-border/60 rounded-xl h-[140px] flex flex-col items-center justify-center gap-4 transition-colors hover:border-primary/40 hover:bg-primary/5 cursor-pointer relative">
                                <UploadCloud className="h-10 w-10 text-muted-foreground" />
                                <div className="text-center">
                                    <p className="font-medium">Drop your PDF or click to browse</p>
                                    <p className="text-xs text-muted-foreground mt-1">Files up to 5MB supported</p>
                                </div>
                                <input 
                                    type="file" 
                                    accept=".pdf" 
                                    className="absolute inset-0 opacity-0 cursor-pointer" 
                                    onChange={processPdf}
                                />
                            </div>
                            <p className="text-xs mt-3 text-center animate-pulse text-primary">{pdfStatus}</p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-bold uppercase tracking-widest text-primary/80 italic">The Dream Job 🌈</label>
                                <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">REQUIRED</span>
                            </div>
                            <Textarea 
                                placeholder="📋 Copy-paste the Job Description or Link here..." 
                                className="min-h-[100px] bg-muted/20 border-none rounded-xl focus-visible:ring-primary/40"
                                value={jobText}
                                onChange={(e) => setJobText(e.target.value)}
                            />
                            <p className="text-[10px] text-muted-foreground/60 px-1 italic">We'll scan the text or links for career DNA alignment.</p>
                        </div>

                        <div className="space-y-3 pt-4">
                            <Button className={cn(
                                "w-full py-8 text-xl font-black group transition-all rounded-2xl shadow-xl active:scale-95",
                                (!cvText || !jobText) 
                                    ? "bg-muted text-muted-foreground cursor-not-allowed grayscale" 
                                    : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-purple-500/20"
                            )} onClick={doAnalyze} disabled={isLoading || !cvText || !jobText}>
                                <span>{isLoading ? "Your future is loading..." : "Analyze My CV"}</span>
                                <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Results Panel */}
                <Card className="bg-background/40 backdrop-blur-xl border-border/50 h-full">
                    <CardContent className="h-full flex flex-col p-8 lg:p-12">
                        {!results && !isLoading && (
                            <div className="flex flex-col items-center justify-center h-full text-center py-12 animate-in fade-in zoom-in-95">
                                <Search className="h-16 w-16 text-muted-foreground/30 mb-6" />
                                <h3 className="text-xl font-black mb-2 uppercase tracking-widest text-primary/40">Ready for Launch 🚀</h3>
                                <p className="text-muted-foreground/60 text-sm">Upload your future to start the transformation.</p>
                            </div>
                        )}

                        {isLoading && (
                            <div className="flex flex-col items-center justify-center h-full py-12 animate-in fade-in">
                                <div className="relative h-20 w-20">
                                    <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
                                    <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
                                </div>
                                <p className="mt-8 text-lg font-black animate-pulse text-indigo-400">Your future is loading...</p>
                            </div>
                        )}

                        {results && (
                            <div className="animate-in fade-in slide-in-from-right-8 duration-700 space-y-8">
                                {/* Header Section */}
                                <div className="flex flex-col md:flex-row items-center gap-10 pb-8 border-b border-border/50">
                                    <div className="relative h-40 w-40 shrink-0">
                                        <svg viewBox="0 0 100 100" className="transform -rotate-90">
                                            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="6" className="text-muted/10" />
                                            <circle 
                                                cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="6" 
                                                strokeDasharray="283" 
                                                strokeDashoffset={283 - (283 * results.score) / 100}
                                                className="text-primary transition-all duration-1000 ease-out" 
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span className="text-5xl font-black">{results.score}%</span>
                                            <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Match</span>
                                        </div>
                                    </div>
                                    <div className="text-center md:text-left">
                                        <h3 className="text-3xl font-black mb-2 uppercase tracking-tighter">Career Power Index ⚡️</h3>
                                        <p className="text-muted-foreground leading-relaxed italic text-lg">"{results.summary}"</p>
                                    </div>
                                </div>

                                {/* Strategic Persona Card */}
                                <div className="bg-gradient-to-br from-indigo-500/5 via-background to-muted/50 p-6 md:p-8 rounded-[32px] border border-border/50 shadow-2xl flex flex-col md:flex-row items-center text-center md:text-left gap-6 md:gap-8 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors" />
                                    <div className="h-20 w-20 md:h-24 md:w-24 shrink-0 bg-background rounded-3xl flex items-center justify-center shadow-2xl border border-border/50 transform group-hover:scale-105 transition-transform duration-500">
                                        <div className="scale-[1.5] md:scale-[2.0]">
                                            {results.persona.icon}
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground mb-2 flex items-center justify-center md:justify-start gap-2">
                                            <TrendingUp className="h-3 w-3" /> Strategic Core Profile
                                        </p>
                                        <h4 className={cn("text-2xl md:text-3xl font-black uppercase tracking-tight mb-2", results.persona.color)}>
                                            {results.persona.label}
                                        </h4>
                                        <p className="text-sm text-muted-foreground max-w-md font-medium leading-relaxed italic md:border-l-2 md:border-border/50 md:pl-4 mx-auto md:mx-0">
                                            {results.persona.desc}
                                        </p>
                                    </div>
                                </div>

                                {/* Intelligence Matrix Grid */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
                                    {/* Professional DNA (Skills) */}
                                    <div className="bg-muted/10 p-8 rounded-[40px] border border-border/40 relative overflow-hidden backdrop-blur-md">
                                        <h4 className="flex items-center gap-3 font-black mb-8 text-foreground uppercase tracking-[0.2em] text-[11px]">
                                            <Cpu className="h-4 w-4 text-primary" /> Matched Technologies & Core Skills
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {results.matched.length > 0 ? results.matched.map((s: string, idx: number) => (
                                                <span key={`match-${s}-${idx}`} className="px-4 py-2 bg-background/60 border border-border/80 text-foreground rounded-2xl text-[10px] font-bold uppercase tracking-tight hover:border-primary/40 hover:bg-primary/5 transition-all cursor-default shadow-sm">
                                                    {s}
                                                </span>
                                            )) : (
                                                <span className="text-xs font-medium italic text-muted-foreground">No specific skill matches detected.</span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Optimization Strategy */}
                                    <div className="bg-destructive/5 p-8 rounded-[40px] border border-destructive/20 hover:bg-destructive/[0.07] transition-colors h-fit">
                                        <h4 className="flex items-center gap-3 font-black mb-10 text-destructive uppercase tracking-[0.2em] text-[11px]">
                                            <Shield className="h-4 w-4" /> Strategic Growth Gaps
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {results.growth.length > 0 ? results.growth.map((s: string) => (
                                                <span key={s} className="px-4 py-2 bg-background border border-destructive/20 text-destructive rounded-2xl text-[10px] font-bold uppercase tracking-tight hover:border-destructive/40 transition-all cursor-default shadow-sm">
                                                    {s}
                                                </span>
                                            )) : (
                                                <span className="text-xs font-medium italic text-muted-foreground">Optimal coverage detected. No major keyword gaps identified.</span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {showRating && (
                                    <div className="pt-10 border-t border-border/50 animate-in fade-in blur-in-sm slide-in-from-bottom-6 duration-1000 delay-700 flex flex-col items-center">
                                        <p className="text-[10px] font-black mb-6 text-muted-foreground uppercase tracking-[0.3em]">Rate Intelligence Quality</p>
                                        <RatingInteraction />
                                    </div>
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            <footer className="text-center py-12 border-t border-border/20 text-muted-foreground text-sm">
                <p>&copy; 2026 CV Scorer — Premium Intelligence Suite. Mode: Analytics Active</p>
            </footer>
        </div>
    )
}
