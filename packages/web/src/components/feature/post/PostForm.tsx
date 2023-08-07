'use client'

import { OButton } from '@/components/common/OButton'
import { OFormLabel } from '@/components/common/OForm/OFormLabel'
import { OFormTextField } from '@/components/common/OForm/OFormTextField'
import { zodResolver } from '@hookform/resolvers/zod'
import { Stack } from '@mui/material'
import { useMemo, type FC } from 'react'
import { useForm } from 'react-hook-form'
import { useCreatePost } from './hooks/useCreatePost'
import { PostFormSchema, postFormSchema } from './postFormSchema'

export type PostFormProps = {}

export const PostForm: FC<PostFormProps> = ({}) => {
  const formInstance = useForm<PostFormSchema>({
    resolver: zodResolver(postFormSchema),
  })
  const { mutateAsync: createPost } = useCreatePost()
  const handleSubmit = useMemo(
    () =>
      formInstance.handleSubmit(async (data) => {
        await createPost(data).then(() => {
          formInstance.reset({ title: '', content: '' })
        })
      }),
    [createPost, formInstance]
  )

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap={2}>
        <Stack gap={1}>
          <OFormLabel>Title</OFormLabel>
          <OFormTextField name={'title'} formInstance={formInstance} />
        </Stack>
        <Stack gap={1}>
          <OFormLabel>Content</OFormLabel>
          <OFormTextField
            name={'content'}
            formInstance={formInstance}
            multiline
            minRows={4}
          />
        </Stack>
        <OButton
          variant="contained"
          type="submit"
          loading={formInstance.formState.isSubmitting}
          onSubmit={handleSubmit}
        >
          Send
        </OButton>
      </Stack>
    </form>
  )
}
