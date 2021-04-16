import React, { useState, useEffect } from 'react'
import HeaderCtrl from '../controllers/Header/HeaderCtrl'
import DateBannerCtrl from '../controllers/DateBanner/DateBannerCtrl'
import ResultsCtrl from "../controllers/Results/ResultsCtrl"

const getWindowHeight = () => {
  const { innerHeight: height } = window
  return height * 0.01
}

export default function Home() {
  const [date, setDate] = useState('')
  const [focusCounter, setFocusCounter] = useState(0)
  const [screenHeight, setScreenHeight] = useState(0)

  const handleResize = () => {
    setScreenHeight(getWindowHeight)
  }

  const watchDate = (formattedDate: string) => {
    setDate(formattedDate)
  }

  const incrementCounter = () => {
    let updatedCounter = focusCounter
        updatedCounter += 1
    setFocusCounter(updatedCounter)
  }

  const setVH = () => {
    document.documentElement.style.setProperty('--vh', `${screenHeight}px`);
  }

  useEffect(() => {
    handleResize()

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [])

  useEffect(() => {
    setVH()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenHeight])

  return (
    <div className="page">
      <HeaderCtrl/>
      <main style={{paddingTop: 40, height: "100%", display: "flex", flexDirection: "column"}}>
        <DateBannerCtrl watchDate={watchDate} focusCounter={() => incrementCounter()} focusCount={focusCounter}/>
        <ResultsCtrl date={date} focusCount={focusCounter}/>
      </main>
    </div>
  )
}
