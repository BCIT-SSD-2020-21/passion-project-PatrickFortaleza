import React, { useEffect, useState } from 'react'
import Results from "../../components/Results"
import { queryNews } from "../../network/index"

interface Props {
  date: string
}

export default function ResultsCtrl({date} :Props) {
  const [loading, setLoading] = useState(false)

  const getNews = async () => {
    if(!date) return
    setLoading(true)
    const result = await queryNews(date)
    setLoading(false)
    console.log(result)
  }

  useEffect(() => {
    getNews()
  }, [date])
  
  return (
    <Results loading={loading}/>
  )
}
