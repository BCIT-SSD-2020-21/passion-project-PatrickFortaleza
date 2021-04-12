import React from 'react'
import Header from '../components/Header/index'
import DateBannerCtrl from '../controllers/DateBanner/DateBannerCtrl'

export default function home() {
  return (
    <div className="page" style={{height: "calc(100vh - 40px)"}}>
      <Header/>
      <main style={{paddingTop: 40}}>
        <DateBannerCtrl />
      </main>
    </div>
  )
}
