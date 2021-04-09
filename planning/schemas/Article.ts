export interface Article {
  articleId: string, // ObjectId
  articleUrl: string,
  headline: string,
  date: Date,
  site: string, //siteId <ObjectId>
}