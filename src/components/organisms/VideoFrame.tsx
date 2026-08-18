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
      <div className="text-md my-8 text-secondary">
        {title && <p className="font-semibold text-lg pt-2">{title}</p>}
        {subtitle && <p className="font-thin text-md pt-2">{subtitle}</p>}
      </div>
      <iframe
        className={`${videoClassName ? videoClassName : 'w-full px-2 md:w-4/5 md:mx-auto h-96'}`}
        src={source}
        title={`${videoTitle ? videoTitle : 'YouTube video player'}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </ErrorBoundary>
  )
}
