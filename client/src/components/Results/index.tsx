import React from 'react'
import { Container, Loader } from "semantic-ui-react";
import FilterSidebarCtrl from "../../controllers/FilterSidebar/FilterSidebarCtrl"

interface Props {
  loading: boolean
}

export default function Results({loading}: Props) {
  return (
    <div style={{height: "100%", marginTop: 20}}>
      <Container style={{height: "100%"}}>
        <div style={style.flex}>

          <FilterSidebarCtrl />

          <section style={{...style.main, position: "relative"}}>
            {
              loading &&
              <Loader size='large' style={{position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}active inline='centered'/>
            }
            Main
          </section>

        </div>
      </Container>
    </div>
  )
}

const style = {
  flex: {
    display: "flex",
    justifyContent: "space-between",
    height: "100%"
  },
  sidebar: {
    border: "1px solid var(--lightsecondary)",
    height: "100%",
    minWidth: "250px",
    marginRight: 20
  },
  sidebarHead: {
    padding: "7px 14px",
    borderTop: "3px solid var(--highlight)",
    borderBottom: "1px solid #eee"
  },
  main: {
    height: "100%",
    width: "100%",
    border: "1px solid var(--lightsecondary)",
  },
  smallHead: {
    color: "gray",
    fontSize: 12,
    margin: 0,
    padding: "7px 14px",
    marginTop: 7
  },
}
