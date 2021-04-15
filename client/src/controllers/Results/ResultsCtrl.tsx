import React, { useEffect, useState, useRef, Ref, RefObject } from 'react'
import Results from "../../components/Results"
import { queryNews } from "../../network/index"
import { Article } from "../../models/article"

interface Props {
  date: string
  focusCount: number
}

const getWindowWidth = () => {
  const { innerWidth: width } = window
  return width
}

export default function ResultsCtrl({date, focusCount} :Props) {
  const [loading, setLoading] = useState(false)
  const [animatedIn, setAnimatedIn] = useState(false)
  // For storing the query in memory
  const [articles, setArticles] = useState([])
  // For serving up a filtered -or- sorted list.
  const [articles_, setArticles_] = useState([])
  const [vendorFilter, setVendorFilter] = useState([])
  const [sortOrder, setSortOrder] = useState('')
  const [focused, setFocused] = useState(false)
  const [screenWidth, setScreenWidth] = useState(0)
  const [sidebarMobile, setSidebarMobile] = useState(false)
  const scrollTop = (useRef() as any);

  const handleResize = () => {
    setScreenWidth(getWindowWidth)
  }

  const evaluateScreenWidth = () => {
    if(screenWidth < 900) return setSidebarMobile(true)
    return setSidebarMobile(false)
  }

  const scrollToTop = () => {
    scrollTop.current.scrollIntoView({behavior: "smooth"})
  }

  const getNews = async () => {
    if(!date) return
    setAnimatedIn(false)
    setLoading(true)
    await setArticles_([])

    const result = await queryNews(date)
    setLoading(false)

    if(result.error) return setArticles([])
    setArticles(result.data.articles)
    setArticles_(result.data.articles)
    setTimeout(() => {
      setAnimatedIn(true)
      scrollToTop()
    }, 150)
  }

  const syncVendorFilter = (filters: Array<string>) => {
    setVendorFilter((filters as any))
  }

  const syncSortOrder = (order: string) => {
    setSortOrder(order)
  }

  const filterArticles = (array: Array<Article>) => {
    if(!array && (array as Array<string>).length < 1) return
    const filteredArray = [...articles].filter((article) => {
      if(!(vendorFilter as Array<string>).includes((article as Article).site[0].name)) return article
      return
    })
    
    return filteredArray
  }

  const sortArticles = (array: Array<Article>) => {
    switch(sortOrder){
      case "default":
        return array
      case "alphabetically":
        const sortedAlphabetically = ([...array] as Array<Article>).sort((a, b) => {
          // Some headlines have " " as their first letter which throws sorting off
          let headlineA = a.headline[0] !== " " ? a.headline : a.headline.substring(1),
              headlineB = b.headline[0] !== " " ? b.headline : b.headline.substring(1)
          return headlineA.localeCompare(headlineB)
        })
        
        return sortedAlphabetically
      case "news_vendor":
        const sortedVendors = ([...array] as Array<Article>).sort((a, b) =>
          (a).site[0].name.localeCompare((b).site[0].name))
        return sortedVendors
      default: 
        return array
    }
  }

  const sortFilterArray = async () => {
    setAnimatedIn(false)
    setLoading(true)
    await setArticles_([])
    const filtered = filterArticles(articles)
    const sorted = sortArticles((filtered as Array<Article>))
    setArticles_((sorted as any))
    setLoading(false)
    setTimeout(() => {
      setAnimatedIn(true)
      scrollToTop()
    }, 150)

  }

  useEffect(() => {
    handleResize()

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [])

  useEffect(() => {
    getNews()
  }, [date])

  useEffect(() => {
    sortFilterArray()
  }, [articles])

  useEffect(() => {
    sortFilterArray()
  }, [sortOrder, vendorFilter])

  useEffect(() => {
    if(focusCount > 0) setFocused(true)
  }, [focusCount])

  useEffect(() => {
    evaluateScreenWidth()
  }, [screenWidth])
  
  return (
    <Results 
      loading={loading} 
      articles={articles_} 
      focused={focused} 
      syncVendorFilter={syncVendorFilter} 
      syncSortOrder={syncSortOrder} 
      date={date}
      animatedIn={animatedIn}
      scrollTop={scrollTop}
      sidebarMobile={sidebarMobile}
    />
  )
}
