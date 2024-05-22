import { FC } from 'react'
import { observer } from 'mobx-react-lite'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Mousewheel, Navigation } from 'swiper/modules'

import { useRootStore } from 'hooks/useRootStore'
import { genres } from 'config/genres'
import Button from 'ui/Button'
import ArrowLeftSvg from 'assets/svg/ArrowLeftSvg'

import style from './Filter.module.scss'

const Filter: FC = observer(() => {
   const { filter } = useRootStore()

   return (
      <div className={style.filter}>
         <Button
            className={`${style.btnNavigate} ${style.btnPrev}`}
            design='default'
         >
            <ArrowLeftSvg />
         </Button>
         <Swiper
            className={style.swiper}
            slidesPerView='auto'
            freeMode={true}
            spaceBetween={10}
            mousewheel={true}
            modules={[FreeMode, Mousewheel, Navigation]}
            navigation={{
               prevEl: `.${style.btnPrev}`,
               nextEl: `.${style.btnNext}`,
            }}
            cssMode={true}
         >
            {genres.map((item) => (
               <SwiperSlide
                  className={style.slide}
                  key={item}
               >
                  <button
                     className={`${style.btn} ${filter.genres.includes(item) && style.btnActive}`}
                     onClick={() => {
                        if (!!filter.genres.includes(item)) {
                           filter.delGenre(item)
                        } else {
                           filter.addGenre(item)
                        }
                     }}
                  >
                     {item}
                  </button>
               </SwiperSlide>
            ))}
         </Swiper>
         <Button
            className={`${style.btnNavigate} ${style.btnNext}`}
            design='default'
         >
            <ArrowLeftSvg />
         </Button>
      </div>
   )
})

export default Filter
