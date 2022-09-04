export interface Post {
  _id: string
  _createdAt: string
  title: string
  mainImage: {
    asset: {
      url: string
    }
  }
  slug: {
    current: string
  }
  body: [TypedObject]
  technology: string
}
