import React from 'react'
import {Article as ArticleType} from "../../models/article"

interface Props {
  article: ArticleType,
  formattedDate: string,
  formattedURL: string,
  colorModel: object | any,
  formattedHeadline: string,
  concatHeadline: boolean,
  index: number,
  animatedIn: boolean
}

export default function Article({
  article, 
  formattedDate, 
  colorModel, 
  formattedURL, 
  formattedHeadline, 
  concatHeadline, 
  index,
  animatedIn
}: Props) {
  return (
    <a href={formattedURL} target="blank_" style={{display: "block", alignSelf: "flex-start"}} className="article__wrap">
      <article 
        className="article article__container"
        style={{
          opacity: animatedIn ? 1 : 0,
          transform: animatedIn ? "translateY(0px)" : "translateY(10px)",
          transition: `all 0.2s ease-in-out ${(index * 0.1) + 0.25}s`
        }}
      >
        <span className="article__accent" style={{background: `${colorModel[`${article.site[0].name}`]}`}}></span>
        <h4 className="article__headline" style={{color: "#353535"}}>
          {
            concatHeadline &&  
            <span className="article__extend">{article.headline}</span>
          }
          {formattedHeadline}
        </h4>

        <div style={{display: "flex", justifyContent: "space-between", marginTop: 14}}>
          <label style={{display: "flex", fontSize: 12, fontWeight: "bold", color: "#353535"}}>
            <div className="thumbnail__box">
              <img className="thumbnail__img" src={article.site[0].img} alt="thumbnail" />
            </div>
            {article.site[0].name}
          </label>
          <p style={{fontSize: 12, color: "grey" }}>{formattedDate}</p>
        </div>
      </article>
    </a>
  )
}