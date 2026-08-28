import { icons } from '#/utils/icons'
import LazyIcon from './Icons/LazyIcon'

type ExternalLinkProps = {
  link: string
  title: string
}

export function ExternalLink({ link, title }: ExternalLinkProps) {
  return (
    <>
      <a
        href={link}
        rel="noreferrer"
        target="_blank"
        className="text-blue-400 font-light cursor-pointer underline"
      >
        {title}
        <LazyIcon
          icon={icons.SquareArrowOutUpRight}
          iconClassName="mx-2 inline"
        />
      </a>
    </>
  )
}
