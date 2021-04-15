import React, { useState } from 'react'
import HeaderCtrl from '../controllers/Header/HeaderCtrl'
import DateBannerCtrl from '../controllers/DateBanner/DateBannerCtrl'
import ResultsCtrl from "../controllers/Results/ResultsCtrl"

export default function Home() {
  const [date, setDate] = useState('')
  const [focusCounter, setFocusCounter] = useState(0)

  const watchDate = (formattedDate: string) => {
    setDate(formattedDate)
  }

  const incrementCounter = () => {
    let updatedCounter = focusCounter
        updatedCounter += 1
    setFocusCounter(updatedCounter)
  }

  return (
    <div className="page" style={{height: "calc(100vh - 20px)"}}>
      <HeaderCtrl/>
      <main style={{paddingTop: 40, height: "100%", display: "flex", flexDirection: "column"}}>
        <DateBannerCtrl watchDate={watchDate} focusCounter={() => incrementCounter()} focusCount={focusCounter}/>
        <ResultsCtrl date={date} focusCount={focusCounter}/>
      </main>
    </div>
  )
}
