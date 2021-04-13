import React, { useEffect, useState } from 'react'
import Article from "../../components/Article/index"
import {Article as ArticleType} from "../../models/article"

interface Props {
  article: ArticleType
}

const colorModel = {
  "CNN": "#cc0000",
  "Fox News": "#003366",
  "CBS News": "#000000",
  "New York Post": "#cc3333",
  "NBC News": "#f37021"
}

export default function ArticleCtrl({article}: Props) {
  const [formattedDate, setFormattedDate] = useState('')
  const [formattedURL, setFormmattedURL] = useState('')

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

  useEffect(() => {
    formatDate()
    formatURL()
  }, [article])

  return (
    <Article article={article} formattedDate={formattedDate} formattedURL={formattedURL} colorModel={colorModel} />
  )
}
