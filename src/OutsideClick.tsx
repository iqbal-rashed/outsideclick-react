import React, { useEffect, useRef } from "react";

type OutSideClickType = {
  onOutsideClick?: (v?: HTMLElement) => void;
  ignoreElement?: IgnoreElementType;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export type IgnoreElementType =
  | (Element | string | HTMLElement)[]
  | string
  | HTMLCollectionOf<Element>
  | NodeList
  | Element
  | HTMLElement
  | Node;

export const OutsideClick = ({
  onOutsideClick,
  ignoreElement,
  ...others
}: OutSideClickType) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        ref.current &&
        ref.current.contains &&
        !ref.current.contains(event.target as Node) &&
        !isContain(ignoreElement, event.target as Node)
      ) {
        onOutsideClick?.(ref.current);
      }
    };

    document.addEventListener("mouseup", handleClickOutside);
    document.addEventListener("touchend", handleClickOutside);

    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
      document.removeEventListener("touchend", handleClickOutside);
    };
  }, []);

  return (
    <div {...others} ref={ref}>
      {others.children}
    </div>
  );
};

export function useOutsideClick<T = HTMLDivElement>(
  outsideClick?: (r?: T | null) => void,
  ignoreElement?: IgnoreElementType
) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        (ref.current as HTMLElement) &&
        (ref.current as HTMLElement).contains &&
        !(ref.current as HTMLElement).contains(event.target as Node) &&
        !isContain(ignoreElement, event.target as Node)
      ) {
        outsideClick?.(ref.current);
      }
    };
    document.addEventListener("mouseup", handleClickOutside);
    document.addEventListener("touchend", handleClickOutside);

    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
      document.removeEventListener("touchend", handleClickOutside);
    };
  }, []);
  return ref;
}

function isContain(
  ignoreElement: IgnoreElementType | undefined,
  target: Node | null
): boolean {
  if (!ignoreElement) return false;

  if (Array.isArray(ignoreElement)) {
    for (const item of ignoreElement) {
      if (isContain(item, target)) {
        return true;
      }
    }
    return false;
  } else if (typeof ignoreElement === "string") {
    const ele = document.querySelector(ignoreElement);
    return !!ele?.contains(target);
  } else if (
    ignoreElement instanceof HTMLCollection ||
    ignoreElement instanceof NodeList
  ) {
    for (let i = 0; i < ignoreElement.length; i++) {
      const item = ignoreElement[i];
      if (isContain(item, target)) {
        return true;
      }
    }
    return false;
  } else if (
    ignoreElement instanceof HTMLElement ||
    ignoreElement instanceof Element ||
    ignoreElement instanceof Node
  ) {
    if (ignoreElement instanceof Node) {
      const element = ignoreElement.parentElement;
      return !!element && element.contains(target);
    }

    return (ignoreElement as Element).contains(target);
  } else {
    return false;
  }
}

export default OutsideClick;
