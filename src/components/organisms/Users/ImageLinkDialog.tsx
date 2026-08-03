import type { Dispatch, SetStateAction } from 'react'
import { useId, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '#/components/atoms/Dialog/Dialog'
import { InputText } from '#/components/molecules/Form/InputText'
import { BaseButton } from '#/components/atoms/Buttons/BaseButton'

interface ImageLinkDialogProps {
  showDialog: boolean
  setShowDialog: Dispatch<SetStateAction<boolean>>
  onImageSelected: (url: string) => void
  currentImage: string
}
export function ImageLinkDialog({
  showDialog,
  setShowDialog,
  onImageSelected,
  currentImage,
}: ImageLinkDialogProps) {
  const [urlInput, setUrlInput] = useState(currentImage)
  const inputId = useId()

  const handleSave = () => {
    onImageSelected(urlInput)
    setShowDialog(false)
  }

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent className="sm:max-w-md bg-slate-900 border border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-lg">Set Avatar image URL</DialogTitle>
          <DialogDescription className="text-slate-400">
            Paste a public image link from the web to use as the user avatar.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <InputText
            id={inputId}
            label="Image URL"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://example.com/avatar.jpg"
          />
          {urlInput && (
            <div className="mt-4 flex justify-center">
              <img
                src={urlInput}
                alt="Preview"
                className="h-20 w-20 rounded-full object-cover border border-slate-600"
                onError={(e) => ((e.target as HTMLImageElement).src = '')}
              />
            </div>
          )}
        </div>

        <DialogFooter>
          <DialogClose
            render={
              <BaseButton
                label="Cancel"
                className="bg-secondary/70 hover:bg-secondary/90 text-secondary"
              />
            }
          />
          <BaseButton label="Save link" onClick={handleSave} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
