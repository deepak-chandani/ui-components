import { useCallback, useEffect, useRef, useState } from "react";

export default function useDimensions(){
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: 400 });
  const containerRef = useRef<HTMLElement>();

  const ref = useCallback((node: HTMLElement) => {
    console.log("container ref node:", node)
    containerRef.current = node
    updateDimensions()
  }, []) // empty deps , our callback won't change b/w re-renders

  function updateDimensions(){
    const element = containerRef.current;
    if (element) {
      const newDimensions = {
        width: element.offsetWidth,
        height: 400,
      }
      setDimensions(newDimensions);
      console.log('dimensions set', newDimensions)
    }
  };

  // attach listener for resize event
  // TODO: performance: its better to use ResizeObserver to listen for resize on container
  // bcz window resize event will be fired very frequently
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return {dimensions, ref}
}