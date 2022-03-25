import Item from './faq/Item.jsx'

const FAQ = ({ titles, children }) => {
    return (
        titles.map((title, index) => <Item title={title} key={index} index={index} content={children[index]} />)
    )
}

export default FAQ