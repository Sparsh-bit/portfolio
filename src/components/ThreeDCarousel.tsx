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
const transition = { duration, ease: "easeInOut" as const, filter: "blur(4px)" };
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
        controls: any;
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
                rotation.set(rotation.get() - (delta * 0.005));
            }
        });

        return (
            <div
                className="flex h-full items-center justify-center bg-transparent z-40"
                style={{
                    perspective: "1000px",
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
                            className="absolute flex h-full origin-center items-center justify-center rounded-xl bg-transparent p-2"
                            style={{
                                width: `${faceWidth}px`,
                                transform: `rotateY(${i * (360 / faceCount)
                                    }deg) translateZ(${radius}px)`,
                            }}
                            onClick={() => handleClick(item, i)}
                        >
                            <motion.img
                                src={item.src}
                                alt={item.title}
                                layoutId={`img-${item.src}-${i}`}
                                className="pointer-events-none w-full rounded-xl object-cover aspect-square hover:scale-105 transition-transform duration-300 border border-white/10"
                                initial={{ filter: "blur(4px)" }}
                                animate={{ filter: "blur(0px)" }}
                                transition={transition}
                                style={{
                                    pointerEvents: isCarouselActive ? "auto" : "none",
                                }}
                            />
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
        <motion.div layout className="relative w-full h-[600px] overflow-hidden">
            <AnimatePresence mode="popLayout">
                {activeItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        layoutId={`img-container-${activeItem.src}`}
                        layout="position"
                        onClick={handleClose}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 cursor-zoom-out"
                        style={{ willChange: "opacity" }}
                        transition={transitionOverlay}
                    >
                        <div className="relative max-w-5xl w-full flex flex-col items-center gap-6" onClick={(e) => e.stopPropagation()}>
                            <motion.img
                                layoutId={`img-${activeItem.src}`}
                                src={activeItem.src}
                                className="max-h-[70vh] w-auto rounded-lg shadow-2xl border border-white/10"
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
                                className="text-center space-y-2 pointer-events-none"
                            >
                                <h3 className="text-2xl font-cinzel font-bold text-white uppercase tracking-widest text-gold">{activeItem.title}</h3>
                                <p className="text-white/60 text-sm tracking-wider font-light uppercase">{activeItem.desc}</p>
                            </motion.div>

                            <button
                                onClick={handleClose}
                                className="absolute top-4 right-4 px-6 py-3 text-white/90 hover:text-gold transition-all duration-300 font-bold tracking-[0.3em] uppercase text-xs backdrop-blur-sm bg-black/20 rounded-sm border border-white/10 hover:border-gold/50 hover:scale-105"
                                style={{
                                    textShadow: `
                                        0 0 10px rgba(255, 255, 255, 0.6),
                                        0 0 20px rgba(255, 255, 255, 0.4),
                                        0 0 30px rgba(255, 255, 255, 0.3),
                                        0 0 40px rgba(212, 175, 55, 0.2)
                                    `
                                }}
                            >
                                Close
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="relative h-[600px] w-full overflow-hidden">
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
