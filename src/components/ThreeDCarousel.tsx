"use client";

import { memo, useEffect, useLayoutEffect, useMemo, useState } from "react";
import {
    AnimatePresence,
    motion,
    useAnimation,
    useMotionValue,
    useTransform,
    useAnimationFrame,
} from "framer-motion";

export const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect;

type UseMediaQueryOptions = {
    defaultValue?: boolean;
    initializeWithValue?: boolean;
};

const IS_SERVER = typeof window === "undefined";

export function useMediaQuery(
    query: string,
    {
        defaultValue = false,
        initializeWithValue = true,
    }: UseMediaQueryOptions = {}
): boolean {
    const getMatches = (query: string): boolean => {
        if (IS_SERVER) {
            return defaultValue;
        }
        return window.matchMedia(query).matches;
    };

    const [matches, setMatches] = useState<boolean>(() => {
        if (initializeWithValue) {
            return getMatches(query);
        }
        return defaultValue;
    });

    const handleChange = () => {
        setMatches(getMatches(query));
    };

    useIsomorphicLayoutEffect(() => {
        const matchMedia = window.matchMedia(query);
        handleChange();

        if (matchMedia.addListener) {
            matchMedia.addListener(handleChange);
        } else {
            matchMedia.addEventListener("change", handleChange);
        }

        return () => {
            if (matchMedia.removeListener) {
                matchMedia.removeListener(handleChange);
            } else {
                matchMedia.removeEventListener("change", handleChange);
            }
        };
    }, [query]);

    return matches;
}

const duration = 0.15;
const transition = { duration, ease: "easeInOut" as const };
const transitionOverlay = { duration: 0.5, ease: "easeInOut" as const };

export interface CarouselItem {
    src: string;
    title: string;
    desc: string;
}

const Carousel = memo(
    ({
        handleClick,
        cards,
        isCarouselActive,
    }: {
        handleClick: (item: CarouselItem, index: number) => void;
        controls: ReturnType<typeof useAnimation>;
        cards: CarouselItem[];
        isCarouselActive: boolean;
    }) => {
        const isScreenSizeSm = useMediaQuery("(max-width: 640px)");
        const cylinderWidth = isScreenSizeSm ? 1100 : 1800;
        const faceCount = cards.length;
        const faceWidth = cylinderWidth / faceCount;
        const radius = cylinderWidth / (2 * Math.PI);

        const rotation = useMotionValue(0);
        const transform = useTransform(
            rotation,
            (value) => `rotate3d(0, 1, 0, ${value}deg)`
        );

        const [isDragging, setIsDragging] = useState(false);

        useAnimationFrame((t, delta) => {
            if (!isDragging && isCarouselActive) {
                rotation.set(rotation.get() - (delta * 0.008));
            }
        });

        return (
            <div
                className="flex h-full items-center justify-center"
                style={{
                    perspective: "1200px",
                    transformStyle: "preserve-3d",
                }}
            >
                <motion.div
                    drag={isCarouselActive ? "x" : false}
                    className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
                    style={{
                        transform,
                        rotateY: rotation,
                        width: cylinderWidth,
                        transformStyle: "preserve-3d",
                    }}
                    onDrag={(_, info) =>
                        isCarouselActive &&
                        rotation.set(rotation.get() + info.offset.x * 0.05)
                    }
                    onDragStart={() => setIsDragging(true)}
                    onDragEnd={() => setIsDragging(false)}
                >
                    {cards.map((item, i) => (
                        <motion.div
                            key={`key-${item.src}-${i}`}
                            className="absolute flex h-full origin-center items-center justify-center p-3"
                            style={{
                                width: `${faceWidth}px`,
                                transform: `rotateY(${i * (360 / faceCount)}deg) translateZ(${radius}px)`,
                            }}
                            onClick={() => handleClick(item, i)}
                        >
                            {/* Card with glow effect */}
                            <div className="relative group">
                                {/* Glow behind card */}
                                <div className="absolute -inset-2 bg-gradient-to-tr from-gold/20 via-gold/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <motion.img
                                    src={item.src}
                                    alt={item.title}
                                    layoutId={`img-${item.src}-${i}`}
                                    className="relative w-full rounded-xl object-cover shadow-2xl shadow-black/50 border border-white/10 hover:border-gold/30 hover:scale-105 transition-all duration-300"
                                    style={{
                                        aspectRatio: "16/10",
                                        maxHeight: "380px",
                                        pointerEvents: isCarouselActive ? "auto" : "none",
                                    }}
                                    initial={{ filter: "blur(4px)" }}
                                    animate={{ filter: "blur(0px)" }}
                                    transition={transition}
                                />

                                {/* Title overlay on hover */}
                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase">{item.title}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        );
    }
);

Carousel.displayName = "Carousel";

const ThreeDCarousel = ({ items }: { items: CarouselItem[] }) => {
    const [activeItem, setActiveItem] = useState<CarouselItem | null>(null);
    const [isCarouselActive, setIsCarouselActive] = useState(true);
    const controls = useAnimation();

    const handleClick = (item: CarouselItem, index: number) => {
        setActiveItem(item);
        setIsCarouselActive(false);
        controls.stop();
    };

    const handleClose = () => {
        setActiveItem(null);
        setIsCarouselActive(true);
    };

    return (
        <motion.div layout className="relative w-full h-[700px] overflow-visible">
            {/* Background glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[600px] h-[400px] bg-gold/5 rounded-full blur-[120px]" />
            </div>

            <AnimatePresence mode="popLayout">
                {activeItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        layoutId={`img-container-${activeItem.src}`}
                        layout="position"
                        onClick={handleClose}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 cursor-zoom-out"
                        style={{ willChange: "opacity" }}
                        transition={transitionOverlay}
                    >
                        <div className="relative max-w-5xl w-full flex flex-col items-center gap-8" onClick={(e) => e.stopPropagation()}>
                            <motion.img
                                layoutId={`img-${activeItem.src}`}
                                src={activeItem.src}
                                className="max-h-[70vh] w-auto rounded-xl shadow-2xl shadow-gold/10 border border-gold/20"
                                initial={{ scale: 0.5 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    delay: 0.05,
                                    duration: 0.5,
                                    ease: [0.32, 0.72, 0, 1],
                                }}
                            />
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-center space-y-4 pointer-events-none max-w-2xl"
                            >
                                <h3 className="text-3xl font-cinzel font-bold text-gold uppercase tracking-[0.2em]">{activeItem.title}</h3>
                                <p className="text-white/60 text-sm tracking-wider leading-relaxed">{activeItem.desc}</p>
                            </motion.div>

                            <button
                                onClick={handleClose}
                                className="absolute top-4 right-4 px-8 py-4 text-white/90 hover:text-gold transition-all duration-300 font-bold tracking-[0.3em] uppercase text-xs backdrop-blur-sm bg-black/30 rounded-sm border border-white/10 hover:border-gold/50 hover:scale-105"
                            >
                                Close
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="relative h-[700px] w-full overflow-visible">
                <Carousel
                    handleClick={handleClick}
                    controls={controls}
                    cards={items}
                    isCarouselActive={isCarouselActive}
                />
            </div>
        </motion.div>
    );
};

export default ThreeDCarousel;
