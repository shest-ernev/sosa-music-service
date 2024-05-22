import { FC } from 'react'

const PlaySvg: FC<{ className?: string }> = ({ className }) => (
   <svg
      width='17'
      height='20'
      viewBox='0 0 17 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
   >
      <path
         fillRule='evenodd'
         clipRule='evenodd'
         d='M15.5684 7.3523L4.25215 0.406243C2.35759 -0.755943 0 0.714432 0 3.05409V16.9455C0 19.2882 2.35759 20.7555 4.25215 19.5934L15.5684 12.6508C17.4772 11.4795 17.4772 8.52363 15.5684 7.3523Z'
         fill='#393939'
      />
   </svg>
)

export default PlaySvg
