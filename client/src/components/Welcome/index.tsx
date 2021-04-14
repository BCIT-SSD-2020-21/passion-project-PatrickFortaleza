import React from 'react'
import { Icon } from "semantic-ui-react";

export default function Welcome() {
  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "flex-start", paddingTop: 20, height: "100%", width: "100%"}}>
      <div style={{width: "100%", display: "flex", flexDirection: "column", paddingLeft: 20, paddingRight: 20}}>
        <h3 style={{textAlign: "left", fontSize: 21, textTransform: "uppercase", color: "#333", marginTop: 7}}> 
          <Icon style={{fontSize: 21, color: "#333"}} name="hand spock outline" /> Welcome To PyNews!
        </h3>
        <p style={{maxWidth: 600, letterSpacing: "0.25px", lineHeight: "1.7em", marginTop: 17}}>
          <strong><Icon name="info circle"/> About PyNews</strong> <br/>
          PyNews is a data aggregation application built with Python. We aggregate top news articles from famous news vendors for you to compare and contrast. This application was built for educational purposes. You can view all the source-code via <a style={{color: "var(--highlight)"}}href="https://github.com" >github.</a> Instructions included below. We do not own any aggregated content. 
          <br/><br/>
          &copy; Patrick Fortaleza 2021
        </p>


        <p style={{maxWidth: 320, letterSpacing: "0.25px", lineHeight: "1.7em", marginTop: 7}}>
          <strong><Icon name="calendar outline"/> Step 1:</strong> <br/>
          In the search bar above, enter any past date after April 11, 2021.
        </p>

        <p style={{maxWidth: 320, letterSpacing: "0.25px", lineHeight: "1.7em", marginTop: 7}}>
          <strong><Icon name="edit"/> Step 2:</strong> <br/>
          Click "search articles"
        </p>

        <p style={{maxWidth: 320, letterSpacing: "0.25px", lineHeight: "1.7em", marginTop: 7}}>
          <strong><Icon name="balance scale"/> Step 3:</strong> <br/>
          Compare and contrast top news articles of the selected date.
        </p>
      </div>
    </div>
  )
}
