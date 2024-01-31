import { useValidatedParams, z } from 'h3-zod'

export default eventHandler(async (event) => {
  await requireUserSession(event)
  const { key } = await useValidatedParams(event, {
    key: z.string().min(1).max(100)
  })

  // Delete entry for the current user
  const storage = await useKV()

  await storage.removeItem(key)

  return { key }
})