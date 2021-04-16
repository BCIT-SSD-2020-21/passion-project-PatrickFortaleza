import React, { ChangeEvent } from "react";
import { Button, Icon } from "semantic-ui-react";
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
  screenWidth: number
}

export default function DateBanner({date, fade, remove, screenWidth, handleDateChange, submitQuery, focusCounter}: Props) {
  return (
    <div
      className={remove ? "banner__container fade" : "banner__container"}
      style={{
        background: "#f7f7f7",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        transition: "all .2s ease-in-out"
      }}
    >
      <div className="prism__background">
        <Prism />
      </div>
      <div className="banner__wrapper" style={{zIndex: 500, padding: "0px 20px", width: "100%"}}>
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
        <div className="datepicker__input" style={{ display: "flex", justifyContent: "space-between", maxWidth: "700px", minWidth: "300px", margin: "auto" }} >
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
            {
              screenWidth < 530 && screenWidth > 320 ?
                <Icon style={{fontSize: 21, marginRight: 0, lineHeight: "20px", color: "white"}} name="search" />
              :
                "Search Articles"
            }
            
          </Button>
        </div>
        {
          !remove &&
            <p
              className={fade ? "date__banner fade" : "date__banner"} 
              style={{ fontSize: 12, padding: "3px 0px", textAlign: "center" }}
            >
              Data sets available from April 11, 2021 and onward.
            </p>
        }
      </div>
    </div>
  );
}
