import { useEffect, useRef } from "react";

function useOutsideEvent(
  handler,
  events = ["click", "scroll"],
  listenCapturing = true,
) {
  const ref = useRef();

  useEffect(() => {
    function handleEvent(e) {
      // If the event target is outside the menu, invoke the handler
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    }

    // Prevent scroll propagation inside the menu
    if (ref.current) {
      ref.current.addEventListener("scroll", (e) => e.stopPropagation(), true);
    }

    // Add event listeners for each event in the events array
    events.forEach((event) => {
      document.addEventListener(event, handleEvent, listenCapturing);
    });

    return () => {
      // Clean up event listeners on unmount
      events.forEach((event) => {
        document.removeEventListener(event, handleEvent, listenCapturing);
      });

      // Clean up scroll event listener on the menu element
      if (ref.current) {
        ref.current.removeEventListener(
          "scroll",
          (e) => e.stopPropagation(),
          true,
        );
      }
    };
  }, [handler, events, listenCapturing]);

  return { ref };
}

export default useOutsideEvent;
