import { useState } from 'react'
import styles from '../styles/Tabs.module.scss'

const Tabs = ({ tabs, children }) => {
    const [ activeTab, setActiveTab ] = useState(0)
    const [ activeContent, setActiveContent ] = useState(children[0])

    const setTab = (index) => {
        setActiveTab(index)
        setActiveContent(children[index])
    }

    return (
        <>
            <div className={styles.tabs__container}>
                <div className={styles.tabs}>
                    {tabs.map((text, index) => <button key={index} className={
                        activeTab === index ? 
                        styles.tab + ' ' + styles.tab_active : 
                        styles.tab}
                        onClick={() => setTab(index)}>{text}</button>)}
                </div>
            </div>

            <div className={styles.tab__content}>
                {activeContent}
            </div>
        </>
    )
}

export default Tabs