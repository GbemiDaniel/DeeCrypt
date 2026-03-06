import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        // Force a scroll to the top of the window on every route change.
        // By wrapping this in setTimeout, we ensure it fires after React
        // has unmounted the old route and mounted the new route.
        const timeout = setTimeout(() => {
            window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        }, 10);

        return () => clearTimeout(timeout);
    }, [pathname]);

    return null;
}
