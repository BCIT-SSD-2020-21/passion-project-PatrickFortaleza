import { useEffect, useState } from 'react'
import Article from "../../components/Article/index"
import {Article as ArticleType} from "../../models/article"

interface Props {
  article: ArticleType
  index_: number
  animatedIn: boolean
  date: string
}

const colorModel = {
  "CNN": "#cc0000",
  "Fox News": "#003366",
  "CBS News": "#000000",
  "New York Post": "#cc3333",
  "NBC News": "#f37021"
}

export default function ArticleCtrl({article, index_, animatedIn, date}: Props) {
  const [formattedDate, setFormattedDate] = useState('')
  const [formattedURL, setFormmattedURL] = useState('')
  const [formattedHeadline, setFormattedHeadline] = useState('')
  const [concatHeadline, setConcatHeadline] = useState(false)

  const formatDate = () => {
    let d = new Date(date),
        month = d.toLocaleString('default', { month: 'long' }),
        year = d.getFullYear(),
        day = (d.getDate() + 1).toString();
    
    const dateString = `${month} ${day}, ${year}`
    setFormattedDate(dateString)
  }

  const formatURL = () => {
    let url = article.article_url
    const regex = new RegExp('http', 'g')
    const hasHTTP = regex.test(url)

    switch(hasHTTP){
      case true:
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
