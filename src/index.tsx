import React, { useEffect, useRef } from 'react'

type OutSideClickType = {
    onOutsideClick?: (v?: HTMLElement) => void
    ignoreElement?: IgnoreElementType
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

type IgnoreElementType =
    | (Element | string | HTMLElement)[]
    | string
    | HTMLCollectionOf<Element>
    | NodeList
    | Element
    | HTMLElement
    | Node

export const OutsideClick = ({ onOutsideClick, ignoreElement, ...others }: OutSideClickType) => {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                ref.current &&
                ref.current.contains &&
                !ref.current.contains(event.target as Node) &&
                !isContain(ignoreElement, event.target)
            ) {
                onOutsideClick && onOutsideClick(ref.current)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <div {...others} ref={ref}>
            {others.children}
        </div>
    )
}

export const useOutsideClick = (
    outsideClick?: (v: HTMLElement) => void,
    ignoreElement?: IgnoreElementType,
) => {
    const ref = useRef<any>(null)
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                ref.current &&
                ref.current.contains &&
                !ref.current.contains(event.target as Node) &&
                !isContain(ignoreElement, event.target)
            ) {
                outsideClick && outsideClick(ref.current)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])
    return ref
}

function isContain(ignoreElement?: IgnoreElementType, target?: any): boolean {
    if (!ignoreElement) return false

    if (Array.isArray(ignoreElement)) {
        for (const item of ignoreElement) {
            if (isContain(item, target)) {
                return true
            }
        }
        return false
    } else if (typeof ignoreElement === 'string') {
        const ele = document.querySelector(ignoreElement)
        return !!ele?.contains(target)
    } else if (ignoreElement instanceof HTMLCollection || ignoreElement instanceof NodeList) {
        for (let i = 0; i < ignoreElement.length; i++) {
            const item = ignoreElement[i]
            if (isContain(item, target)) {
                return true
            }
        }
        return false
    } else if (
        ignoreElement instanceof HTMLElement ||
        ignoreElement instanceof Element ||
        ignoreElement instanceof Node
    ) {
        if (ignoreElement instanceof Node) {
            const element = ignoreElement.parentElement
            return !!element && element.contains(target)
        }

        return (ignoreElement as Element).contains(target)
    } else {
        return false
    }
}

export default OutsideClick
