import type { ComponentPropsWithoutRef } from 'react'

type PageTitleProps = ComponentPropsWithoutRef<'h2'> & {
  title: string
}
export function PageTitle({ title, ...props }: PageTitleProps) {
  return (
    <h2
      data-testid={`${title}-title`}
      className="text-xl font-bold mb-2 pl-2"
      {...props}
    >
      {title}
    </h2>
  )
}
