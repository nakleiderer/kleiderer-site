const hydratePocketArticleWithCategories = allCategories => pocketArticle => {
  const tagsOnArticle = pocketArticle.tags || []
  const categories = allCategories.filter(c => {
    const tagsInCategory = c.pocketTags || []
    return tagsOnArticle.reduce((acc, tagOnArticle) => {
      return tagsInCategory.includes(tagOnArticle) || acc
    }, false)
  })
  return { ...pocketArticle, categories }
}

export default hydratePocketArticleWithCategories
