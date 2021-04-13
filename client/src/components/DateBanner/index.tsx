import React, { ChangeEvent } from "react";
import { Container, Button } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  date: Date
  handleDateChange: (event: ChangeEvent<HTMLInputElement>) => void;
  submitQuery: () => void
}

export default function DateBanner({date, handleDateChange, submitQuery}: Props) {
  return (
    <div
      style={{
        minHeight: 250,
        background: "#f7f7f7",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "50px 20px",
        // backgroundImage: "url(/assets/images/background.png)",
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <div>
        <h2
          style={{
            textAlign: "center",
            textTransform: "uppercase",
            marginBottom: "5px",
          }}
        >
          Compare Top News Stories
        </h2>
        <p style={{ textAlign: "center", marginBottom: 35 }}>
          See past articles from popular news websites by searching a date.
        </p>
        <div style={{ display: "flex" }}>
          {/* <DatePicker selected={date} onSelect={(event: ChangeEvent<HTMLInputElement>) => handleDateChange(event)}/> */}
          <DatePicker selected={date} onChange={(event:ChangeEvent<HTMLInputElement>)  => handleDateChange(event)}/>           
          <Button onClick={() => submitQuery()} style={{ letterSpacing: ".5px", textTransform: "uppercase" }}>
            Search Articles
          </Button>
        </div>
        <p style={{ textAlign: "left", fontSize: 12, padding: "3px 0" }}>
          Data sets available from April 11, 2021 and onward.
        </p>
      </div>
    </div>
  );
}
