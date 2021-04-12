import React, { ChangeEvent, useState, useEffect } from "react";
import DateBanner from "../../components/DateBanner/index";

export default function DateBannerCtrl() {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedDate = `${event}`
    const newDate = new Date(selectedDate)
    setDate(newDate) 
  }

  return <DateBanner date={date} handleDateChange={handleDateChange}/>;
}
