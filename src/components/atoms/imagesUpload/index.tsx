/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from 'posy-fnb-core'
import { Slider } from 'antd'
import React, { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import getCroppedImg from '@/constants/cropImage'

interface ImageCropperProps {
  image: string
  setImage: (image: any) => void
  onSubmit: (image: any) => void
}

const ImageCropper = ({ image, setImage, onSubmit }: ImageCropperProps) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)

  const onCropComplete = useCallback(
    (croppedArea: any, cropAreaPixels: any) => {
      setCroppedAreaPixels(cropAreaPixels)
    },
    [],
  )

  const showCroppedImage = useCallback(async () => {
    try {
      const cropImage = await getCroppedImg(image, croppedAreaPixels)
      setCroppedImage(cropImage)
      onSubmit(image)
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels, image])

  const onCancelChange = () => {
    setImage('')
    setCroppedImage(null)
    setCroppedAreaPixels(null)
  }

  return (
    <section className="flex h-fit w-fit flex-col">
      {image && (
        <aside>
          <div className="relative mt-2 h-[224px] w-[224px] ">
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={1 / 1}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>
          <div className="mt-1 w-[224px]">
            <div>
              <Slider
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                onChange={(e) => setZoom(e)}
              />
            </div>

            <div className="flex items-center gap-3">
              <Button
                className="mt-2 h-9 w-full rounded-md shadow-md"
                onClick={onCancelChange}
              >
                Cancel
              </Button>
              <Button
                className="mt-2 h-9 w-full rounded-md"
                onClick={showCroppedImage}
                type="button"
              >
                Apply
              </Button>
            </div>
          </div>
        </aside>
      )}
    </section>
  )
}

export default ImageCropper
