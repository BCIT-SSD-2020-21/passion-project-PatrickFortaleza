export interface Article {
  articleId: string, // ObjectId
  articleUrl: string,
  headline: string,
  site: string, //siteId <ObjectId>
}