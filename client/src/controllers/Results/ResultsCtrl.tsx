import React, { useEffect, useState } from 'react'
import Results from "../../components/Results"
import { queryNews } from "../../network/index"

interface Props {
  date: string
}

export default function ResultsCtrl({date} :Props) {
  const [loading, setLoading] = useState(false)
  const [articles, setArticles] = useState([])

  const getNews = async () => {
    if(!date) return
    setLoading(true)
    const result = await queryNews(date)
    setLoading(false)
    if(result.error) return setArticles([])
    setArticles(result.data.articles)
    console.log(result)
  }

  useEffect(() => {
    getNews()
  }, [date])
  
  return (
    <Results loading={loading} articles={articles}/>
  )
}
