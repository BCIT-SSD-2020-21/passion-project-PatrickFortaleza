import { useState, useEffect } from 'react'
import FilterSidebar from "../../components/FilterSidebar/index"
import { Site } from "../../models/site"

interface Props {
  syncVendorFilter: (filters: Array<string>) => void
}

export default function FilterSidebarCtrl({syncVendorFilter}:Props) {
  const [checkboxModel, setCheckboxModel] = useState({
    "CNN": true,
    "Fox News": true,
    "CBS News": true,
    "New York Post": true,
    "NBC News": true
  })
  const [sortModel, setSortModel] = useState({
    default: true,
    alphabetically: false,
    news_vendor: false
  })

  const changeFilters = (name: string) => {
    const updatedCheckboxModel = {...checkboxModel}
    const key = name;
    (updatedCheckboxModel as any)[key] = !(updatedCheckboxModel as any)[key]
    setCheckboxModel(updatedCheckboxModel)
  }

  const changeSort = (key: string) => {
    const updatedSortModel = {...sortModel}
    Object.keys(updatedSortModel).forEach(k => {
      (updatedSortModel as any)[k] = false;
    });
    (updatedSortModel as any)[key] = true;
    setSortModel(updatedSortModel)
  }

  const evaluateSyncFilter = () => {
    let filters: Array<string> = []
    Object.entries(checkboxModel).forEach(([key, value]) => {
      if(value === false) filters = [...filters, key]
    })

    syncVendorFilter(filters)
  }

  useEffect(() => {
    evaluateSyncFilter()
  }, [checkboxModel])

  return (
    <FilterSidebar 
      sites={sites} 
      checkboxModel={checkboxModel} 
      sortModel={sortModel} 
      changeFilters={changeFilters} 
      changeSort={changeSort}
    />
  )
}

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