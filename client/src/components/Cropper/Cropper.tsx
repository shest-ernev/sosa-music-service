import { FC, MutableRefObject, useEffect, useRef, useState, MouseEvent } from 'react'
import ReactCrop, { PercentCrop } from 'react-image-crop'

import { useClickOut } from 'hooks/useClickOut'
import { useKey } from 'hooks/useKey'
import CropSvg from 'assets/svg/CropSvg'
import CloseSvg from 'assets/svg/CloseSvg'
import Button from 'ui/Button'

import style from './Cropper.module.scss'

type HandleSubmit = MouseEvent<HTMLButtonElement> & {
   canvas: MutableRefObject<HTMLCanvasElement | null>
}

type CropperProps = {
   open: boolean
   onClose: () => void
   src: string
   onSubmit?: (event: HandleSubmit) => void
   aspect?: number
   btn?: MutableRefObject<any>
   circularCrop?: boolean
}

const Cropper: FC<CropperProps> = ({ open, onClose, src, onSubmit, aspect, btn, circularCrop }) => {
   const [crop, setCrop] = useState<PercentCrop>()
   const [complete, setComplete] = useState<PercentCrop>()
   const [defaultSrc, setDefaultSrc] = useState<string | undefined>('')

   const modalRef = useRef<HTMLDivElement | null>(null)
   const canvasRef = useRef<HTMLCanvasElement | null>(null)
   const imgRef = useRef<HTMLImageElement | null>(null)

   const handleSubmit = (event: HandleSubmit) => {
      if (canvasRef.current === null || imgRef.current === null) {
         return
      }

      if (complete === undefined) {
         return
      }

      const ctx = canvasRef.current.getContext('2d')

      if (ctx === null) {
         return
      }

      canvasRef.current.width = (imgRef.current.naturalWidth / 100) * complete.width
      canvasRef.current.height = (imgRef.current.naturalHeight / 100) * complete.height

      ctx.drawImage(
         imgRef.current,
         (imgRef.current.naturalWidth / 100) * complete.x,
         (imgRef.current.naturalHeight / 100) * complete.y,
         (imgRef.current.naturalWidth / 100) * complete.width,
         (imgRef.current.naturalHeight / 100) * complete.height,
         0,
         0,
         (imgRef.current.naturalWidth / 100) * complete.width,
         (imgRef.current.naturalHeight / 100) * complete.height
      )

      event.canvas = canvasRef

      onSubmit ? onSubmit(event) : undefined

      ctx.clearRect(0, 0, 0, 0)
   }

   useKey('Escape', () => {
      setCrop(undefined)
      setComplete(undefined)
      onClose()
   })

   useClickOut(
      modalRef,
      btn,
      () => {
         if (!!crop?.width === false) {
            setCrop(undefined)
            setComplete(undefined)
            onClose()
         }
      },
      [crop]
   )

   useEffect(() => {
      if (src !== '') {
         setDefaultSrc(src)
      }
   }, [src])

   useEffect(() => {
      if (!open) {
         setCrop(undefined)
         setComplete(undefined)
      }
   }, [open])

   return (
      <div className={`${style.cntr} ${open && style.open}`}>
         <div
            ref={modalRef}
            className={style.modal}
         >
            <div className={style.header}>
               <div className={style.title}>
                  <CropSvg />
                  <div className={style.titleText}>
                     <p> Обрезать изображение </p>
                     <p> Проведите по изображению </p>
                  </div>
               </div>
               <button
                  className={`${style.close} hover`}
                  onClick={onClose}
               >
                  <CloseSvg />
               </button>
            </div>
            <ReactCrop
               className={style.cropPlace}
               crop={crop}
               onChange={(_, crop) => setCrop(crop)}
               onComplete={(_, crop) => setComplete(crop)}
               aspect={aspect}
               circularCrop={circularCrop}
            >
               <img
                  className={style.img}
                  src={defaultSrc}
                  ref={imgRef}
               />
            </ReactCrop>
            <div className={style.actions}>
               <Button
                  className={style.submit}
                  disabled={crop?.width === 0}
                  onClick={(event: HandleSubmit) => handleSubmit(event)}
               >
                  Кадрировать
               </Button>
            </div>
         </div>
         <canvas
            ref={canvasRef}
            style={{ display: 'none' }}
         ></canvas>
      </div>
   )
}

export default Cropper
