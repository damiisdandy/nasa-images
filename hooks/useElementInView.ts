import { useEffect, useRef } from "react"

type UseElementInViewProps = {
  options: IntersectionObserverInit,
  callback: () => void;
}

/**
 * execute callback function when element is in view
 */
export default function useElementInView({ options, callback }: UseElementInViewProps) {
  const containerRef = useRef(null);

  const onIntersecting: IntersectionObserverCallback = (entries) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      callback();
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersecting, options)
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    }
  }, [containerRef, options])

  return containerRef
}