import React, { useEffect, useState } from 'react'
import Article from "../../components/Article/index"
import {Article as ArticleType} from "../../models/article"

interface Props {
  article: ArticleType
  index_: number
  animatedIn: boolean
}

const colorModel = {
  "CNN": "#cc0000",
  "Fox News": "#003366",
  "CBS News": "#000000",
  "New York Post": "#cc3333",
  "NBC News": "#f37021"
}

export default function ArticleCtrl({article, index_, animatedIn}: Props) {
  const [formattedDate, setFormattedDate] = useState('')
  const [formattedURL, setFormmattedURL] = useState('')
  const [formattedHeadline, setFormattedHeadline] = useState('')
  const [concatHeadline, setConcatHeadline] = useState(false)

  const formatDate = () => {
    let d = new Date(article.date),
        month = d.toLocaleString('default', { month: 'long' }),
        year = d.getFullYear(),
        day = (d.getDate() + 1).toString().padStart(2, "0");
    
    const dateString = `${month} ${day}, ${year}`
    setFormattedDate(dateString)
  }

  const formatURL = () => {
    let url = article.article_url
    const regex = new RegExp('http', 'g')
    const hasHTTP = regex.test(url)

    switch(hasHTTP){
      case true:
        url = url
        break;
      case false:
        url = `${article.site[0].url.replace(/\/$/, "")}${article.article_url}`
        break;
    }

    setFormmattedURL(url)
  }

  const formatHeadline = () => {
    let headline: string = article.headline,
        headlineLength: number = headline.length;
      
    if(headlineLength > 80){
      headline = `${headline.substr(0, 80)} [...]`
      setConcatHeadline(true)
    }

    setFormattedHeadline(headline)
  }

  useEffect(() => {
    formatDate()
    formatURL()
    formatHeadline()
  }, [article])

  return (
    <Article 
      article={article} 
      formattedDate={formattedDate} 
      formattedURL={formattedURL}
      formattedHeadline={formattedHeadline} 
      colorModel={colorModel} 
      concatHeadline={concatHeadline}
      index={index_}
      animatedIn={animatedIn}
    />
  )
}
