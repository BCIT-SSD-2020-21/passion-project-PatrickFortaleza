import React from 'react'

export default function Article() {
  return (
    <a href="https://github.com" target="blank_">
      <article className="article article__container">
        <span className="article__accent"></span>
        <h4 style={{color: "#353535"}}>He was known inside Cup Foods well before the two became forever linked. Now Floyd’s memory is woven into the site.</h4>

        <div style={{display: "flex", justifyContent: "space-between", marginTop: 14}}>
          <label style={{display: "flex", fontSize: 12, fontWeight: "bold", color: "grey"}}>
            <div className="thumbnail__box">
              <img className="thumbnail__img" src={"/assets/logos/cnn.png"} alt="thumbnail" />
            </div>
            CNN
          </label>
          <p style={{fontSize: 12, color: "grey", fontWeight: "bold"}}>April 13, 2021</p>
        </div>
      </article>
    </a>
  )
}