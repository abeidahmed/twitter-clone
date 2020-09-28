import { useMutation, queryCache } from 'react-query';

export function useRefetchMutation(deleteTweetApi, [...queries]) {
  const [mutate, { isLoading }] = useMutation(deleteTweetApi, {
    onSuccess() {
      for (let query of queries) {
        queryCache.refetchQueries(query);
      }
    },
    throwOnError: true,
  });

  return [mutate, { isLoading }];
}
