import { cn } from "@/lib/utils";
// import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";

export const FloatingDock = ({
  items,
  desktopClassName,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  desktopClassName?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
    </>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  const isMobile = window.innerWidth < 768; // Check if the device is mobile
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={!isMobile ? (e) => mouseX.set(e.pageX) : undefined} // Disable mouse move on mobile
      onMouseLeave={!isMobile ? () => mouseX.set(Infinity) : undefined} // Disable mouse leave on mobile
      className={cn(
        "mx-auto flex z-[9999] h-[76px] gap-1 items-end rounded-3xl bg-gray-50 px-2 w-fit pb-2",
        className
      )}
    >
      {items.map((item) => (
        <IconContainer
          mouseX={mouseX}
          key={item.title}
          {...item}
          isMobile={isMobile}
        />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
  isMobile,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href: string;
  isMobile: boolean; // New prop to determine if it's mobile
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [60, 100, 60]); // Increased sizes
  const heightTransform = useTransform(distance, [-150, 0, 150], [60, 100, 60]); // Increased sizes

  const widthTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [30, 50, 30] // Increased icon sizes
  );
  const heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [30, 50, 30] // Increased icon sizes
  );

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  return (
    <Link href={href}>
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={!isMobile ? () => setHovered(true) : undefined} // Disable hover effect on mobile
        onMouseLeave={!isMobile ? () => setHovered(false) : undefined} // Disable hover effect on mobile
        className={`aspect-square rounded-full group bg-midgrey flex items-center justify-center relative ${
          hovered ? "bg-mainblue" : ""
        }`} // Keep blue color on active icon
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 20, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="px-2 py-1 whitespace-pre rounded-md bg-fullwhite border border-midgrey absolute left-1/2 -translate-x-1/2 -top-12 w-fit text-sm"
            >
              <div className="h4 !text-[1.25rem] font-medium">{title}</div>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center"
        >
          {icon}
        </motion.div>
      </motion.div>
    </Link>
  );
}
