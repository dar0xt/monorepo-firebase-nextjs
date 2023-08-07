import { PostContent } from '@/components/feature/post/PostContent'
import { Box, Button, Container, Stack } from '@mui/material'
import Link from 'next/link'

export default function Page() {
  return (
    <main>
      <Container maxWidth="sm">
        <Stack gap={2}>
          <Box component="h2">Post Detail</Box>
          <PostContent />
          <Link href="/" passHref>
            <Button fullWidth>Back</Button>
          </Link>
        </Stack>
      </Container>
    </main>
  )
}
