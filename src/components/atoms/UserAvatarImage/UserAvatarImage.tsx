type UserAvatarImageProps = {
  src: string
  alt?: string
}

export function UserAvatarImage({ src, alt }: UserAvatarImageProps) {
  return (
    <>
      {src ? (
        <img
          src={src}
          alt={alt}
          className="h-10 w-10 rounded-full object-cover"
        />
      ) : (
        <span className="h-10 w-10 rounded-full object-cover">
          {alt?.slice(0, 2).toUpperCase()}
        </span>
      )}
    </>
  )
}
