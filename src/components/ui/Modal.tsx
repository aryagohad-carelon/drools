import { useEffect, useRef } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
      onClick={(e) => {
        if (e.target === backdropRef.current) onClose()
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Sheet */}
      <div className="relative w-full max-w-lg bg-[#FFF9F3] rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[92svh] flex flex-col">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 bg-[#EDE0D2] rounded-full" />
        </div>

        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-5 pt-4 pb-2">
            <h2 className="text-lg font-bold text-[#2A211E]">{title}</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#EDE0D2] flex items-center justify-center text-[#2A211E] hover:bg-[#E0D0C4] transition-colors"
              aria-label="Close"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Content */}
        <div className="overflow-y-auto flex-1 px-5 pb-6 pt-2">{children}</div>
      </div>
    </div>
  )
}
