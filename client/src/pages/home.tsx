import React, { useState } from 'react'
import Header from '../components/Header/index'
import DateBannerCtrl from '../controllers/DateBanner/DateBannerCtrl'
import ResultsCtrl from "../controllers/Results/ResultsCtrl"

export default function Home() {
  const [date, setDate] = useState('')

  const watchDate = (formattedDate: string) => {
    setDate(formattedDate)
  }

  return (
    <div className="page" style={{height: "calc(100vh - 40px)"}}>
      <Header/>
      <main style={{paddingTop: 40}}>
        <DateBannerCtrl watchDate={watchDate}/>
        <ResultsCtrl date={date}/>
      </main>
    </div>
  )
}
