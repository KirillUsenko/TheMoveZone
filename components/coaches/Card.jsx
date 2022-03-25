import Image from 'next/image'
import { useState, useEffect } from 'react'
import styles from '../../styles/Card.module.scss'

const Card = ({ url, title, children }) => {
    const [ isVisible, setIsVisible ] = useState(false)
    const [ isTablet, setIsTablet ] = useState(false)
    const [ windowWidth, setWindowWidth ] = useState(0)

    useEffect(() => {
        const resize = () => {
            setWindowWidth(window.innerWidth)
        }
      
        resize()
        window.addEventListener('resize', resize)

        return () => window.removeEventListener('resize', resize)
      }, [])

      useEffect(() => {
        windowWidth < 1340 ? setIsTablet(true) : setIsTablet(false)
      }, [windowWidth])

    return (
        <>
        <div className={styles.card} onClick={() => isTablet ? setIsVisible(true) : null} onMouseEnter={() => !isTablet ? setIsVisible(true) : null} onMouseLeave={() => !isTablet ? setIsVisible(false) : null}>
            <div className={styles.card__image}>
                <Image src={`/coaches/${url}.png`} width="407px" height="450px" />
            </div>
            <h3 className={styles.card__title} style={{ opacity: isVisible ? 0 : 1 }}>{title}</h3>

            {!isTablet && <div className={styles.card__content} style={{ opacity: isVisible ? 1 : 0}}>
                {children}
            </div>}
        </div>

        {isTablet && 
            <>
                <div className={isVisible ? styles.card__content + ' ' + styles.card__content_active : styles.card__content}>
                    {children}
                    <img src="card/cross.svg" alt="закрыть" className={styles.card__cross} onClick={() => setIsVisible(false)} />
                </div>
                <div onClick={() => setIsVisible(false)} className={isVisible ? styles.back + ' ' + styles.back_active : styles.back}></div>
            </>}
        </>
    )
}

export default Card