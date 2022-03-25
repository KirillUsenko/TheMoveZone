import Image from 'next/image'
import { useState } from 'react'
import styles from '../../styles/Type.module.scss'
import Modal from '../Modal.jsx'

const Type = ({ className, url, type, newType=false, modal, children }) => {
  const [ isModalActive, setIsModalActive ] = useState(false)

  return (
    <>
      <div className={styles.type + ' ' + className} onClick={() => setIsModalActive(true)}>
        <div className={newType ? styles.image + ' ' + styles.image_new : styles.image}>
          <Image src={`/types/${url}.png`} alt="фоновое изображение" 
            width={type === 'little' ? '407px' : '625px'}
            height='250px' />
        </div>
        <h3 className={styles.title}>{children}</h3>
      </div>
      
      {isModalActive && <Modal cb={() => setIsModalActive(false)} url={modal.url} height={modal.height}>{modal.content}</Modal>}
    </>
  )
}
export default Type
