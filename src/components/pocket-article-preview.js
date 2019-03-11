import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import styles from './pocket-article-preview.module.css'

export default ({ article }) => (
  <div className={styles.preview}>
    <img alt="" src={article.image.src} />
    <h3 className={styles.previewTitle}>
      <a href={`${article.url}`}>{article.title}</a>
    </h3>
    <p>{article.excerpt}</p>
  </div>
)
