import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'

import App from './App'

import './styles/all.scss'
import 'react-image-crop/dist/ReactCrop.css'
import 'swiper/css'
import 'swiper/css/free-mode'

ReactDOM.createRoot(document.getElementById('root')!).render(
   <BrowserRouter>
      <App />
   </BrowserRouter>
)
