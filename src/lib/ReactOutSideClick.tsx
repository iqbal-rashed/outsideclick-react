import React, { useLayoutEffect, useRef } from 'react'

type OutSideClickType = {
    onOutsideClick?: (v?: HTMLElement) => void
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export const OutsideClick = ({ onOutsideClick, ...others }: OutSideClickType) => {
    const ref = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                ref.current &&
                ref.current.contains &&
                !ref.current.contains(event.target as Node)
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

export const useOutsideClick = (outsideClick?: (v: HTMLElement) => void) => {
    const ref = useRef<any>(null)
    useLayoutEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                ref.current &&
                ref.current.contains &&
                !ref.current.contains(event.target as Node)
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
