import { useEffect, useRef } from "react";

function useOutsideEvent(
  handler,
  events = ["click", "scroll"],
  listenCapturing = true,
) {
  const ref = useRef();

  useEffect(() => {
    function handleEvent(e) {
      if (ref.current && !ref.current.contains(e.target)) handler();
    }

    // Add event listeners for each event type
    events.forEach((event) => {
      document.addEventListener(event, handleEvent, listenCapturing);
    });

    return () => {
      // Clean up each event listener
      events.forEach((event) => {
        document.removeEventListener(event, handleEvent, listenCapturing);
      });
    };
  }, [handler, events, listenCapturing]);

  return { ref };
}

export default useOutsideEvent;
