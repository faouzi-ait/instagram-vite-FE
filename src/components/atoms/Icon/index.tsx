import type { CSSProperties } from 'react'
import iconMap from './iconMap'
import styles from './icons.module.css'

import BookmarkEmpty from './svgs/bookmark-empty'
import BookmarkFull from './svgs/bookmark-full'
import CommentFull from './svgs/comment-full'
import CommentEmpty from './svgs/comment-empty'
import HeartEmpty from './svgs/heart-empty'
import HeartFull from './svgs/heart-full'
import Sun from './svgs/sun'
import Moon from './svgs/moon'
import Trash from './svgs/trash'
import Add from './svgs/add'
import Photo from './svgs/photo'
import Remove from './svgs/remove'
import Home from './svgs/home'
import Profile from './svgs/profile'
import Create from './svgs/create'

export type IconKey = keyof typeof iconMap

export interface IconProps {
  name: IconKey
  size?: number
  color?: string
  style?: CSSProperties
  className?: string
  onClick?: () => void
}

const iconComponents = {
  'bookmark-empty': BookmarkEmpty,
  'bookmark-full': BookmarkFull,
  'comment-full': CommentFull,
  'comment-empty': CommentEmpty,
  'heart-empty': HeartEmpty,
  'heart-full': HeartFull,
  sun: Sun,
  moon: Moon,
  trash: Trash,
  add: Add,
  photo: Photo,
  remove: Remove,
  home: Home,
  profile: Profile,
  create: Create,
}

export default function Icon({
  name,
  size = 24,
  color = 'currentColor',
  style,
  className,
  onClick,
}: IconProps) {
  const IconComponent = iconComponents[iconMap[name]]

  return (
    <span
      style={{
        width: `${size}px`,
        height: `${size}px`,
        color,
        ...style,
      }}
      className={[styles.icon, className].filter(Boolean).join(' ')}
      onClick={onClick}
    >
      <IconComponent />
    </span>
  )
}
