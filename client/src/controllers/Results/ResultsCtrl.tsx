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
    setArticles_(result.data.articles)
  }

  const syncVendorFilter = (filters: Array<string>) => {
    setVendorFilter((filters as any))
  }

  const syncSortOrder = (order: string) => {
    setSortOrder(order)
  }

  const filterArticles = () => {
    if(!articles && (articles as Array<string>).length < 1) return
    setLoading(true)
    const filteredArray = [...articles].filter((article) => {
      if(!(vendorFilter as Array<string>).includes((article as Article).site[0].name)) return article
      return
    })
    
    setArticles_(filteredArray)
    sortArticles()
    setLoading(false)
  }

  const sortArticles = () => {
    switch(sortOrder){
      case "default":
        setArticles_(articles_)
        break;
      case "alphabetically":
        const sortedAlphabetically = ([...articles_] as Array<Article>).sort((a, b) => {
          // Some headlines have " " as their first letter which throws sorting off
          let headlineA = a.headline[0] !== " " ? a.headline : a.headline.substring(1),
              headlineB = b.headline[0] !== " " ? b.headline : b.headline.substring(1)
          return headlineA.localeCompare(headlineB)
        })
        
        setArticles_((sortedAlphabetically as any))
        break;
      case "news_vendor":
        const sortedVendors = ([...articles_] as Array<Article>).sort((a, b) =>
          (a).site[0].name.localeCompare((b).site[0].name))
        setArticles_((sortedVendors as any))
        break;
      default: 
        setArticles_(articles_)
        break;
    }
  }

  useEffect(() => {
    getNews()
  }, [date])

  useEffect(() => {
    filterArticles()
  }, [vendorFilter])

  useEffect(() => {
    sortArticles()
  }, [sortOrder])
  
  return (
    <Results loading={loading} articles={articles_} syncVendorFilter={syncVendorFilter} syncSortOrder={syncSortOrder}/>
  )
}
