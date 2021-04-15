import React, { ChangeEvent } from "react";
import { Container, Button } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Prism } from "../../background/Prism"

interface Props {
  date: Date
  handleDateChange: (event: ChangeEvent<HTMLInputElement>) => void;
  submitQuery: () => void
  focusCounter: () => void;
  fade: boolean
  remove: boolean
}

export default function DateBanner({date, fade, remove, handleDateChange, submitQuery, focusCounter}: Props) {
  return (
    <div
      className={remove ? "banner__container fade" : "banner__container"}
      style={{
        background: "#f7f7f7",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // backgroundImage: "url(/assets/images/background.png)",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        transition: "all .2s ease-in-out"
      }}
    >
      <div className="prism__background">
        <Prism />
      </div>
      <div style={{zIndex: 500}}>
        {
          !remove &&
          <>
            <h2
              className={fade ? "date__banner fade" : "date__banner"}
              style={{
                textAlign: "center",
                textTransform: "uppercase",
                marginBottom: "5px",
                fontSize: 20,
              }}
            >
              Compare Top News Headlines
            </h2>
            <p
              className={fade ? "date__banner fade" : "date__banner"} 
              style={{ textAlign: "center", marginBottom: 35 }}
            >
              Enter any past date and click search!
            </p>
          </>
        }
        <div style={{ display: "flex" }} >
          {/* <DatePicker selected={date} onSelect={(event: ChangeEvent<HTMLInputElement>) => handleDateChange(event)}/> */}
          <DatePicker
            selected={date} 
            onChange={(event:ChangeEvent<HTMLInputElement>)  => handleDateChange(event)}
            maxDate={new Date()} 
          />           
          <Button
            className="date__button" 
            onClick={() => { 
              submitQuery()
              focusCounter()
            }} 
            style={{ letterSpacing: ".5px", textTransform: "uppercase", background: "var(--highlight)" }}
          >
            Search Articles
          </Button>
        </div>
        {
          !remove &&
            <p
              className={fade ? "date__banner fade" : "date__banner"} 
              style={{ textAlign: "left", fontSize: 12, padding: "3px 0" }}
            >
              Data sets available from April 11, 2021 and onward.
            </p>
        }
      </div>
    </div>
  );
}
