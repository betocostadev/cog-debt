type UserAvatarImageProps = {
  src: string
  alt?: string
  size?: 'small' | 'medium' | 'large'
}

export function UserAvatarImage({
  src,
  alt,
  size = 'small',
}: UserAvatarImageProps) {
  return (
    <>
      {src ? (
        <img
          src={src}
          alt={alt}
          className={`${size === 'medium' ? 'h-15 w-15' : size === 'large' ? 'h-20 w-20' : 'h-10 w-10'} rounded-full object-cover`}
        />
      ) : (
        <span
          className={`${size === 'medium' ? 'h-15 w-15' : size === 'large' ? 'h-20 w-20' : 'h-10 w-10'} rounded-full object-cover`}
        >
          {alt?.slice(0, 2).toUpperCase()}
        </span>
      )}
    </>
  )
}
