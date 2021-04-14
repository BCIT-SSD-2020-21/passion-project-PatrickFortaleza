import React from 'react'
import { Container, Loader } from "semantic-ui-react";
import FilterSidebarCtrl from "../../controllers/FilterSidebar/FilterSidebarCtrl"
import ArticleCtrl from "../../controllers/Article/ArticleCtrl"
import { Article } from "../../models/article"
import NotFound from "../NotFound/index"
import Welcome from "../Welcome/index"

interface Props {
  loading: boolean
  articles: Array<Article>
  syncVendorFilter: (filters: Array<string>) => void
  syncSortOrder: (order: string) => void
  date: string
  focused: boolean
}

export default function Results({loading, articles, date, focused, syncVendorFilter, syncSortOrder}: Props) {
  return (
    <div style={{height: "100%", marginTop: 20, overflow: "hidden"}}>
      <Container style={{height: "100%"}}>
        <div style={style.flex}>

          <FilterSidebarCtrl 
            syncVendorFilter={(filters: Array<string>) => syncVendorFilter(filters)}
            syncSortOrder={(order: string) => syncSortOrder(order)}
          />
          <div style={{width: "100%", position: "relative"}}>
            <div className="result__header">
              <div>
                <h3 style={{display: "flex"}}>Top Headlines:            
                  {
                    date && 
                    <span className="date">{date}</span>
                  }
                </h3>
              </div>
              <div>
                <div className="counter"><span>{articles.length}</span></div>
              </div>
            </div>
            <section className="article__flex" style={{...style.main, position: "relative"}}>
              {
                loading &&
                <div style={{position: "absolute", left: 0, top: 0, width: "100%", height: "100%", background: "#f7f7f7"}}>
                  <Loader size='large' style={{position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}active inline='centered'/>
                </div>
              }
              {
                !loading && articles && articles.length > 0 ?
                articles.map((article, index) => {
                  return (
                    <ArticleCtrl key={index} article={article}/>
                  )
                })
                :
                focused ? <NotFound/> : <Welcome />
              }
            </section>
          </div>

        </div>
      </Container>
    </div>
  )
}

const style = {
  flex: {
    display: "flex",
    justifyContent: "space-between",
    height: "calc(100%)"
  },
  sidebar: {
    border: "1px solid var(--lightsecondary)",
    height: "100%",
    minWidth: "250px",
    marginRight: 20,
  },
  sidebarHead: {
    padding: "7px 14px",
    borderTop: "3px solid var(--highlight)",
    borderBottom: "1px solid #eee"
  },
  main: {
    height: "100%",
    width: "100%",
    paddingTop: 43,
  },
  smallHead: {
    color: "gray",
    fontSize: 12,
    margin: 0,
    padding: "7px 14px",
    marginTop: 7
  },
}
