import { BaseButton } from '#/components/atoms/Buttons/BaseButton'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '#/components/atoms/Dialog/Dialog'
import type { Dispatch, SetStateAction } from 'react'

interface DeleUserDialogProps {
  showDeleteDialog: boolean
  setShowDeleteDialog: Dispatch<SetStateAction<boolean>>
  confirmDelete: () => void
  username: string
}

export function DeleteUserDialog({
  showDeleteDialog,
  setShowDeleteDialog,
  confirmDelete,
  username,
}: DeleUserDialogProps) {
  return (
    <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
      <DialogContent className="sm:max-w-sm bg-slate-500">
        <DialogHeader>
          <DialogTitle className="text-center text-lg">Delete user</DialogTitle>
          <DialogDescription className="pt-2">
            Are you sure you want to delete <strong>{username}</strong>? This
            action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-slate-400 mt-2 pt-4 pb-2">
          <DialogClose
            render={
              <BaseButton
                label="Cancel"
                className="bg-secondary/70 hover:bg-secondary/90 text-secondary"
              />
            }
          />
          <BaseButton
            label="Delete"
            className="bg-red-500 text-white hover:bg-red-600"
            onClick={confirmDelete}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
