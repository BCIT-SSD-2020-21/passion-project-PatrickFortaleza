import React, { useEffect } from 'react'
import Results from "../../components/Results"
import { queryNews } from "../../network/index"

interface Props {
  date: string
}

export default function ResultsCtrl({date} :Props) {

  const getNews = async () => {
    const result = await queryNews(date)
    console.log(result)
  }

  useEffect(() => {
    getNews()
  }, [date])
  
  return (
    <Results />
  )
}
