import { useState, useEffect } from 'react'
import styles from '../styles/Slider.module.scss'

const Slider = ({ arrowClass, arrowsClass, dotsClass, visible, type='', children }) => {
    const [ activeSlide, setActiveSlide ] = useState(visible === 3 ? 1 : 0)
    const [ activeDot, setActiveDot ] = useState(1)
    const [ windowWidth, setWindowWidth ] = useState(0)
    const [ dotMas, setDotMas ] = useState([])

    const dotClick = (dot) => {
        if (children.length === dotMas.length) {
            setActiveSlide(dot - 1)
            setActiveDot(dot)
        } else {
            let mas = []

            for (let i = 0; i < children.length; i += 3) {
                mas.push([i, i + 1, i + 2])
            }

            setActiveSlide(mas[dot - 1][1])
            setActiveDot(dot)
        }
    }

    useEffect(() => {
        const resize = () => {
            setWindowWidth(window.innerWidth)
        }
      
        resize()
        window.addEventListener('resize', resize)

        return () => window.removeEventListener('resize', resize)
    }, [])

    useEffect(() => {
        if (windowWidth < 790) {
            let mas = []

            for (let i = 1; i <= children.length; i++) {
                mas.push(i)
            }

            setDotMas(mas)
            setActiveSlide(0)
            setActiveDot(1)
        } else {
            let mas = []

            // if (type === 'coaches') visible = 3

            // for (let i = 1; i <= children.length / visible; i++) {
            //     mas.push(i)
            // }

            if (type === 'coaches') {
                for (let i = 1; i <= Math.ceil(children.length / 3); i++) {
                    mas.push(i)
                }
            } else {
                for (let i = 1; i <= children.length; i++) {
                    mas.push(i)
                }
            }

            setDotMas(mas)  
            setActiveSlide(0)
            setActiveDot(1)
        }
    }, [windowWidth])

    return (
        <>
            <div className={styles.slider}>
                {visible === 3 ?
                <>
                    {children[activeSlide - 1] ? children[activeSlide - 1] : children[children.length - 1]}
                    {children[activeSlide]}
                    {children[activeSlide + 1] ? children[activeSlide + 1] : children[0]}
                </>
                :
                children[activeSlide]
                }
            </div>

            <div className={styles.slider__arrows + ' ' + arrowsClass}>
                <button className={styles.slider__arrow + ' ' + arrowClass} onClick={() => {
                    setActiveSlide(children[activeSlide - 1] ? activeSlide - 1 : children.length - 1)

                    if (children.length === dotMas.length) {
                        activeSlide > 0 ? setActiveDot(activeSlide) : setActiveDot(children.length)
                    } else {
                        let slidesMas = [
                            activeSlide - 2,
                            activeSlide - 1,
                            activeSlide
                        ]
                        let mas = []

                        for (let i = 0; i < children.length; i += 3) {
                            mas.push([i, i + 1, i + 2])
                        }

                        mas.forEach(item => {
                            if (item.join(' ') === slidesMas.join(' ')) {
                                setActiveDot(mas.indexOf(item) + 1)
                            }
                        })
                    }
                }}>
                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.292893 7.29289C-0.0976311 7.68342 -0.0976311 8.31658 0.292893 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292893 7.29289ZM17 9C17.5523 9 18 8.55228 18 8C18 7.44772 17.5523 7 17 7V9ZM1 9L17 9V7L1 7L1 9Z" fill="white"/>
                    </svg>
                </button>

                <button className={styles.slider__arrow + ' ' + arrowClass} onClick={() => {
                    setActiveSlide(children[activeSlide + 1] ? activeSlide + 1 : 0)

                    if (children.length === dotMas.length) {
                        activeSlide + 2 > children.length ? setActiveDot(1) : setActiveDot(activeSlide + 2)
                    } else {
                        let slidesMas = [
                            activeSlide,
                            activeSlide + 1,
                            activeSlide + 2
                        ]
                        let mas = []

                        for (let i = 0; i < children.length; i += 3) {
                            mas.push([i, i + 1, i + 2])
                        }

                        mas.forEach(item => {
                            if (item.join(' ') === slidesMas.join(' ')) {
                                setActiveDot(mas.indexOf(item) + 1)
                            }
                        })
                    }
                }}>
                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.7071 8.70711C18.0976 8.31658 18.0976 7.68342 17.7071 7.29289L11.3431 0.928932C10.9526 0.538407 10.3195 0.538407 9.92893 0.928932C9.53841 1.31946 9.53841 1.95262 9.92893 2.34315L15.5858 8L9.92893 13.6569C9.53841 14.0474 9.53841 14.6805 9.92893 15.0711C10.3195 15.4616 10.9526 15.4616 11.3431 15.0711L17.7071 8.70711ZM1 7C0.447714 7 4.82823e-08 7.44771 0 8C-4.82823e-08 8.55228 0.447714 9 1 9L1 7ZM17 7L1 7L1 9L17 9L17 7Z" fill="white"/>
                    </svg>
                </button>
            </div>

            <div className={styles.slider__dots + ' ' + dotsClass}>
                {dotMas.map(dot => <div className={activeDot === dot ? styles.slider__dot + ' ' + styles.slider__dot_active : styles.slider__dot} key={dot} onClick={() => dotClick(dot)}>{dot}</div>)}
            </div>
        </>
    )
}

export default Slider