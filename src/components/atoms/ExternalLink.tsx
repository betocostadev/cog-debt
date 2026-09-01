import { icons } from '#/utils/icons'
import LazyIcon from './Icons/LazyIcon'

type ExternalLinkProps = {
  link: string
  title: string
  testId?: string
}

export function ExternalLink({ link, title, testId }: ExternalLinkProps) {
  return (
    <>
      <a
        href={link}
        data-testid={testId}
        rel="noreferrer"
        target="_blank"
        className="text-blue-400 font-light cursor-pointer underline"
      >
        {title}
        <LazyIcon
          icon={icons.SquareArrowOutUpRight}
          iconClassName="ml-1 mr-2 inline"
          size={16}
        />
      </a>
    </>
  )
}
