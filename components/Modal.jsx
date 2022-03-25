import Image from 'next/image'
import styles from '../styles/Modal.module.scss'
import { useState, useEffect } from "react"

const Modal = ({ url, cb, height, type, className='', children }) => {
    const [ isActive, setActive ] = useState(true)

    useEffect(() => {
        document.querySelector('html').style.overflow = 'hidden'
        document.querySelector('body').style.overflow = 'hidden'
    }, [])

    return (
        <>
            <div className={
                isActive ? styles.modal__back + ' ' + styles.modal__back_active : styles.modal__back
            } onClick={() => {
                document.querySelector('html').style.overflow = 'auto'
                document.querySelector('body').style.overflow = 'auto'
                setActive(false)
                cb()
            }}></div>

            <div className={
                type === 'ref' ?
                isActive ? styles.modal + ' ' + styles.modal_active + ' ' + styles.modal_ref  + ' ' + className : styles.modal  + ' ' + styles.modal_ref + ' ' + className
                :
                isActive ? styles.modal + ' ' + styles.modal_active  + ' ' + className : styles.modal  + ' ' + className
            }>
                <div className={type === 'ref' ? styles.modal__image + ' ' + styles.modal__image_ref : styles.modal__image}>
                    <Image src={url} width="1062px" height={height ? height : '500px'} />
                </div>
                <div className={styles.modal__content}>
                    {children}
                </div>
            </div>
        </>
    )
}

export default Modal