import React, { ChangeEvent, useState, useEffect } from "react";
import DateBanner from "../../components/DateBanner/index";

interface Props {
  watchDate: (date: string) => void;
}

export default function DateBannerCtrl({watchDate}: Props) {
  const [date, setDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState('')

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

  useEffect(() => {
    formatDate()
  }, [date])

  useEffect(() => {
    watchDate(formattedDate)
  }, [formattedDate])

  return <DateBanner date={date} handleDateChange={handleDateChange}/>;
}
