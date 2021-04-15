import React, { useState } from 'react'
import Header from "../../components/Header/index"

export default function HeaderCtrl() {
  const [modalActive, setModalActive] = useState(false)

  const toggleModal = () => {
    let current = modalActive
    setModalActive(!current)
  }

  const hideModal = () => {
    setModalActive(false)
  }

  return (
    <Header modalActive={modalActive} toggleModal={toggleModal} hideModal={hideModal}/>
  )
}
