"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { getTransitionTier, type TransitionTier } from "./routeClass";

type TransitionPhase = "idle" | "exit" | "enter";
type TransitionOverride = "auto" | "major" | "minor" | "none";

type NavigationOptions = {
  transition?: TransitionOverride;
  replace?: boolean;
  scroll?: boolean;
};

type PageTransitionContextValue = {
  startTransitionNavigation: (href: string, options?: NavigationOptions) => void;
  isTransitioning: boolean;
  currentPhase: TransitionPhase;
  activeTier: TransitionTier;
  shouldReduceMotion: boolean;
};

const EXIT_MS: Record<TransitionTier, number> = {
  major: 520,
  minor: 380,
};

const ENTER_MS: Record<TransitionTier, number> = {
  major: 460,
  minor: 320,
};

const REDUCED_ENTER_MS = 120;

const RIGHT_WIPE_DURATION_S = 0.72;
const RIGHT_WIPE_EASE: [number, number, number, number] = [0.645, 0.045, 0.355, 1];
const RIGHT_WIPE_LAYER_DELAYS_S = [0, 0.24, 0.16] as const;
const RIGHT_WIPE_NAV_SWITCH_MS = 360;
const RIGHT_WIPE_TOTAL_MS = 960;

const PageTransitionContext = createContext<PageTransitionContextValue | null>(null);

const normalizePath = (path: string): string => {
  if (!path) return "/";
  return path.split("?")[0].split("#")[0];
};

export function usePageTransition() {
  const context = useContext(PageTransitionContext);

  if (!context) {
    throw new Error("usePageTransition must be used within PageTransitionProvider");
  }

  return context;
}

export function PageTransitionContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";
  const { activeTier, shouldReduceMotion } = usePageTransition();

  return (
    <div className="page-transition-root">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          className="page-transition-content"
          style={{ transformOrigin: "50% 100%" }}
          initial={
            shouldReduceMotion
              ? { opacity: 0.01 }
              : {
                  opacity: 0,
                  y: activeTier === "major" ? 30 : 20,
                  scale: activeTier === "major" ? 0.97 : 0.985,
                }
          }
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={
            shouldReduceMotion
              ? { opacity: 0.01 }
              : {
                  opacity: 0,
                  y: activeTier === "major" ? -16 : -10,
                  scale: activeTier === "major" ? 1.004 : 1.002,
                }
          }
          transition={{
            duration: shouldReduceMotion ? 0.12 : activeTier === "major" ? 0.48 : 0.32,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname() || "/";
  const reducedMotion = useReducedMotion();

  const [currentPhase, setCurrentPhase] = useState<TransitionPhase>("idle");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeTier, setActiveTier] = useState<TransitionTier>("major");
  const [cycleKey, setCycleKey] = useState(0);

  const previousPathRef = useRef(pathname);
  const exitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const enterTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const shouldReduceMotion = Boolean(reducedMotion);

  const clearTimers = useCallback(() => {
    if (exitTimerRef.current) {
      clearTimeout(exitTimerRef.current);
      exitTimerRef.current = null;
    }

    if (enterTimerRef.current) {
      clearTimeout(enterTimerRef.current);
      enterTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, [clearTimers]);

  const startTransitionNavigation = useCallback(
    (href: string, options?: NavigationOptions) => {
      const transition = options?.transition ?? "auto";
      const nextPath = normalizePath(href);

      if (transition === "none" || shouldReduceMotion) {
        if (options?.replace) {
          router.replace(href, { scroll: options?.scroll });
          return;
        }

        router.push(href, { scroll: options?.scroll });
        return;
      }

      const nextTier: TransitionTier =
        transition === "major" || transition === "minor"
          ? transition
          : getTransitionTier(previousPathRef.current, nextPath);

      clearTimers();
      setActiveTier(nextTier);
      setCycleKey((value) => value + 1);
      setCurrentPhase("exit");
      setIsTransitioning(true);

      exitTimerRef.current = setTimeout(() => {
        if (options?.replace) {
          router.replace(href, { scroll: options?.scroll });
          return;
        }

        router.push(href, { scroll: options?.scroll });
      }, RIGHT_WIPE_NAV_SWITCH_MS);
    },
    [clearTimers, router, shouldReduceMotion]
  );

  useEffect(() => {
    if (previousPathRef.current === pathname) return;

    const fromPath = previousPathRef.current;
    const toPath = pathname;
    previousPathRef.current = pathname;

    clearTimers();

    const nextTier = getTransitionTier(fromPath, toPath);
    setActiveTier(nextTier);

    if (shouldReduceMotion) {
      setCurrentPhase("enter");
      setIsTransitioning(true);

      enterTimerRef.current = setTimeout(() => {
        setCurrentPhase("idle");
        setIsTransitioning(false);
      }, REDUCED_ENTER_MS);

      return;
    }

    setCurrentPhase("enter");

    enterTimerRef.current = setTimeout(() => {
      setCurrentPhase("idle");
      setIsTransitioning(false);
    }, RIGHT_WIPE_TOTAL_MS);
  }, [clearTimers, pathname, shouldReduceMotion]);

  const contextValue = useMemo<PageTransitionContextValue>(
    () => ({
      startTransitionNavigation,
      isTransitioning,
      currentPhase,
      activeTier,
      shouldReduceMotion,
    }),
    [activeTier, currentPhase, isTransitioning, shouldReduceMotion, startTransitionNavigation]
  );

  const showPanels = !shouldReduceMotion && isTransitioning;

  return (
    <PageTransitionContext.Provider value={contextValue}>
      <MotionConfig transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
        {children}

        {showPanels && (
          <div className="page-transition-overlay" aria-hidden="true">
            {RIGHT_WIPE_LAYER_DELAYS_S.map((delay, index) => (
              <motion.span
                key={`${cycleKey}-${index}`}
                className={`page-transition-panel page-transition-panel--${index + 1}`}
                initial={{ x: "102%" }}
                animate={{ x: "-102%" }}
                transition={{
                  duration: RIGHT_WIPE_DURATION_S,
                  ease: RIGHT_WIPE_EASE,
                  delay,
                }}
              />
            ))}
          </div>
        )}
      </MotionConfig>
    </PageTransitionContext.Provider>
  );
}
