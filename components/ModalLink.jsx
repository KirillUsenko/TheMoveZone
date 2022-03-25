import { useState } from "react"
import Modal from "./Modal.jsx"

const ModalLink = ({ className, modal, children }) => {
    const [ isModalActive, setIsModalActive ] = useState(false)

    return (
        <>
            <a className={className} onClick={() => setIsModalActive(true)}>{children}</a>
            {isModalActive && <Modal cb={() => setIsModalActive(false)} url={modal.url} type={modal.type} className={modal.className} height={modal.height}>{modal.content}</Modal>}
        </>
    )
}

export default ModalLink