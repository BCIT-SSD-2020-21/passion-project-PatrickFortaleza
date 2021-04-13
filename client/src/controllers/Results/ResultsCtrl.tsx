import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import Results from "../../components/Results"
import { queryNews } from "../../network/index"
import { Site } from "../../models/site"

interface Props {
  date: string
}

export default function ResultsCtrl({date} :Props) {
  const [checkboxModel, setCheckboxModel] = useState({
    "CNN": true,
    "Fox News": true,
    "CBS News": true,
    "New York Post": true,
    "NBC News": true
  })

  const sites: Array<Site> = [
    {
      _id: { $oid: "6070628dbcdb9a31a261bb97" },
      name: "CNN",
      url: "https://www.cnn.com/",
      img: "/assets/logos/cnn.png"
    },
    {
      _id: { $oid: "60721296a55796cad11d99e8" },
      name: "Fox News",
      url: "https://www.foxnews.com/",
      img: "/assets/logos/foxnews.png"
    },
    {
      _id: { $oid: "6072168fa55796cad11d99ea" },
      name: "CBS News",
      url: "https://www.foxnews.com/",
      img: "/assets/logos/cbs.png"
    },
    {
      _id: { $oid: "60721d26a55796cad11d99ec" },
      name: "New York Post",
      url: "https://nypost.com/",
      img: "/assets/logos/nypost.png"
    },
    {
      _id: { $oid: "6073591a220e8618cb695684" },
      name: "NBC News",
      url: "https://www.nbcnews.com/",
      img: "/assets/logos/nbc.png"
    }
  ]
  
  const changeFilters = (name: string) => {
    const updatedCheckboxModel = {...checkboxModel}
    const key = name;
    (updatedCheckboxModel as any)[key] = !(updatedCheckboxModel as any)[key]
    setCheckboxModel(updatedCheckboxModel)
    
  }

  const getNews = async () => {
    if(!date) return
    const result = await queryNews(date)
    console.log(result)
  }

  useEffect(() => {
    getNews()
  }, [date])
  
  return (
    <Results sites={sites} checkboxModel={checkboxModel} changeFilters={changeFilters}/>
  )
}
