import React, { useLayoutEffect, useRef } from 'react'

type OutSideClickType = {
    onOutSideClick?: (v?: EventTarget) => void
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export const OutsideClick = ({ onOutSideClick, ...others }: OutSideClickType) => {
    const ref = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                ref.current &&
                ref.current.contains &&
                !ref.current.contains(event.target as Node)
            ) {
                onOutSideClick && onOutSideClick(event.target as EventTarget)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div {...others} ref={ref}>
            {others.children}
        </div>
    )
}

export const useOutsideClick = (outsideClick?: (v: EventTarget) => void) => {
    const ref = useRef<HTMLDivElement | HTMLInputElement | HTMLImageElement | HTMLElement>(null)
    useLayoutEffect(() => {
        document.addEventListener('mousedown', (e: MouseEvent) => {
            ref.current &&
                ref.current.contains &&
                ref.current.contains(e.target as Node) &&
                outsideClick &&
                outsideClick(e.target as EventTarget)
        })
    }, [])
    return ref
}
