export type RouteClass =
  | "home"
  | "work-index"
  | "work-detail"
  | "writing"
  | "photos"
  | "other";
export type TransitionTier = "major" | "minor";

const normalize = (pathname: string): string => {
  if (!pathname) return "/";
  return pathname.split("?")[0].split("#")[0];
};

export function getRouteClass(pathname: string): RouteClass {
  const path = normalize(pathname);

  if (path === "/") return "home";
  if (path === "/work") return "work-index";
  if (path.startsWith("/work/")) return "work-detail";
  if (path === "/writing" || path.startsWith("/writing/")) return "writing";
  if (path === "/photos" || path.startsWith("/photos/")) return "photos";

  return "other";
}

export function getTransitionTier(fromPath: string, toPath: string): TransitionTier {
  const fromClass = getRouteClass(fromPath);
  const toClass = getRouteClass(toPath);

  if (
    (fromClass === "work-detail" || fromClass === "work-index") &&
    (toClass === "work-detail" || toClass === "work-index")
  ) {
    return "minor";
  }

  if (
    (fromClass === "home" && toClass === "work-detail") ||
    (fromClass === "work-detail" && toClass === "home") ||
    (fromClass === "home" && toClass === "work-index") ||
    (fromClass === "work-index" && toClass === "home") ||
    (fromClass === "photos" && toClass === "writing") ||
    (fromClass === "writing" && toClass === "photos")
  ) {
    return "major";
  }

  if (fromClass !== toClass) {
    return "major";
  }

  return "minor";
}
