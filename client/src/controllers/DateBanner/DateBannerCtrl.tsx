import React, { ChangeEvent, useState, useEffect } from "react";
import DateBanner from "../../components/DateBanner/index";

interface Props {
  watchDate: (date: string) => void;
  focusCounter: () => void;
  focusCount: number
}

const getWindowWidth = () => {
  const { innerWidth: width } = window
  return width
}

export default function DateBannerCtrl({watchDate, focusCounter, focusCount}: Props) {
  const [date, setDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState('')
  const [fade, setFade] = useState(false)
  const [remove, setRemove] = useState(false)
  const [screenWidth, setScreenWidth] = useState(0)

  const handleResize = () => {
    setScreenWidth(getWindowWidth)
  }

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedDate = `${event}`
    const newDate = new Date(selectedDate)
    setDate(newDate) 
  }

  const formatDate = () => {
    let month = (date.getMonth() + 1).toString().padStart(2, "0"),
        day = date.getDate().toString().padStart(2, "0"),
        year = date.getFullYear();
    
    const dateString = `${year}-${month}-${day}`
    setFormattedDate(dateString)
  }

  const submitQuery = () => {
    watchDate(formattedDate)
  }

  const removeElements = () => {
    setFade(true)
    setTimeout(() => {
      setRemove(true)
    }, 550)
  }

  useEffect(() => {
    formatDate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date])

  useEffect(() => {
    if(focusCount > 0) removeElements()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusCount])

  useEffect(() => {
    handleResize()

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [])

  return <DateBanner 
            date={date} 
            handleDateChange={handleDateChange} 
            submitQuery={submitQuery} 
            focusCounter={() => focusCounter()}
            fade={fade}
            remove={remove}
            screenWidth={screenWidth}
          />;
}
