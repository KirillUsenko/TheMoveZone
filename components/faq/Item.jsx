import { useState } from "react"
import styles from '../../styles/FAQ.module.scss'

const Item = ({ title, content, index }) => {
    const [ isActive, setIsActive ] = useState(false)

    return (
        <div 
            className={isActive ? styles.tab + ' ' + styles.tab_active : styles.tab} 
            onClick={() => isActive ? setIsActive(false) : setIsActive(true)} key={index}>
            <header className={styles.header}>
                <h3 className={styles.title}>{title}</h3>
                <div className={styles.icon}></div>
            </header>
            {isActive && <div className={styles.content}>{content}</div>}
        </div>
    )
}

export default Item