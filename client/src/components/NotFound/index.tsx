import React from 'react'
import { Icon } from "semantic-ui-react";

export default function NotFound() {
  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100%", width: "100%"}}>
      <div style={{maxWidth: 330, display: "flex", flexDirection: "column"}}>
        <Icon style={{margin: "auto", fontSize: 30, color: "gray"}} name="eye slash" />
        <h3 style={{textAlign: "center", fontSize: 25, textTransform: "uppercase", color: "grey"}}>Data not found</h3>
        <p style={{textAlign: "center"}}>Unfortunately, we don't have any data for the date that you requested. Please try entering another date.</p>
      </div>
    </div>
  )
}
