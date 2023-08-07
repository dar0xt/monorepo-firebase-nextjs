'use client'

import { Box, Card, CircularProgress, Stack } from '@mui/material'
import Link from 'next/link'
import { type FC } from 'react'
import { useGetAllPosts } from './hooks/useGetAllPosts'

export type PostListProps = {}

export const PostList: FC<PostListProps> = ({}) => {
  const posts = useGetAllPosts()

  if (posts.isLoading) {
    return (
      <Stack direction={'row'} justifyContent={'center'}>
        <CircularProgress />
      </Stack>
    )
  }
  if (posts.isError) {
    throw posts.error
  }
  if (posts.data?.length === 0) {
    return <Box>No post</Box>
  }

  return (
    <Stack gap={2}>
      {posts.data.map((post, i) => (
        <Link
          key={i}
          href={`/post/${post.postId}`}
          style={{ textDecoration: 'none' }}
        >
          <Card>
            <Stack p={2} gap={1}>
              <Stack>
                <Box fontWeight={'bold'}>Title</Box>
                <Box>{post.title}</Box>
              </Stack>
              <Stack>
                <Box fontWeight={'bold'}>Content</Box>
                <Box>{post.content}</Box>
              </Stack>
              <Stack>
                <Box fontWeight={'bold'}>CreatedAt</Box>
                <Box>
                  {`${new Date(post.createdAt).toLocaleDateString()} ${new Date(
                    post.createdAt
                  ).toLocaleTimeString()}`}
                </Box>
              </Stack>
            </Stack>
          </Card>
        </Link>
      ))}
    </Stack>
  )
}
