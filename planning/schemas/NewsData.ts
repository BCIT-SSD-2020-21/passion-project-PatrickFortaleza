import { Article } from "./Article"

export interface NewsData {
  date: Date,
  articles: Array<Article>, // should just hold articleIds.
}