import { useSelector } from 'react-redux'
import { getSiteAssociatedWithCurrentUser } from '@ihp-smp/core/src/services'

import { useQuery } from '@tanstack/react-query'
import { useCallback } from 'react'

/**
 * Handles Participants Fetching ....
 */
export const useNewEnrollment = () => {
  const {
    USER: { currentUser },
  } = useSelector(({ login }) => login)

  const getUserSiteCounts = useCallback(() => {
    if (!currentUser.person) return
    const params = '?include=person_study_roles.site'
    return getSiteAssociatedWithCurrentUser(currentUser.person.id, params)
  }, [currentUser])

  const parseResponse = (response) => {
    const sitesArr = response?.included.filter((item) => item.type === 'sites')
    return sitesArr
  }

  const {
    isFetching,
    isSuccess,
    refetch,
    data: result,
  } = useQuery({
    queryKey: ['getSitesList', currentUser],
    queryFn: getUserSiteCounts,
    select: parseResponse,
    enabled: !!currentUser.person,
    staleTime: 0,
  })

  return {
    isFetching,
    isSuccess,
    result,
    refetch,
  }
}

export default useNewEnrollment
