import Image from 'next/image'
import styles from '../../styles/Trigger.module.scss'

const Trigger = ({ title, url, children }) => {
  return (
    <div className={styles.trigger}>
      <h3 className={styles.trigger__title}>{title}</h3>
      <p className={styles.trigger__text}>{children}</p>
      <div className={styles.trigger__image}>
        <Image src={`/triggers/${url}.png`} alt="изображение" width="203px" height="235px" />
      </div>
    </div>
  )
}

export default Trigger
