import Head from 'next/head'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import Trigger from '../components/triggers/Trigger.jsx'
import Type from '../components/types/Type.jsx'
import Card from '../components/Coaches/Card.jsx'
import Tabs from '../components/Tabs.jsx'
import Product from '../components/prices/Product.jsx'
import Slider from '../components/Slider.jsx'
import FAQ from '../components/FAQ.jsx'
import styles from '../styles/Home.module.scss'
import ModalLink from '../components/ModalLink.jsx'

const Home = () => {
  const [ isHeaderControlsHidden, setIsHeaderControlsHidden ] = useState(false)
  const [ isContactActive, setIsContactActive ] = useState(false)
  const [ isTablet, setIsTablet ] = useState(false)
  const [ isMobile, setIsMobile ] = useState(false)
  const [ windowWidth, setWindowWidth ] = useState(0)
  const headerVideoRef = useRef()
  const advantagesVideoRef = useRef()

  useEffect(() => {
    const resize = () => {
      setWindowWidth(window.innerWidth)
    }

    resize()
    window.addEventListener('resize', resize)

    const anchors = document.querySelectorAll('a.scroll-to')

    for (let anchor of anchors) {
      anchor.addEventListener('click', function (e) {
        e.preventDefault()
        
        const blockID = anchor.getAttribute('href')

        document.querySelector(blockID).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      })
    }

    return () => window.removeEventListener('resize', resize)
  }, [])

  useEffect(() => {
    windowWidth < 1340 ? setIsTablet(true) : setIsTablet(false)
    windowWidth < 790 ? setIsMobile(true) : setIsMobile(false)
  }, [windowWidth])

  const playVideo = () => {
    headerVideoRef.current.play()
    setIsHeaderControlsHidden(true)
  }

  const pauseVideo = () => {
    if (isHeaderControlsHidden) {
      headerVideoRef.current.pause()
      setIsHeaderControlsHidden(false)
    }
  }

  const setContactButtonState = () => {
    isContactActive ? setIsContactActive(false) : setIsContactActive(true)
  }

  return (
    <>
      <Head>
        <title>The Move Zone</title>
        <link rel="icon" type="image/png" href="favicon.png" />
      </Head>

      <header className={styles.header}>
        <a id="home"></a>
        <div className={"container" + ' ' + styles.header__container}>
          <nav className={styles.nav}>
            <Image width="93px" height="100px" src="/logo.png" alt="логотип" />
            <div className={styles.nav__menu}>
              <a href="#home" className={styles.nav__item + ' ' + 'scroll-to'}>Главная</a>
              <a href="#prices" className={styles.nav__item + ' ' + 'scroll-to'}>Цены</a>
              <a href="#coaches" className={styles.nav__item + ' ' + 'scroll-to'}>Тренеры</a>
              <a href="#faq" className={styles.nav__item + ' ' + 'scroll-to'}>F.A.Q.</a>
            </div>
            <button className={styles.nav__button}>Записаться</button>
          </nav>

          <div className={styles.header__center}>
            <h4 className={styles.header__subtitle}>больше, чем просто</h4>
            <h1 className={styles.header__title}><span>онлайн</span><span>фитнес</span></h1>
            <h4 className={styles.header__description}>The Move Zone</h4>
          </div>

          <div className={styles.header__video}>
            <video ref={headerVideoRef} poster='/header/preview.png' onClick={pauseVideo}>
              <source src="/header/video.mp4" type='video/mp4' />
            </video>

            <div className={styles.header__play} style={{ display: isHeaderControlsHidden ? 'none' : 'block' }} onClick={playVideo}></div>
          </div>
          
          <div 
          className={isContactActive ? styles.headerContact + ' ' + styles.headerContact_active : styles.headerContact}>
            <div className={styles.headerContact__menu}>
              <a href="#" className={styles.headerContact__item}>
                <Image src="/footer/01.png" width="32px" height="32px" alt="телеграм" />
              </a>

              <a href="#" className={styles.headerContact__item}>
                <Image src="/footer/02.png" width="32px" height="32px" alt="вайбер" />
              </a>

              <a href="#" className={styles.headerContact__item}>
                <Image src="/footer/03.png" width="32px" height="32px" alt="инстаграм" />
              </a>
            </div>
            <button 
              className={isContactActive ? styles.headerContact__button + ' ' + styles.headerContact__button_active : styles.headerContact__button} 
              onClick={setContactButtonState}>Связаться</button>
          </div>
        </div>

        <div className={styles.header__image}>
          <Image src={`/header/${isMobile ? 'title-mobile' : 'title'}.svg`} width="1440px" height="128px" alt="The move zone" />
        </div>
      </header>

      <section className={styles.contacts}>
        <div className={"container" + ' ' + styles.contacts__container}>
          <h3 className={styles.contacts__title}>The Move Zone — это пространство, где вы ежедневно улучшаете своё физическое и эмоциональное состояние</h3>

          <form action="" className={styles.contacts__form}>
            <div className={styles.contacts__inner}>
              <input type="text" className={styles.contacts__input} placeholder="Имя" required />
              <input type="tel" className={styles.contacts__input} placeholder="Номер телефона" required />
              <input type="email" className={styles.contacts__input} placeholder="Почта" required />
            </div>

            <div className={styles.contacts__inner}>
              <button className={styles.contacts__button} type="submit">Начать бесплатно</button>
              <div className={styles.contacts__flex}>
                <div className={styles.contacts__checkbox}>
                  <input type="checkbox" name="check" className={styles.contacts__check} />
                  <label htmlFor="check" className={styles.contacts__label}></label>
                </div>
                <p className={styles.contacts__policy}>Я согласен с условиями <a href="#">Пользовательского соглашения</a></p>
              </div>
            </div>
          </form>

          <div className={styles.contacts__image}>
            <Image src="/contacts/image.png" alt="девушка" width="305px" height="357px" />
          </div>
        </div>
      </section>

      <section className={styles.triggers}>
        <div className={"container " + styles.triggers__container}>
          <h2 className={styles.triggers__title}>Почему Move Zone?</h2>
          
          {isMobile ? 
            <Slider visible={1} dotsClass={styles.triggers__dots} arrowsClass={styles.triggers__arrows} arrowClass={styles.triggers__arrow}>
              <Trigger title="Профессионалы" url="01-mobile">В отличие от большинства онлайн-школ фитнеса и йоги, мы предлагаем <span>занятия в реальном времени с сертифицированными тренерами</span></Trigger>
              <Trigger title="Не выходя из дома" url="02">Полная прокачка всех групп мышц, развитие гибкости и выносливости – <span>и все это не выходя из дома</span></Trigger>
              <Trigger title="Для всей семьи" url="03">Вы можете заниматься как индивидуально, так и всей семьей: специально для вас мы подготовили <span>формат тренировок в мини-группах</span></Trigger>
              <Trigger title="Детский фитнес" url="04">Любовь к спорту прививается с детства! Наши тренера проводят также <span>детские занятия фитнесом</span></Trigger>
              <Trigger title="Забота о здоровье" url="05">Тренировки направлены на получение красивого рельефа и поддержания формы. <span>Наша миссия - укрепление иммунитета и повышение общего уровня жизни </span></Trigger>
            </Slider>
          :
          <div className={styles.triggers__block}>
            <Trigger title="Профессионалы" url="01">В отличие от большинства онлайн-школ фитнеса и йоги, мы предлагаем <span>занятия в реальном времени с сертифицированными тренерами</span></Trigger>
            <Trigger title="Не выходя из дома" url="02">Полная прокачка всех групп мышц, развитие гибкости и выносливости – <span>и все это не выходя из дома</span></Trigger>
            <Trigger title="Для всей семьи" url="03">Вы можете заниматься как индивидуально, так и всей семьей: специально для вас мы подготовили <span>формат тренировок в мини-группах</span></Trigger>
            <Trigger title="Детский фитнес" url="04">Любовь к спорту прививается с детства! Наши тренера проводят также <span>детские занятия фитнесом</span></Trigger>
            <Trigger title="Забота о здоровье" url="05">Тренировки направлены на получение красивого рельефа и поддержания формы. <span>Наша миссия - укрепление иммунитета и повышение общего уровня жизни </span></Trigger>
            <div className={styles.trigger}>
              <h3 className={styles.trigger__title}>Занимайтесь спортом в любое время и в любом месте</h3>
              <p className={styles.trigger__text}>Первое занятие бесплатно!</p>
              <button className={styles.trigger__button}>Записаться на тренировку</button>
              <div className={styles.trigger__image}>
                <Image src="/triggers/06.png" alt="девушки" width="345px" height="227px" />
              </div>
            </div>
          </div>
          }

          {isMobile && 
          <div className={styles.trigger}>
            <h3 className={styles.trigger__title}>Занимайтесь спортом в любое время и в любом месте</h3>
            <p className={styles.trigger__text}>Первое занятие бесплатно!</p>
            <button className={styles.trigger__button}>Записаться на тренировку</button>
            <div className={styles.trigger__image}>
              <Image src="/triggers/06.png" alt="девушки" width="345px" height="227px" />
            </div>
          </div>}
        </div>
      </section>

      <section className={styles.types}>
        <div className="container">
          <h2 className={styles.types__title}>Виды тренировок</h2>
          <div className={styles.types__cards_little}>
            <Type className={styles.types__item_little} type="little" url="01" modal={{
              url: "/types/modal/02.png",
              content: (
                <>
                  <h2 className={styles.typesModal__title_little}>Пилатес – эффективная серия упражнений в медленном темпе, предполагающая предельную концентрацию и постоянный контроль дыхания</h2>
                  <ul className={styles.typesModal__list}>
                    <h4 className={styles.typesModal__subtitle}>Уникальность тренировки:</h4>
                    <li className={styles.typesModal__item}>Развивается гибкость, исправляется осанка и укрепляются суставы;</li>
                    <li className={styles.typesModal__item}>Развивается гибкость, исправляется осанка и укрепляются суставы;</li>
                    <li className={styles.typesModal__item}>Развивается гибкость, исправляется осанка и укрепляются суставы;</li>
                  </ul>
                  <button className={styles.typesModal__button}>Попробовать бесплатно</button>
                </>
              )
              
            }}>
              Функциональный тренинг
            </Type>
            
            <Type className={styles.types__item_little} type="little" url="02" modal={{
              url: "/types/modal/02.png",
              content: (
                <>
                  <h2 className={styles.typesModal__title_little}>Пилатес – эффективная серия упражнений в медленном темпе, предполагающая предельную концентрацию и постоянный контроль дыхания</h2>
                  <ul className={styles.typesModal__list}>
                    <h4 className={styles.typesModal__subtitle}>Уникальность тренировки:</h4>
                    <li className={styles.typesModal__item}>Развивается гибкость, исправляется осанка и укрепляются суставы;</li>
                    <li className={styles.typesModal__item}>Развивается гибкость, исправляется осанка и укрепляются суставы;</li>
                    <li className={styles.typesModal__item}>Развивается гибкость, исправляется осанка и укрепляются суставы;</li>
                  </ul>
                  <button className={styles.typesModal__button}>Попробовать бесплатно</button>
                </>
              )
              
            }}>
              Силовой тренинг 
            </Type>

            <Type className={styles.types__item_little} type="little" url="03" modal={{
              url: "/types/modal/02.png",
              content: (
                <>
                  <h2 className={styles.typesModal__title_little}>Пилатес – эффективная серия упражнений в медленном темпе, предполагающая предельную концентрацию и постоянный контроль дыхания</h2>
                  <ul className={styles.typesModal__list}>
                    <h4 className={styles.typesModal__subtitle}>Уникальность тренировки:</h4>
                    <li className={styles.typesModal__item}>Развивается гибкость, исправляется осанка и укрепляются суставы;</li>
                    <li className={styles.typesModal__item}>Развивается гибкость, исправляется осанка и укрепляются суставы;</li>
                    <li className={styles.typesModal__item}>Развивается гибкость, исправляется осанка и укрепляются суставы;</li>
                  </ul>
                  <button className={styles.typesModal__button}>Попробовать бесплатно</button>
                </>
              )
              
            }}>
              Пилатес 
            </Type>

            {isTablet && <Type className={styles.types__item_little} type="little" url={"04-tablet"} modal={{
              url: "/types/modal/02.png",
              content: (
                <>
                  <h2 className={styles.typesModal__title_little}>Пилатес – эффективная серия упражнений в медленном темпе, предполагающая предельную концентрацию и постоянный контроль дыхания</h2>
                  <ul className={styles.typesModal__list}>
                    <h4 className={styles.typesModal__subtitle}>Уникальность тренировки:</h4>
                    <li className={styles.typesModal__item}>Развивается гибкость, исправляется осанка и укрепляются суставы;</li>
                    <li className={styles.typesModal__item}>Развивается гибкость, исправляется осанка и укрепляются суставы;</li>
                    <li className={styles.typesModal__item}>Развивается гибкость, исправляется осанка и укрепляются суставы;</li>
                  </ul>
                  <button className={styles.typesModal__button}>Попробовать бесплатно</button>
                </>
              )
            }}>
              Функциональный тренинг
            </Type>}
          </div>
          
          <div className={styles.types__cards}>
            {!isTablet && <Type className={styles.types__item} url="04" modal={{
              url: "/types/modal/02.png",
              content: (
                <>
                  <h2 className={styles.typesModal__title_little}>Пилатес – эффективная серия упражнений в медленном темпе, предполагающая предельную концентрацию и постоянный контроль дыхания</h2>
                  <ul className={styles.typesModal__list}>
                    <h4 className={styles.typesModal__subtitle}>Уникальность тренировки:</h4>
                    <li className={styles.typesModal__item}>Развивается гибкость, исправляется осанка и укрепляются суставы;</li>
                    <li className={styles.typesModal__item}>Развивается гибкость, исправляется осанка и укрепляются суставы;</li>
                    <li className={styles.typesModal__item}>Развивается гибкость, исправляется осанка и укрепляются суставы;</li>
                  </ul>
                  <button className={styles.typesModal__button}>Попробовать бесплатно</button>
                </>
              )
              
            }}>
              Функциональный тренинг  
            </Type>}

            <Type className={styles.types__item} newType url={isMobile ? '05-mobile' : isTablet ? "05-tablet" : "05"} modal={{
              url: "/types/modal/02.png",
              content: (
                <>
                  <h2 className={styles.typesModal__title_little}>Пилатес – эффективная серия упражнений в медленном темпе, предполагающая предельную концентрацию и постоянный контроль дыхания</h2>
                  <ul className={styles.typesModal__list}>
                    <h4 className={styles.typesModal__subtitle}>Уникальность тренировки:</h4>
                    <li className={styles.typesModal__item}>Развивается гибкость, исправляется осанка и укрепляются суставы;</li>
                    <li className={styles.typesModal__item}>Развивается гибкость, исправляется осанка и укрепляются суставы;</li>
                    <li className={styles.typesModal__item}>Развивается гибкость, исправляется осанка и укрепляются суставы;</li>
                  </ul>
                  <button className={styles.typesModal__button}>Попробовать бесплатно</button>
                </>
              )
              
            }}>
              Силовой тренинг 
            </Type>
          </div>
        </div>
      </section>

      <section className={styles.minigroup}>
        <div className='container'>
          <div className={styles.minigroupFlag}>
            <div className={styles.minigroupFlag__flex}>
              <div className={styles.minigroupFlag__icon}>
                <Image src="/minigroup/icon.svg" width="48px" height="48px" alt="иконка" />
              </div>
              <h6 className={styles.minigroupFlag__title}>Отличная новость</h6>
            </div>
          </div>
          
          <div className={styles.minigroup__flex}>
            <div className={styles.minigroup__content}>
              <h2 className={styles.minigroup__title}>Вы можете тренироваться вместе с друзьями, семьей, коллегами в формате мини-групп</h2>
              <p className={styles.minigroup__description}>Мини-группа – группа из 2-4 человек</p>
              <ul className={styles.minigrouplist}>
                <li className={styles.minigrouplist__item}>
                  Команда единомышленников – это дополнительная мотивация;
                </li>

                <li className={styles.minigrouplist__item}>
                Никакого стресса! Занятия в коллективе обеспечивают зарядом энергии и положительных эмоций;
                </li>

                <li className={styles.minigrouplist__item}>
                  Стоимость групповых тренировок значительно ниже персональных.
                </li>
              </ul>
            </div>

            <div className={styles.minigroup__image}>
              <Image src="/minigroup/image.png" width="538px" height="538px" alt="тренировка" />
            </div>
          </div>

          <div className={styles.minigroupOffer}>
            <h2 className={styles.minigroupOffer__title}>Первое занятие бесплатно</h2>
            <button className={styles.minigroupOffer__button}>Записаться на тренеровку</button>
            <div className={styles.minigroupOffer__image}>
              <Image src="/minigroup/offer-image.png" width="498px" height="327px" alt="девушки" />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.advantages}>
        <div className="container">
          <h2 className={styles.advantages__title}>Почему тренировки с тренером в зале – это уже прошлое?</h2>

          <div className={styles.advantages__flex}>
            <div className={styles.advantages__triggers + ' ' + styles.advantages__triggers_left}>
              <div className={styles.advantagesTrigger}>
                <div className={styles.advantagesTrigger__image}>
                  <Image src="/advantages/01.svg" width="36px" height="36px" alt="иконка" />
                </div>
                <div className={styles.advantagesTrigger__content}>
                <h3 className={styles.advantagesTrigger__title}>Тренировки без ограничений</h3>
                <p className={styles.advantagesTrigger__text}>Боишься очередного закрытия залов? Тренируясь дома, можно забыть об этих рисках.</p>
                </div>
              </div>

              <div className={styles.advantagesTrigger}>
                <div className={styles.advantagesTrigger__image}>
                  <Image src="/advantages/02.svg" width="36px" height="36px" alt="иконка" />
                </div>
                <div className={styles.advantagesTrigger__content}>
                <h3 className={styles.advantagesTrigger__title}>Экономия времени</h3>
                <p className={styles.advantagesTrigger__text}>Не хочешь тратить часы на дорогу до зала и обратно? Тогда тренировки дома - это то, что тебе нужно!</p>
                </div>
              </div>

              <div className={styles.advantagesTrigger}>
                <div className={styles.advantagesTrigger__image}>
                  <Image src="/advantages/03.svg" width="36px" height="36px" alt="иконка" />
                </div>
                <div className={styles.advantagesTrigger__content}>
                <h3 className={styles.advantagesTrigger__title}>Разнообразие</h3>
                <p className={styles.advantagesTrigger__text}>Функциональные тренировки, пилатес, реабилитация - каждый найдет подходящее для себя занятие.</p>
                </div>
              </div>
            </div>

            <div className={styles.advantages__video}>
              <Image src="/advantages/image.png" width="244px" height="490px" alt="видео" />
            </div>

            {!isMobile && <div className={styles.advantages__triggers + ' ' + styles.advantages__triggers_right}>
              <div className={styles.advantagesTrigger}>
                <div className={styles.advantagesTrigger__content}>
                  <h3 className={styles.advantagesTrigger__title}>Разнообразие</h3>
                  <p className={styles.advantagesTrigger__text}>Функциональные тренировки, пилатес, реабилитация - каждый найдет подходящее для себя занятие.</p>
                </div>

                <div className={styles.advantagesTrigger__image}>
                  <Image src="/advantages/04.svg" width="36px" height="36px" alt="иконка" />
                </div>
              </div>

              <div className={styles.advantagesTrigger}>
                <div className={styles.advantagesTrigger__content}>
                  <h3 className={styles.advantagesTrigger__title}>Разнообразие</h3>
                  <p className={styles.advantagesTrigger__text}>Функциональные тренировки, пилатес, реабилитация - каждый найдет подходящее для себя занятие.</p>
                </div>
                
                <div className={styles.advantagesTrigger__image}>
                  <Image src="/advantages/05.svg" width="36px" height="36px" alt="иконка" />
                </div>
              </div>

              <div className={styles.advantagesTrigger}>
                <div className={styles.advantagesTrigger__content}>
                  <h3 className={styles.advantagesTrigger__title}>Разнообразие</h3>
                  <p className={styles.advantagesTrigger__text}>Функциональные тренировки, пилатес, реабилитация - каждый найдет подходящее для себя занятие.</p>
                </div>
                
                <div className={styles.advantagesTrigger__image}>
                  <Image src="/advantages/06.svg" width="36px" height="36px" alt="иконка" />
                </div>
              </div>
            </div>}

            {isMobile && <div className={styles.advantages__triggers}>
              <div className={styles.advantagesTrigger}>
                <div className={styles.advantagesTrigger__image}>
                  <Image src="/advantages/01.svg" width="36px" height="36px" alt="иконка" />
                </div>
                <div className={styles.advantagesTrigger__content}>
                <h3 className={styles.advantagesTrigger__title}>Тренировки без ограничений</h3>
                <p className={styles.advantagesTrigger__text}>Боишься очередного закрытия залов? Тренируясь дома, можно забыть об этих рисках.</p>
                </div>
              </div>

              <div className={styles.advantagesTrigger}>
                <div className={styles.advantagesTrigger__image}>
                  <Image src="/advantages/02.svg" width="36px" height="36px" alt="иконка" />
                </div>
                <div className={styles.advantagesTrigger__content}>
                <h3 className={styles.advantagesTrigger__title}>Экономия времени</h3>
                <p className={styles.advantagesTrigger__text}>Не хочешь тратить часы на дорогу до зала и обратно? Тогда тренировки дома - это то, что тебе нужно!</p>
                </div>
              </div>

              <div className={styles.advantagesTrigger}>
                <div className={styles.advantagesTrigger__image}>
                  <Image src="/advantages/03.svg" width="36px" height="36px" alt="иконка" />
                </div>
                <div className={styles.advantagesTrigger__content}>
                <h3 className={styles.advantagesTrigger__title}>Разнообразие</h3>
                <p className={styles.advantagesTrigger__text}>Функциональные тренировки, пилатес, реабилитация - каждый найдет подходящее для себя занятие.</p>
                </div>
              </div>
            </div>}
          </div>
        </div>
      </section>
      
      <a id="coaches"></a>
      <section className={styles.coaches}>
        <div className={"container " + styles.coaches__container}>
          <h2 className={styles.coaches__title}>Тренеры</h2>
          {isMobile ?
          <Slider visible={1} arrowsClass={styles.coaches__arrows} dotsClass={styles.coaches__dots} type='coaches' arrowClass={styles.coaches__arrow}>
            <Card title='Слайд 1' url='01'>
              <div className={styles.coachescard__content}>
                <header className={styles.coachescard__header}>
                  <div className={styles.coachescard__item}>
                    <h3 className={styles.coachescard__title}>Александр</h3>
                    <p className={styles.coachescard__text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                  </div>

                  <div className={styles.coachescard__item}>
                    <p className={styles.coachescard__text}>Силовые тренировки</p>
                  </div>

                  <div className={styles.coachescard__item}>
                    <p className={styles.coachescard__text}>Высшее образование</p>
                  </div>
                </header>

                <footer className={styles.coachescard__footer}>
                  <div className={styles.coachescard__item}>
                    <p className={styles.coachescard__text}>Мастер спорта</p>
                  </div>

                  <div className={styles.coachescard__item}>
                    <p className={styles.coachescard__text}>Чемпион по пауэрлифтингу</p>
                  </div>

                  <button className={styles.coachescard__button}>Записаться на занятие</button>
                </footer>
              </div>
            </Card>

            <Card title='Слайд 2' url='03'>
              <div className={styles.coachescard__content}>
                <header className={styles.coachescard__header}>
                  <div className={styles.coachescard__item}>
                    <h3 className={styles.coachescard__title}>Игорь</h3>
                    <p className={styles.coachescard__text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                  </div>

                  <div className={styles.coachescard__item}>
                    <p className={styles.coachescard__text}>Силовые тренировки</p>
                  </div>

                  <div className={styles.coachescard__item}>
                    <p className={styles.coachescard__text}>Высшее образование</p>
                  </div>
                </header>

                <footer className={styles.coachescard__footer}>
                  <div className={styles.coachescard__item}>
                    <p className={styles.coachescard__text}>Мастер спорта</p>
                  </div>

                  <div className={styles.coachescard__item}>
                    <p className={styles.coachescard__text}>Чемпион по пауэрлифтингу</p>
                  </div>

                  <button className={styles.coachescard__button}>Записаться на занятие</button>
                </footer>
              </div>
            </Card>

            <Card title='Слайд 3' url='03'>
              <div className={styles.coachescard__content}>
                <header className={styles.coachescard__header}>
                  <div className={styles.coachescard__item}>
                    <h3 className={styles.coachescard__title}>Владимир</h3>
                    <p className={styles.coachescard__text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                  </div>

                  <div className={styles.coachescard__item}>
                    <p className={styles.coachescard__text}>Силовые тренировки</p>
                  </div>

                  <div className={styles.coachescard__item}>
                    <p className={styles.coachescard__text}>Высшее образование</p>
                  </div>
                </header>

                <footer className={styles.coachescard__footer}>
                  <div className={styles.coachescard__item}>
                    <p className={styles.coachescard__text}>Мастер спорта</p>
                  </div>

                  <div className={styles.coachescard__item}>
                    <p className={styles.coachescard__text}>Чемпион по пауэрлифтингу</p>
                  </div>

                  <button className={styles.coachescard__button}>Записаться на занятие</button>
                </footer>
              </div>
            </Card>

            <Card title='Слайд 4' url='01'>
              <div className={styles.coachescard__content}>
                <header className={styles.coachescard__header}>
                  <div className={styles.coachescard__item}>
                    <h3 className={styles.coachescard__title}>Александр</h3>
                    <p className={styles.coachescard__text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                  </div>

                  <div className={styles.coachescard__item}>
                    <p className={styles.coachescard__text}>Силовые тренировки</p>
                  </div>

                  <div className={styles.coachescard__item}>
                    <p className={styles.coachescard__text}>Высшее образование</p>
                  </div>
                </header>

                <footer className={styles.coachescard__footer}>
                  <div className={styles.coachescard__item}>
                    <p className={styles.coachescard__text}>Мастер спорта</p>
                  </div>

                  <div className={styles.coachescard__item}>
                    <p className={styles.coachescard__text}>Чемпион по пауэрлифтингу</p>
                  </div>

                  <button className={styles.coachescard__button}>Записаться на занятие</button>
                </footer>
              </div>
            </Card>

            <Card title='Слайд 5' url='02'>
              <div className={styles.coachescard__content}>
                <header className={styles.coachescard__header}>
                  <div className={styles.coachescard__item}>
                    <h3 className={styles.coachescard__title}>Александр</h3>
                    <p className={styles.coachescard__text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                  </div>

                  <div className={styles.coachescard__item}>
                    <p className={styles.coachescard__text}>Силовые тренировки</p>
                  </div>

                  <div className={styles.coachescard__item}>
                    <p className={styles.coachescard__text}>Высшее образование</p>
                  </div>
                </header>

                <footer className={styles.coachescard__footer}>
                  <div className={styles.coachescard__item}>
                    <p className={styles.coachescard__text}>Мастер спорта</p>
                  </div>

                  <div className={styles.coachescard__item}>
                    <p className={styles.coachescard__text}>Чемпион по пауэрлифтингу</p>
                  </div>

                  <button className={styles.coachescard__button}>Записаться на занятие</button>
                </footer>
              </div>
            </Card>
          </Slider>
          :
          <Slider visible={3} arrowsClass={styles.coaches__arrows} dotsClass={styles.coaches__dots} type='coaches' arrowClass={styles.coaches__arrow}>
            <Card title='Слайд 1' url='01'>
              <div className={styles.coachescard__content}>
                <header className={styles.coachescard__header}>
                  <div className={styles.coachescard__item}>
                    <h3 className={styles.coachescard__title}>Алексей</h3>
                    <p className={styles.coachescard__text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                  </div>

                  <div className={styles.coachescard__item}>
                    <p className={styles.coachescard__text}>Силовые тренировки</p>
                  </div>

                  <div className={styles.coachescard__item}>
                    <p className={styles.coachescard__text}>Высшее образование</p>
                  </div>
                </header>

                <footer className={styles.coachescard__footer}>
                  <div className={styles.coachescard__item}>
                    <p className={styles.coachescard__text}>Мастер спорта</p>
                  </div>

                  <div className={styles.coachescard__item}>
                    <p className={styles.coachescard__text}>Чемпион по пауэрлифтингу</p>
                  </div>

                  <button className={styles.coachescard__button}>Записаться на занятие</button>
                </footer>
              </div>
            </Card>

            <Card title='Слайд 2' url='02'>
              <div className={styles.coachescard__content}>
                <header className={styles.coachescard__header}>
                  <div className={styles.coachescard__item}>
                    <h3 className={styles.coachescard__title}>Владимир</h3>
                    <p className={styles.coachescard__text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                  </div>

                  <div className={styles.coachescard__item}>
                    <p className={styles.coachescard__text}>Силовые тренировки</p>
                  </div>

                  <div className={styles.coachescard__item}>
                    <p className={styles.coachescard__text}>Высшее образование</p>
                  </div>
                </header>

                <footer className={styles.coachescard__footer}>
                  <div className={styles.coachescard__item}>
                    <p className={styles.coachescard__text}>Мастер спорта</p>
                  </div>

                  <div className={styles.coachescard__item}>
                    <p className={styles.coachescard__text}>Чемпион по пауэрлифтингу</p>
                  </div>

                  <button className={styles.coachescard__button}>Записаться на занятие</button>
                </footer>
              </div>
            </Card>

            <Card title='Слайд 3' url='03'>
              <div className={styles.coachescard__content}>
                <header className={styles.coachescard__header}>
                  <div className={styles.coachescard__item}>
                    <h3 className={styles.coachescard__title}>Наталья</h3>
                    <p className={styles.coachescard__text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                  </div>

                  <div className={styles.coachescard__item}>
                    <p className={styles.coachescard__text}>Силовые тренировки</p>
                  </div>

                  <div className={styles.coachescard__item}>
                    <p className={styles.coachescard__text}>Высшее образование</p>
                  </div>
                </header>

                <footer className={styles.coachescard__footer}>
                  <div className={styles.coachescard__item}>
                    <p className={styles.coachescard__text}>Мастер спорта</p>
                  </div>

                  <div className={styles.coachescard__item}>
                    <p className={styles.coachescard__text}>Чемпион по пауэрлифтингу</p>
                  </div>

                  <button className={styles.coachescard__button}>Записаться на занятие</button>
                </footer>
              </div>
            </Card>

            <Card title='Слайд 4' url='01'>
              <div className={styles.coachescard__content}>
                <header className={styles.coachescard__header}>
                  <div className={styles.coachescard__item}>
                    <h3 className={styles.coachescard__title}>Александр</h3>
                    <p className={styles.coachescard__text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                  </div>

                  <div className={styles.coachescard__item}>
                    <p className={styles.coachescard__text}>Силовые тренировки</p>
                  </div>

                  <div className={styles.coachescard__item}>
                    <p className={styles.coachescard__text}>Высшее образование</p>
                  </div>
                </header>

                <footer className={styles.coachescard__footer}>
                  <div className={styles.coachescard__item}>
                    <p className={styles.coachescard__text}>Мастер спорта</p>
                  </div>

                  <div className={styles.coachescard__item}>
                    <p className={styles.coachescard__text}>Чемпион по пауэрлифтингу</p>
                  </div>

                  <button className={styles.coachescard__button}>Записаться на занятие</button>
                </footer>
              </div>
            </Card>

            <Card title='Слайд 5' url='02'>
              <div className={styles.coachescard__content}>
                <header className={styles.coachescard__header}>
                  <div className={styles.coachescard__item}>
                    <h3 className={styles.coachescard__title}>Александр</h3>
                    <p className={styles.coachescard__text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                  </div>

                  <div className={styles.coachescard__item}>
                    <p className={styles.coachescard__text}>Силовые тренировки</p>
                  </div>

                  <div className={styles.coachescard__item}>
                    <p className={styles.coachescard__text}>Высшее образование</p>
                  </div>
                </header>

                <footer className={styles.coachescard__footer}>
                  <div className={styles.coachescard__item}>
                    <p className={styles.coachescard__text}>Мастер спорта</p>
                  </div>

                  <div className={styles.coachescard__item}>
                    <p className={styles.coachescard__text}>Чемпион по пауэрлифтингу</p>
                  </div>

                  <button className={styles.coachescard__button}>Записаться на занятие</button>
                </footer>
              </div>
            </Card>

            <Card title='Слайд 6' url='03'>
              <div className={styles.coachescard__content}>
                <header className={styles.coachescard__header}>
                  <div className={styles.coachescard__item}>
                    <h3 className={styles.coachescard__title}>Александр</h3>
                    <p className={styles.coachescard__text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                  </div>

                  <div className={styles.coachescard__item}>
                    <p className={styles.coachescard__text}>Силовые тренировки</p>
                  </div>

                  <div className={styles.coachescard__item}>
                    <p className={styles.coachescard__text}>Высшее образование</p>
                  </div>
                </header>

                <footer className={styles.coachescard__footer}>
                  <div className={styles.coachescard__item}>
                    <p className={styles.coachescard__text}>Мастер спорта</p>
                  </div>

                  <div className={styles.coachescard__item}>
                    <p className={styles.coachescard__text}>Чемпион по пауэрлифтингу</p>
                  </div>

                  <button className={styles.coachescard__button}>Записаться на занятие</button>
                </footer>
              </div>
            </Card>
          </Slider>}
        </div>
      </section>

      <section className={styles.comments}>
        <div className={'container ' + styles.comments__container}>
          <h2 className={styles.comments__title}>Отзывы</h2>
          
          {!isMobile && <Slider visible={1} arrowsClass={styles.comments__arrows} arrowClass={styles.comment__arrow}>
            <div className={styles.comment}>
              <div className={styles.comment__data}>
                <div className={styles.comment__icon}>
                  <Image src="/comments/01.png" width="64px" height="64px" alt="аватарка" />
                </div>

                <a href="#" className={styles.comment__link}>
                  <Image src="/comments/instagram.svg" width="32px" height="32px" />
                </a>
              </div>

              <div className={styles.comment__content}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elite magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                <span className={styles.comment__author}>Имя Фамилия 1</span>
              </div>
            </div>

            <div className={styles.comment}>
              <div className={styles.comment__data}>
                <div className={styles.comment__icon}>
                  <Image src="/comments/01.png" width="64px" height="64px" alt="аватарка" />
                </div>

                <a href="#" className={styles.comment__link}>
                  <Image src="/comments/instagram.svg" width="32px" height="32px" />
                </a>
              </div>

              <div className={styles.comment__content}>
                Consectetur adipiscing elit, sed do eiusmod tempor  nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                <span className={styles.comment__author}>Имя Фамилия 2</span>
              </div>
            </div>

            <div className={styles.comment}>
              <div className={styles.comment__data}>
                <div className={styles.comment__icon}>
                  <Image src="/comments/01.png" width="64px" height="64px" alt="аватарка" />
                </div>

                <a href="#" className={styles.comment__link}>
                  <Image src="/comments/instagram.svg" width="32px" height="32px" />
                </a>
              </div>

              <div className={styles.comment__content}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                <span className={styles.comment__author}>Имя Фамилия 3</span>
              </div>
            </div>
          </Slider>}
          {isMobile && <div className={styles.comment}>
              <div className={styles.comment__data}>
                <div className={styles.comment__icon}>
                  <Image src="/comments/01.png" width="64px" height="64px" alt="аватарка" />
                </div>

                <a href="#" className={styles.comment__link}>
                  <Image src="/comments/instagram.svg" width="32px" height="32px" />
                </a>
              </div>

              <div className={styles.comment__content}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                <span className={styles.comment__author}>Имя Фамилия 1</span>
              </div>
            </div>}
        </div>
      </section>

      <a id="prices"></a>
      <section className={styles.prices}>
        <div className={"container " + styles.prices__container}>
          <h2 className={styles.prices__title}>Стоимость абонементов</h2>
          <Tabs tabs={
            ['1 тренировка', '4 тренировки', '8 тренировок', '16 тренировок']
          }>
            <>
              <div className={styles.prices__grid}>
                <Product discount='690' percent='100%' title="Персональная тренировка" time="30 минут" price="0" />
                <Product discount='1190' percent='100%' title="Персональная тренировка" time="60 минут" price="0" />
                <Product discount='1090' percent='100%' title="Тренировка для детей" time="40 минут" price="0" />
                <Product newCard discount='1490' percent='100%' title="Восстановление после COVID-19" time="60 минут" price="0" />
              </div>
            </>
            <>
              <div className={styles.prices__grid}>
                <Product discount='2760' percent='20%' title="Персональная тренировка" time="30 минут" price="2360" />
                <Product discount='4760' percent='20%' title="Персональная тренировка" time="60 минут" price="3960" />
                <Product discount='4360' percent='20%' title="Тренировка для детей" time="40 минут" price="3560" />
                <Product newCard discount='5960' percent='20%' title="Восстановление после COVID-19" time="60 минут" price="4760" />
              </div>
            </>
            <>
              <div className={styles.prices__grid}>
                <Product discount='5520' percent='1600 ₽' title="Персональная тренировка" time="30 минут" price="3920" />
                <Product discount='9520' percent='3200 ₽' title="Персональная тренировка" time="60 минут" price="6320" />
                <Product discount='8720' percent='3200 ₽' title="Тренировка для детей" time="40 минут" price="5520" />
                <Product newCard discount='11920' percent='4000 ₽' title="Восстановление после COVID-19" time="60 минут" price="7920" />
              </div>
            </>
            <>
              <div className={styles.prices__grid}>
                <Product discount='11040' percent='50%' title="Персональная тренировка" time="30 минут" price="6240" />
                <Product discount='19040' percent='50%' title="Персональная тренировка" time="60 минут" price="11040" />
                <Product discount='17440' percent='50%' title="Тренировка для детей" time="40 минут" price="9440" />
                <Product newCard discount='23840' percent='40%' title="Восстановление после COVID-19" time="60 минут" price="14240" />
              </div>
            </>
          </Tabs>
        </div>
      </section>
      
      <a id="faq"></a>
      <section className={styles.faq}>
        <div className="container">
          <h2 className={styles.faq__title}>FAQ</h2>
          <FAQ titles={['Как проходит тренировка?', 'Как проходит тренировка?', 'Как проходит тренировка?']}>
            <>
              <h4 className={styles.faq__subtitle}>Перед занятием:</h4>
              <ul className={styles.faq__list}>
                <li className={styles.faq__item}>До начала тренировки скачайте приложение Zoom (доступно как для телефона, так и для компьютера), если у вас 
уже установлено приложение - в назначенное время перейдите по ссылке, которую мы вам отправим, и тренировка начнется;</li>
<li className={styles.faq__item}>До начала тренировки скачайте приложение Zoom (доступно как для телефона, так и для компьютера), если у вас уже установлено приложение - в назначенное время перейдите по ссылке, которую мы вам отправим, и тренировка начнется;</li>
              </ul>
            </>

            <>
              <h4 className={styles.faq__subtitle}>Перед занятием:</h4>
              <ul className={styles.faq__list}>
                <li className={styles.faq__item}>До начала тренировки скачайте приложение Zoom (доступно как для телефона, так и для компьютера), если у вас 
уже установлено приложение - в назначенное время перейдите по ссылке, которую мы вам отправим, и тренировка начнется;</li>
              </ul>
            </>

            <>
              <h4 className={styles.faq__subtitle}>Перед занятием:</h4>
              <ul className={styles.faq__list}>
                <li className={styles.faq__item}>До начала тренировки скачайте приложение Zoom (доступно как для телефона, так и для компьютера), если у вас уже установлено приложение - в назначенное время перейдите по ссылке, которую мы вам отправим, и тренировка начнется;</li>
              </ul>
            </>
          </FAQ>
        </div>
      </section>

      <footer className={styles.footer}>
          <div className={"container " + styles.footer__container}>
            <form className={styles.footerForm}>
              <h3 className={styles.footerForm__title}>The Move Zone — это пространство, где вы ежедневно улучшаете своё физическое и эмоциональное состояние</h3>
              <input type="text" className={styles.footerForm__input} placeholder="Имя" required />
              <input type="tel" className={styles.footerForm__input} placeholder="Номер телефона" required />
              <input type="email" className={styles.footerForm__input} placeholder="Почта" required />

              <div className={styles.footerForm__flex}>
                <div className={styles.contacts__checkbox}>
                  <input type="checkbox" name="check" className={styles.contacts__check} />
                  <label htmlFor="check" className={styles.contacts__label}></label>
                </div>

                <p className={styles.contacts__policy}>Я согласен с условиями <a href="#">Пользовательского соглашения</a></p>
              </div>

              <button className={styles.footerInfo__button}>Начать бесплатно</button>
            </form>

            <div className={styles.footer__image}>
              <Image src="/footer/image.png" alt="девушка" width="305px" height="357px" />
            </div>

            <div className={styles.footerInfo}>
              <div className={styles.footerInfo__logo}>
                <Image src="/logo.png" width="73px" height="79px" alt="логотип" />
              </div>
              <ModalLink className={styles.footerInfo__link} modal={{
              url: isMobile ? "/types/modal/01-mobile.png" : "/types/modal/01.png",
              height: isMobile ? "320px" : "232px",
              type: 'ref',
              className: styles.footerModal,
              content: (
                <>
                  {isTablet ? 
                  <h2 className={styles.typesModal__title + ' ' + styles.footerModal__title}>Пригласи друга в Move<br />Zone и получи <span>4 бесплатные тренировки</span> для себя и для друга в подарок!</h2>
                  :
                  <h2 className={styles.typesModal__title}>Пригласи друга в Move Zone и получи <span>4 бесплатные тренировки</span> для себя и для друга в подарок!</h2>
                  }
                  <p className={styles.typesModal__stage}>Поделись своим промокодом с другом в любом мессенджере или в соцсетях (промокод отправит менеджер после покупки любого абонемента);</p>
                  <p className={styles.typesModal__stage}>Друг записывается на бесплатную пробную тренировку, после чего оплачивает любой абонемент Move Zone;</p>
                  <p className={styles.typesModal__stage}>Сразу после покупки абонемента ваш друг и вы получаете по 2 бесплатные тренировки в подарок.</p>
                  <div className={styles.typesModal__warning}>Условия считаются выполненными, если вы и ваш друг оплатили любой абонемент, при этом ваш друг ранее не тренировался в Move Zone</div>
                </>
              )
              
            }}>Реферальная программа</ModalLink>
              <a href="#" className={styles.footerInfo__link}>Стать тренером Move Zone</a>
              <a href="#" className={styles.footerInfo__link}>Контакты</a>

              <div className={styles.footerMedia}>
                <a href="#" className={styles.footerMedia__link}>
                  <Image src="/footer/01.png" width="32px" height="32px" alt="телеграм" />
                </a>

                <a href="#" className={styles.footerMedia__link}>
                  <Image src="/footer/02.png" width="32px" height="32px" alt="вайбер" />
                </a>

                <a href="#" className={styles.footerMedia__link}>
                  <Image src="/footer/03.png" width="32px" height="32px" alt="инстаграм" />
                </a>
              </div>
              <a href="#" className={styles.footerInfo__police}>Политика конфидециальности</a>
            </div>
          </div>
      </footer>
    </>
  )
}

export default Home
