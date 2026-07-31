export type TAvatarSizes = 'sm' | 'md' | 'lg' | 'xl'

type UserAvatarImageProps = {
  src: string
  alt?: string
  size?: TAvatarSizes
}

export function UserAvatarImage({
  src,
  alt,
  size = 'sm',
}: UserAvatarImageProps) {
  return (
    <>
      {src ? (
        <img
          src={src}
          alt={alt}
          className={`${size === 'md' ? 'h-15 w-15' : size === 'lg' ? 'h-20 w-20' : size === 'xl' ? 'h-28 w-28' : 'h-10 w-10'} rounded-full object-cover`}
        />
      ) : (
        <span
          className={`${size === 'md' ? 'h-15 w-15' : size === 'lg' ? 'h-20 w-20' : size === 'xl' ? 'h-28 w-28' : 'h-10 w-10'} rounded-full object-cover`}
        >
          {alt?.slice(0, 2).toUpperCase()}
        </span>
      )}
    </>
  )
}
