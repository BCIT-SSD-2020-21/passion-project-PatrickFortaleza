import React, { ChangeEvent, FormEvent } from 'react'
import { Container, Menu, Icon, Checkbox } from "semantic-ui-react";
import { Site } from "../../models/site"

interface Props {
  sites: Array<Site>,
  sortModel: Object | any,
  checkboxModel: Object | any,
  changeFilters: (name: string) => void,
  changeSort: (name: string) => void
}
export default function Results({sites, checkboxModel, sortModel, changeFilters, changeSort}:Props) {
  return (
    <div style={{height: "100%", marginTop: 20}}>
      <Container style={{height: "100%"}}>
        <div style={style.flex}>

          <aside style={style.sidebar}>
            <div style={style.sidebarHead}>
              <span style={{display: "flex", justifyContent: "space-between"}}>
                <h3 style={{margin: 0, color: "#333"}}>Filters</h3>
                <Icon style={{ marginRight: 0, fontSize: 17, color: "#333" }} name="sliders horizontal" />
              </span>
            </div>

            <div>
              <h4 style={{...style.smallHead, textTransform: "uppercase" }}>Filter By News Site:</h4>
              <form className="form form__checkboxes">

                {
                  sites && sites.length > 0 &&
                  sites.map((site, index) => {
                    const siteName = site.name
                    return (
                    <div className={checkboxModel[site.name] === true ? "box__row active" : "box__row"} key={index}>
                      <div className="box__label" style={{display: "flex"}}>
                        <div className="thumbnail__box">
                          <img className="thumbnail__img" src={site.img} alt="thumbnail" />
                        </div>
                        <label htmlFor={site.name} style={{textTransform: "uppercase", fontWeight: 700}}>{site.name}</label>
                      </div>
                      <Checkbox value={site.name} checked={checkboxModel[site.name]} onChange={() => changeFilters(siteName)} slider fitted/>
                    </div>
                    )
                  })
                }
              </form>

              <h4 style={{...style.smallHead, textTransform: "uppercase" }}>Sort By:</h4>

              <form className="form form__checkboxes">
                {
                  typeof sortModel === 'object' && sortModel !== null &&
                  Object.entries(sortModel).map(([key, value], index) => {
                    return (
                      <div className={value === true ? "box__row active" : "box__row"} key={index}>
                      <div className="box__label" style={{display: "flex"}}>
                        <label htmlFor={key} style={{textTransform: "uppercase", fontWeight: 700, fontSize: 12}}>{key.replace(/_/g, " ")}</label>
                      </div>
                      <Checkbox value={key} checked={sortModel[key]}  onChange={() => changeSort(key) }slider fitted/>
                    </div>
                    )
                    
                  })
                }
              </form>

            </div>
          </aside>

          <section style={style.main}>
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
