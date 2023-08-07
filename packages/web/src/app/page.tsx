import { PostForm } from '@/components/feature/post/PostForm'
import { PostList } from '@/components/feature/post/PostList'
import { Box, Container, Stack } from '@mui/material'

export default function Page() {
  return (
    <main>
      <Container maxWidth="sm">
        <Stack>
          <Stack>
            <Box component="h2">Post</Box>
            <PostForm />
          </Stack>
          <Stack>
            <Box component="h2">List</Box>
            <PostList />
          </Stack>
        </Stack>
      </Container>
    </main>
  )
}
