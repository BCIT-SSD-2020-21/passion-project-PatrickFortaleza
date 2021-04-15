import { Container } from "semantic-ui-react";
import FilterSidebarCtrl from "../../controllers/FilterSidebar/FilterSidebarCtrl"
import Articles from "../Articles/index"
import { Article } from "../../models/article"


interface Props {
  loading: boolean
  articles: Array<Article>
  syncVendorFilter: (filters: Array<string>) => void
  syncSortOrder: (order: string) => void
  date: string
  focused: boolean
  animatedIn: boolean
  scrollTop: any
  sidebarMobile: boolean
}

export default function Results({
        loading, 
        articles, 
        date, 
        focused, 
        animatedIn, 
        scrollTop,
        sidebarMobile, 
        syncVendorFilter, 
        syncSortOrder
  }: Props) {
  return (
    <div style={{height: "100%", marginTop: 20, overflow: "hidden"}}>
      <Container style={{height: "100%"}}>
        <div className="results__container" style={style.flex}>

          <FilterSidebarCtrl
            sidebarMobile={sidebarMobile} 
            syncVendorFilter={(filters: Array<string>) => syncVendorFilter(filters)}
            syncSortOrder={(order: string) => syncSortOrder(order)}
          />

          <Articles 
            loading={loading}
            articles={articles}
            date={date}
            focused={focused}
            animatedIn={animatedIn}
            scrollTop={scrollTop}
          />

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
