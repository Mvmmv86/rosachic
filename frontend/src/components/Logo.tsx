'use client'

import Link from 'next/link'

export function Logo() {
  return (
    <Link href="/" className="cursor-pointer">
      <img
        src="/rosa-chic-logo.png"
        alt="Rosa Chic"
        className="w-[65px] h-[65px] rounded-full object-contain flex-shrink-0 hover:opacity-90 transition-opacity"
      />
    </Link>
  )
}
