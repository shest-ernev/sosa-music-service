import { FC } from 'react'
import { observer } from 'mobx-react-lite'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Mousewheel } from 'swiper/modules'
import { NavLink } from 'react-router-dom'

import { useRootStore } from 'hooks/useRootStore'
import Input from 'ui/Input'
import LupaSvg from 'assets/svg/LupaSvg'

import style from './Menu.module.scss'

const Menu: FC = observer(() => {
   const {
      filter: { setSearch, search },
   } = useRootStore()

   const activeClass = (active: boolean) => active ? `${style.link} ${style.linkActive} hover` : `${style.link} hover`

   return (
      <>
         <div className={style.search}>
            <Input
               type='text'
               svg={<LupaSvg />}
               className={style.input}
               placeholder='Найти...'
               value={search}
               onChange={(event) => setSearch(event.target.value)}
            />
         </div>
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
                     to='users'
                     className={({ isActive }) => activeClass(isActive)}
                  >
                     Исполнители
                  </NavLink>
               </SwiperSlide>
               <SwiperSlide className={style.swiperSlide}>
                  <NavLink
                     to='music'
                     className={({ isActive }) => activeClass(isActive)}
                  >
                     Треки
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
      </>
   )
})

export default Menu
