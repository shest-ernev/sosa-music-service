import { FC } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation } from 'swiper/modules'

import { Album as AlbumType  } from 'types/models/album'
import Album from 'components/Album'
import Button from 'ui/Button'
import ArrowLeftSvg from 'assets/svg/ArrowLeftSvg'

import style from './Relizes.module.scss'

type RelizesProps = {
   albums: Pick<AlbumType, '_id' | 'name' | 'cover' | 'artists' | 'published' | 'admin' >[]
}

const Relizes: FC<RelizesProps> = ({ albums }) => {
   return (
      <div className={style.albums}>
         <p className={style.title}>
            Релизы
         </p>
         <div className={style.cntr}>
            <Button
               className={`${style.btn} ${style.btnPrev}`}
               design='default'
            >
               <ArrowLeftSvg />
            </Button>
            <Swiper
               className={style.swiper}
               slidesPerView='auto'
               freeMode={true}
               spaceBetween={10}
               modules={[FreeMode, Navigation]}
               cssMode={true}
               navigation={{
                  prevEl: `.${style.btnPrev}`,
                  nextEl: `.${style.btnNext}`
               }}
            >
               {albums.map((obj) => (
                  <SwiperSlide
                     key={obj._id}
                     className={style.slide}
                  >
                     <Album 
                        className={style.album}
                        _id={obj._id}
                        name={obj.name}
                        cover={obj.cover}
                        artists={obj.artists}
                        published={obj.published}
                        admin={obj.admin}
                     />
                  </SwiperSlide>
               ))}
            </Swiper>
            <Button
               className={`${style.btn} ${style.btnNext}`}
               design='default'
            >
               <ArrowLeftSvg />
            </Button>
         </div>
      </div>
   )
}

export default Relizes
