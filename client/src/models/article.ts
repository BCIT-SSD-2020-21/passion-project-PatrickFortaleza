import { Site } from "./site"

export interface Article {
  _id: Object,
  site: Array<Site>,
  headline: string,
  date: string,
  article_url: string,
}