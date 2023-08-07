import { container } from 'tsyringe'
import { PostService } from './post.service'

describe('PostService', () => {
  const service = container.resolve(PostService)
  const mockCreateInput = {
    title: 'title',
    content: 'content',
  }

  it('should get a post', async () => {
    const created = await service.create(mockCreateInput)
    const result = await service.get(created.postId)
    expect(result).toEqual({
      postId: created.postId,
      ...mockCreateInput,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })

  it('should get all posts', async () => {
    await service.create(mockCreateInput)
    await service.create(mockCreateInput)
    const result = await service.getAll()
    expect(result).toHaveLength(2)
  })

  it('should create a post', async () => {
    const result = await service.create(mockCreateInput)
    expect(result).toEqual({ postId: expect.any(String) })
  })

  it('should update a post', async () => {
    const created = await service.create(mockCreateInput)
    const updateValues = {
      title: 'updated content',
      content: 'updated content',
    }
    await service.update({
      postId: created.postId,
      ...updateValues,
    })
    const result = await service.get(created.postId)
    expect(result).toEqual({
      postId: created.postId,
      ...updateValues,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })

  it('should delete a post', async () => {
    const created = await service.create(mockCreateInput)
    await service.delete(created.postId)
    const result = await service.get(created.postId)
    expect(result).toBeNull()
  })
})
