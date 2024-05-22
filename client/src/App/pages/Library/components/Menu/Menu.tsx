import { FC } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Mousewheel } from 'swiper/modules'
import { NavLink } from 'react-router-dom'

import style from './Menu.module.scss'

const Menu: FC = () => {
   const activeClass = (active: boolean) => (active ? `${style.link} ${style.linkActive} hover` : `${style.link} hover`)

   return (
      <div className={style.menu}>
         <Swiper
            className={style.swiper}
            slidesPerView='auto'
            freeMode={true}
            spaceBetween={10}
            mousewheel={true}
            modules={[FreeMode, Mousewheel]}
            cssMode={true}
         >
            <SwiperSlide className={style.swiperSlide}>
               <NavLink
                  to='tracks'
                  className={({ isActive }) => activeClass(isActive)}
               >
                  Треки
               </NavLink>
            </SwiperSlide>
            <SwiperSlide className={style.swiperSlide}>
               <NavLink
                  to='users'
                  className={({ isActive }) => activeClass(isActive)}
               >
                  Исполнители
               </NavLink>
            </SwiperSlide>
            <SwiperSlide className={style.swiperSlide}>
               <NavLink
                  to='albums'
                  className={({ isActive }) => activeClass(isActive)}
               >
                  Альбомы
               </NavLink>
            </SwiperSlide>
         </Swiper>
      </div>
   )
}

export default Menu
