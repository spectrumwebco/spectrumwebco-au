'use client'

import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from 'framer-motion'
import Image, { type ImageProps } from 'next/image'
import { useRef } from 'react'

const MotionImage = motion(Image)

export function GrayscaleTransitionImage(
  props: Pick<
    ImageProps,
    'src' | 'quality' | 'className' | 'sizes' | 'priority'
  > & { alt?: string },
) {
  let ref = useRef<React.ElementRef<'div'>>(null)
  let { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 65%', 'end 35%'],
  })
  let grayscale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0, 1])
  let filter = useMotionTemplate`grayscale(${grayscale})`

  return (
    <div ref={ref} className="group relative">
      <MotionImage alt="" style={{ filter } as any} {...props} />
      <div
        className="pointer-events-none absolute top-0 left-0 w-full opacity-0 transition duration-300 group-hover:opacity-100"
        aria-hidden="true"
      >
        <Image alt="" {...props} />
      </div>
    </div>
  )
}
