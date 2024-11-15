import { useEffect, useContext, useRef } from "react";
import { MenusContext } from "../ui/Menus.jsx";

function ScrollAndResizeHandler() {
  const { position, close } = useContext(MenusContext);
  const prevPositionRef = useRef({ x: 0, y: 0 }); // Initial value to prevent trigger

  //TODO: Scroll Y to close context menu

  useEffect(() => {
    const handleScrollOrResize = () => {
      if (position && prevPositionRef.current) {
        // Check if the List is open and the position has changed significantly
        if (
          Math.abs(position.x - prevPositionRef.current.x) > 1 ||
          Math.abs(position.y - prevPositionRef.current.y) > 1
        ) {
          close();
        }
      }

      // Update the previous position
      prevPositionRef.current = position
        ? { ...position }
        : prevPositionRef.current;
    };

    window.addEventListener("scroll", handleScrollOrResize);
    window.addEventListener("resize", handleScrollOrResize);

    return () => {
      window.removeEventListener("scroll", handleScrollOrResize);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, [position, close]);

  return null;
}

export default ScrollAndResizeHandler;
