'use client'

import { Box, Card, CircularProgress, Stack } from '@mui/material'
import { useParams } from 'next/navigation'
import type { FC } from 'react'
import { useGetPost } from './hooks/useGetPost'

export type PostContentProps = {}

export const PostContent: FC<PostContentProps> = ({}) => {
  const params = useParams()
  const postId = params.slug as string
  const post = useGetPost({ postId })

  if (post.isLoading) {
    return (
      <Stack justifyContent={'center'} alignItems={'center'}>
        <CircularProgress />
      </Stack>
    )
  }
  if (post.isError) {
    throw post.error
  }

  if (!post.data) {
    return (
      <Stack>
        <Box>No post</Box>
      </Stack>
    )
  }
  return (
    <Card>
      <Stack gap={1} p={2}>
        <Stack>
          <Box fontWeight={'bold'}>ID</Box>
          <Box>{post.data.postId}</Box>
        </Stack>
        <Stack>
          <Box fontWeight={'bold'}>Title</Box>
          <Box>{post.data.title}</Box>
        </Stack>
        <Stack>
          <Box fontWeight={'bold'}>Content</Box>
          <Box>{post.data.content}</Box>
        </Stack>
        <Stack>
          <Box fontWeight={'bold'}>CreatedAt</Box>
          {`${new Date(post.data.createdAt).toLocaleDateString()} ${new Date(
            post.data.createdAt
          ).toLocaleTimeString()}`}
        </Stack>
      </Stack>
    </Card>
  )
}
