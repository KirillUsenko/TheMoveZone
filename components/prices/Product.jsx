import styles from '../../styles/Product.module.scss'

const Product = ({ price, title, time, newCard=false, discount=false, percent='0%'}) => {
    return (
        <div className={newCard ? styles.card + ' ' + styles.card_new : styles.card}>
            <div className={styles.card__inner}>
                <header className={styles.card__header}>
                    {newCard && <div className={styles.card__new}>new</div>}
                    {discount && <div className={styles.card__percent}>-{percent}</div>}
                </header>

                <h4 className={styles.card__title}>{title}</h4>
                <p className={styles.card__content}>({time})</p>
                <div className={styles.card__price}><span className={styles.card__price_new}>{price}</span> {discount && <span className={styles.card__price_old}>{discount}</span>}</div>
            </div>
            <button className={styles.card__button}>Купить</button>
        </div>
    )
}

export default Product