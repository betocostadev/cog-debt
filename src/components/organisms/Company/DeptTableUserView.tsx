import LazyIcon from '#/components/atoms/Icons/LazyIcon'
import { icons } from '#/utils/icons'
import { useNavigate } from '@tanstack/react-router'

export function DeptTableUserView({ userId }: { userId: number }) {
  const navigate = useNavigate()

  const goToUserPage = () => {
    navigate({
      to: '/dashboard/users/$userId',
      params: { userId: String(userId) },
      viewTransition: { types: ['slide-left'] },
    })
  }

  return (
    <span className="flex gap-2" onClick={goToUserPage}>
      View <LazyIcon icon={icons.Eye} size={20} iconColor="deepskyblue" />
    </span>
  )
}
