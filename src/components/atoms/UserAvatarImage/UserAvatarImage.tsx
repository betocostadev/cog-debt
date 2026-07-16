type UserAvatarImageProps = {
  src: string
  alt?: string
}

export function UserAvatarImage({ src, alt }: UserAvatarImageProps) {
  return (
    <img src={src} alt={alt} className="h-10 w-10 rounded-full object-cover" />
  )
}
