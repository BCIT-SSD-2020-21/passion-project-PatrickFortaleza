import React, { useEffect, useState } from 'react'
import Results from "../../components/Results"
import { queryNews } from "../../network/index"
import { Article } from "../../models/article"

interface Props {
  date: string
}

export default function ResultsCtrl({date} :Props) {
  const [loading, setLoading] = useState(false)
  // For storing the query in memory
  const [articles, setArticles] = useState([])
  // For serving up a filtered -or- sorted list.
  const [articles_, setArticles_] = useState([])
  const [vendorFilter, setVendorFilter] = useState([])
  const [sortOrder, setSortOrder] = useState('')

  const getNews = async () => {
    if(!date) return
    setLoading(true)

    const result = await queryNews(date)
    setLoading(false)

    if(result.error) return setArticles([])
    setArticles(result.data.articles)
    filterArticles()
  }

  const syncVendorFilter = (filters: Array<string>) => {
    setVendorFilter((filters as any))
  }

  const filterArticles = () => {
    if(!articles && (articles as Array<string>).length < 1) return
    setLoading(true)
    const filteredArray = [...articles].filter((article) => {
      if(!(vendorFilter as Array<string>).includes((article as Article).site[0].name)) return article
      return
    })
    
    setArticles_(filteredArray)
    setLoading(false)
  }

  useEffect(() => {
    getNews()
  }, [date])

  useEffect(() => {
    filterArticles()
  }, [vendorFilter])
  
  return (
    <Results loading={loading} articles={articles_} syncVendorFilter={syncVendorFilter}/>
  )
}
