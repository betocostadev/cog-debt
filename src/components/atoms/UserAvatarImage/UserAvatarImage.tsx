export type TAvatarSizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

type UserAvatarImageProps = {
  src: string
  alt?: string
  size?: TAvatarSizes
}

export function UserAvatarImage({
  src,
  alt,
  size = 'xs',
}: UserAvatarImageProps) {
  return (
    <>
      {src ? (
        <img
          src={src}
          alt={alt}
          className={`${size === 'sm' ? 'h-10 w-10' : size === 'md' ? 'h-15 w-15' : size === 'lg' ? 'h-20 w-20' : size === 'xl' ? 'h-28 w-28' : 'h-8 w-8'} rounded-full object-cover`}
        />
      ) : (
        <span
          className={`${size === 'sm' ? 'h-10 w-10' : size === 'md' ? 'h-15 w-15' : size === 'lg' ? 'h-20 w-20' : size === 'xl' ? 'h-28 w-28' : 'h-8 w-8'} rounded-full object-cover`}
        >
          {alt?.slice(0, 2).toUpperCase()}
        </span>
      )}
    </>
  )
}
