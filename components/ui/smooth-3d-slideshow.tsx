"use client"

import {
    useState,
    useEffect,
    useCallback,
    useRef,
    type CSSProperties,
} from "react"

interface Slide {
    image?: { src?: string; srcSet?: string; alt?: string }
    title?: string
    subtitle?: string
}

type AutoplayDir = "leftToRight" | "rightToLeft"
type TitleCorner = "topLeft" | "topRight" | "bottomLeft" | "bottomRight"

interface Smooth3DSlideshowProps {
    slides?: Slide[]
    cardWidth?: number
    cardHeight?: number
    radius?: number
    tilt?: number
    sideTilt?: number
    gap?: number
    opacity?: number
    transition?: any
    autoplay?: boolean
    autoplayDirection?: AutoplayDir
    showTitle?: boolean
    titleFont?: CSSProperties
    titleColor?: string
    titlePosition?: {
        position?: TitleCorner
        paddingLeft?: number
        paddingRight?: number
        paddingTop?: number
        paddingBottom?: number
    }
    style?: CSSProperties
}

const DEFAULT_SLIDES: Slide[] = [
    {
        image: {
            src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=75",
        },
        title: "Adebayo Samuel Olaku\nChief Executive Officer & Founder",
    },
    {
        image: {
            src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=75",
        },
        title: "Kemi Adebisi\nHead of Broadcast Operations",
    },
    {
        image: {
            src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=75",
        },
        title: "Chidi Chukwuma\nDirector of Cinematography",
    },
    {
        image: {
            src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&auto=format&fit=crop&q=75",
        },
        title: "Zainab Bello\nBrand Strategy Lead",
    },
]

const PERSPECTIVE = 1400
const SCALE_STEP = 0.14
const MAX_VISIBLE = 2
const DEPTH = 200

function cssTransition(t: any): { dur: number; ease: string } {
    const dur = t && typeof t.duration === "number" ? t.duration : 0.6
    let ease = "cubic-bezier(0.22, 1, 0.36, 1)"
    const e = t?.ease
    if (Array.isArray(e) && e.length === 4) {
        ease = `cubic-bezier(${e[0]}, ${e[1]}, ${e[2]}, ${e[3]})`
    } else if (typeof e === "string") {
        const map: Record<string, string> = {
            linear: "linear",
            easeIn: "ease-in",
            easeOut: "ease-out",
            easeInOut: "ease-in-out",
        }
        ease = map[e] || "ease"
    }
    return { dur, ease }
}

export function Smooth3DSlideshow(props: Smooth3DSlideshowProps) {
    const {
        slides = DEFAULT_SLIDES,
        cardWidth: initialWidth = 420,
        cardHeight: initialHeight = 440,
        radius = 8,
        tilt = 12,
        sideTilt = 8,
        gap = 6,
        opacity = 60,
        transition = {
            type: "tween",
            duration: 0.6,
            delay: 2.8,
            ease: [0.22, 1, 0.36, 1],
        },
        autoplay = true,
        autoplayDirection = "rightToLeft",
        showTitle = true,
        titleFont = {
            fontFamily: "Inter, sans-serif",
            fontSize: "18px",
            fontWeight: "800",
            letterSpacing: "-0.02em",
            lineHeight: "1.2em",
        },
        titleColor = "#ffffff",
        titlePosition = {
            position: "bottomLeft",
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 20,
            paddingBottom: 20,
        },
        style,
    } = props

    const [screenW, setScreenW] = useState<number>(375)

    useEffect(() => {
        const updateWidth = () => {
            setScreenW(window.innerWidth)
        }
        updateWidth()
        window.addEventListener("resize", updateWidth)
        return () => window.removeEventListener("resize", updateWidth)
    }, [])

    // Calculate mobile responsive card dimensions
    const isMobile = screenW < 640
    const cardWidth = isMobile ? Math.min(initialWidth, screenW - 48) : initialWidth
    const cardHeight = isMobile ? 380 : initialHeight

    const tp = titlePosition || {}
    const corner: TitleCorner = tp.position || "bottomLeft"
    const isRight = corner === "topRight" || corner === "bottomRight"
    const padLeft = tp.paddingLeft ?? 18
    const padRight = tp.paddingRight ?? 18
    const padBottom = tp.paddingBottom ?? 18

    const list = slides && slides.length ? slides : DEFAULT_SLIDES
    const n = list.length

    const loop = true
    const [active, setActive] = useState(0)

    useEffect(() => {
        setActive((a) => Math.max(0, Math.min(n - 1, a)))
    }, [n])

    const moveDur =
        transition && typeof transition.duration === "number"
            ? transition.duration
            : 0.6
    const lockRef = useRef(false)
    const lock = useCallback(() => {
        lockRef.current = true
        window.setTimeout(
            () => {
                lockRef.current = false
            },
            Math.max(50, moveDur * 1000)
        )
    }, [moveDur])

    const step = useCallback(
        (dir: number) => {
            if (lockRef.current) return
            lock()
            setActive((a) => (((a + dir) % n) + n) % n)
        },
        [n, lock]
    )

    const handleCardClick = useCallback(
        (i: number) => {
            if (lockRef.current) return
            lock()
            setActive((a) => (i === a ? (a + 1) % n : i))
        },
        [n, lock]
    )

    const delay =
        transition && typeof transition.delay === "number"
            ? transition.delay
            : 2.8
    useEffect(() => {
        if (!autoplay || n < 2) return
        const ms = Math.max(0.3, delay) * 1000
        const dir = autoplayDirection === "leftToRight" ? -1 : 1
        const id = window.setInterval(() => step(dir), ms)
        return () => window.clearInterval(id)
    }, [autoplay, autoplayDirection, delay, n, step])

    const onKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === "ArrowRight") {
                e.preventDefault()
                step(1)
            } else if (e.key === "ArrowLeft") {
                e.preventDefault()
                step(-1)
            }
        },
        [step]
    )

    const { dur, ease } = cssTransition(transition)
    const transitionCss = `transform ${dur}s ${ease}, opacity ${dur}s ${ease}`

    const effectiveRadius =
        (Math.max(0, Math.min(20, radius)) / 20) *
        (Math.min(cardWidth, cardHeight) / 2)
    const dim = 1 - Math.max(0, Math.min(100, opacity)) / 100

    const rootStyle: CSSProperties = {
        ...(style || {}),
        position: "relative",
        width: "100%",
        height: cardHeight + 30,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        perspective: `${PERSPECTIVE}px`,
        overflow: "hidden",
        outline: "none",
    }

    return (
        <div
            style={rootStyle}
            tabIndex={0}
            role="group"
            aria-roledescription="carousel"
            onKeyDown={onKeyDown}
        >
            <div
                style={{
                    position: "relative",
                    width: cardWidth,
                    height: cardHeight,
                    transformStyle: "preserve-3d",
                }}
            >
                {list.map((slide, i) => {
                    let rel = i - active
                    if (loop) {
                        if (rel > n / 2) rel -= n
                        if (rel < -n / 2) rel += n
                    }
                    const ax = Math.abs(rel)
                    const visible = ax <= MAX_VISIBLE
                    const isActive = rel === 0
                    const sc = Math.max(0.45, 1 - ax * SCALE_STEP)
                    const tx = rel * (gap * (isMobile ? 18 : 28))
                    const tz = -ax * DEPTH
                    const ry = -rel * tilt
                    const rz = rel * sideTilt
                    const src = slide.image?.src || ""

                    const cardStyle: CSSProperties = {
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        width: cardWidth,
                        height: cardHeight,
                        borderRadius: effectiveRadius,
                        overflow: "hidden",
                        transformStyle: "preserve-3d",
                        transformOrigin: "center center",
                        transform: `translate(-50%, -50%) translateX(${tx}px) translateZ(${tz}px) rotateY(${ry}deg) rotateZ(${rz}deg) scale(${sc})`,
                        transition: transitionCss,
                        opacity: visible ? 1 : 0,
                        cursor: "pointer",
                        pointerEvents: visible ? "auto" : "none",
                        backgroundColor: "#090A0F",
                        border: isActive ? "2px solid #D9541E" : "1px solid #1e293b",
                        boxShadow: isActive ? "0 20px 40px rgba(217, 84, 30, 0.35)" : "none",
                    }

                    return (
                        <div
                            key={i}
                            style={cardStyle}
                            onClick={() => handleCardClick(i)}
                            aria-label={slide.title}
                            aria-hidden={!visible}
                        >
                            {src ? (
                                <img
                                    src={src}
                                    alt={slide.image?.alt || slide.title || ""}
                                    draggable={false}
                                    style={{
                                        position: "absolute",
                                        inset: 0,
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        display: "block",
                                        userSelect: "none",
                                    }}
                                />
                            ) : null}

                            {showTitle && (
                                <>
                                    <div
                                        style={{
                                            position: "absolute",
                                            inset: 0,
                                            background: "linear-gradient(180deg, rgba(9,10,15,0) 30%, rgba(9,10,15,0.95) 100%)",
                                            pointerEvents: "none",
                                        }}
                                    />

                                    <div
                                        style={{
                                            position: "absolute",
                                            left: padLeft,
                                            right: padRight,
                                            bottom: padBottom,
                                            textAlign: isRight ? "right" : "left",
                                            pointerEvents: "none",
                                        }}
                                    >
                                        <span
                                            style={{
                                                color: titleColor,
                                                fontSize: isMobile ? 16 : 20,
                                                fontWeight: 800,
                                                lineHeight: "1.2em",
                                                letterSpacing: "-0.02em",
                                                whiteSpace: "pre-line",
                                                textShadow: "0 2px 10px rgba(0,0,0,0.8)",
                                                ...(titleFont || {}),
                                            }}
                                        >
                                            {slide.title}
                                        </span>
                                    </div>
                                </>
                            )}

                            <div
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    background: "#000000",
                                    opacity: isActive ? 0 : dim,
                                    transition: `opacity ${dur}s ${ease}`,
                                    pointerEvents: "none",
                                }}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Smooth3DSlideshow;
