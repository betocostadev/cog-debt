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

interface ResetStarCollabDialogProps {
  showResetDialog: boolean
  setShowResetDialog: Dispatch<SetStateAction<boolean>>
  confirmReset: () => void
}

export function ResetStarCollabDialog({
  showResetDialog,
  setShowResetDialog,
  confirmReset,
}: ResetStarCollabDialogProps) {
  return (
    <Dialog open={showResetDialog} onOpenChange={setShowResetDialog}>
      <DialogContent
        data-testid="reset-collab-dialog"
        className="sm:max-w-sm bg-slate-500"
      >
        <DialogHeader data-testid="reset-collab-dialog-header">
          <DialogTitle className="text-center text-lg">
            Reset Star Collaborator
          </DialogTitle>
          <DialogDescription className="pt-2">
            Are you sure you want to reset the Star Collaborator? There will be
            no Star Collaborator until another user is selected.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter
          data-testid="reset-collab-dialog-footer"
          className="bg-slate-400 mt-2 pt-4 pb-2"
        >
          <DialogClose
            render={
              <BaseButton
                label="Cancel"
                className="bg-secondary/70 hover:bg-secondary/90 text-secondary"
              />
            }
          />
          <BaseButton
            label="Reset"
            className="bg-red-500 text-white hover:bg-red-600"
            onClick={confirmReset}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
