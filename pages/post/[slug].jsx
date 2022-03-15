import React from 'react'
import { getPosts, getPostDetails } from '../../services'

import {
  PostDetail,
  Categories,
  PostWidget,
  Author,
  Comments,
  CommentsForm,
} from '../../components'

const PostDetails = ({ post }) => {
  console.log(post)
  return (
    <div className="container mx-auto mb-8 px-10">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-8">
          <PostDetail post={post} />
          <Author author={post.author} />
          <CommentsForm slug={post.slug} />
          <Comments slug={post.slug} />
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative top-8 lg:sticky">
            <PostWidget
              slug={post.slug}
              categories={post.categories.map((category) => category.slug)}
            />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostDetails

export async function getStaticPaths() {
  const posts = await getPosts()

  //paths should be array of params.slug
  return {
    paths: posts.map(({ node: { slug } }) => {
      return { params: { slug } }
    }),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  console.log(params)
  const data = await getPostDetails(params.slug)
  // console.log(posts)
  return {
    props: { post: data },
    revalidate: 60,
  }
}
