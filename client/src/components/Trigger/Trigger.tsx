import { useEffect, FC } from 'react'
import { useInView } from 'react-intersection-observer'

import Loader from 'ui/Loader'

import style from './Trigger.module.scss'

type TriggerProps = {
   loading?: boolean
   end: boolean
   request?: () => void
   className?: string,
}

const Trigger: FC<TriggerProps> = ({ loading, end, request, className }) => {
   const { ref, inView } = useInView({ threshold: 0.5 })

   useEffect(() => {
      if (inView && !loading && !end) {
         request ? request() : undefined
      }
   }, [inView])

   return (
      !end && (
         <div
            className={`${style.trigger} ${loading && style.triggerActive} ${className}`}
            ref={ref}
         >
            <Loader />
         </div>
      )
   )
}

export default Trigger
