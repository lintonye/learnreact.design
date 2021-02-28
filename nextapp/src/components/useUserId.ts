import { useLocalStorage } from '@/lib/useLocalStorage'
import { nanoid } from 'nanoid'

/**
 *
 * @param authId The id if the user goes through authentication
 */
export function useUserId(authId?: string) {
  const [personId, setPersonId] = useLocalStorage('personId', authId)
  if (personId === null) setPersonId(nanoid())
  // force to use uid if it exists
  if (authId && personId !== authId) setPersonId(authId)
  return personId
}
