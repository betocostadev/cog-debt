import { ErrorBoundary } from '../molecules/ErrorBoundary'

export function VideoFrame({
  title,
  subtitle,
  source,
  videoTitle,
  videoClassName,
}: {
  title?: string
  subtitle?: string
  source: string
  videoTitle?: string
  videoClassName?: string
}) {
  return (
    <ErrorBoundary>
      <div className="text-md mt-4 mb-8 text-secondary">
        {title && <p className="font-semibold text-lg">{title}</p>}
        {subtitle && <p className="font-thin text-md">{subtitle}</p>}
      </div>
      <iframe
        className={`${videoClassName ? videoClassName : 'sm:w-full w-3/5 h-96'}`}
        src={source}
        title={`${videoTitle ? videoTitle : 'YouTube video player'}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </ErrorBoundary>
  )
}
