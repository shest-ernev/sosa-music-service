import { FC } from 'react'
import { observer } from 'mobx-react-lite'
import { ReactTyped } from 'react-typed'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import { useRootStore } from 'hooks/useRootStore'
import PlaySvg from 'assets/svg/PlaySvg'
import LogoSvg from 'assets/svg/LogoSvg'
import Button from 'ui/Button'
import OkRuSvg from 'assets/svg/OkRuSvg'
import TgSvg from 'assets/svg/TgSvg'
import GitHubSvg from 'assets/svg/GitHubSvg'
import VkSvg from 'assets/svg/VkSvg'

import style from './Main.module.scss'

const Main: FC = observer(() => {
   const navigate = useNavigate()

   const {
      auth: { auth },
   } = useRootStore()

   return (
      <div className={style.main}>
         <Helmet title='Sosa' />
         <div className={style.helloBaner}>
            <div className={style.hello}>
               <LogoSvg />
               <ReactTyped
                  className={style.helloText}
                  strings={[
                     'Это Sosa',
                     'Слушайте любимую музыку',
                     'Публикуйте ваши релизы',
                     'Иследуйте жанры',
                     'Всё бесплатно',
                     'Ещё разработчик жэсть как устал',
                     'А так же не успевал',
                     'И поэтому такая главная старница',
                     'На минимализме :)',
                  ]}
                  loop={true}
                  typeSpeed={50}
                  backSpeed={20}
               />
            </div>
            <div className={style.actions}>
               {auth ? (
                  <>
                     <Button
                        onClick={() => navigate('/library/tracks')}
                        className={style.play}
                     >
                        <PlaySvg />
                        <p> Слушать любимые треки </p>
                     </Button>
                  </>
               ) : (
                  <>
                     <Button
                        onClick={() => navigate('/auth/sign-in')}
                        className={style.btn}
                     >
                        Войти
                     </Button>
                     <span />
                     <Button
                        onClick={() => navigate('/auth/sign-up')}
                        className={style.btn}
                     >
                        Зарегистрироваться
                     </Button>
                  </>
               )}
            </div>
         </div>
         <div className={style.links}>
            <a
               className={style.contact}
               href='https://t.me/so_sa300'
               target='_blank'
            >
               <TgSvg />
            </a>
            <a
               className={style.contact}
               href='https://vk.com/so_sa300'
               target='_blank'
            >
               <VkSvg />
            </a>
            <a
               className={style.contact}
               href='https://github.com/shest-ernev'
               target='_blank'
            >
               <GitHubSvg />
            </a>
            <a
               className={style.contact}
               href='https://ok.ru/profile/558712492369?utm_campaign=mobile_share&utm_content=profile'
               target='_blank'
            >
               <OkRuSvg />
            </a>
         </div>
      </div>
   )
})

export default Main
