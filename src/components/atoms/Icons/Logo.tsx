import LogoUrl from '/logo-192.png'

interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: number | string
}

export function Logo({ size = 32, className = '', ...props }: LogoProps) {
  return (
    <img
      src={LogoUrl}
      alt="Cog Debt Logo"
      width={size}
      height={size}
      className={`object-contain ${className}`}
      {...props}
    />
  )
}
