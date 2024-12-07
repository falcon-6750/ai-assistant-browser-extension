import { useEffect, useRef } from "react";

export function useAutoScroll({ observe, scrollTo }: { observe: object[], scrollTo: string }) {
  const mainRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mainRef.current) {
      return;
    }

    const nodes: NodeListOf<HTMLLIElement> =
      mainRef.current.querySelectorAll(scrollTo);
    if (!nodes.length) {
      return;
    }

    const lastNode = nodes[nodes.length - 1];
    const offset = lastNode?.offsetTop ?? 0;
    mainRef.current.scrollTo({
      top: offset - 60,
      behavior: "smooth",
    });
  }, [observe, scrollTo]);

  return mainRef;
}
