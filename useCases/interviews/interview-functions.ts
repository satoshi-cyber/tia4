export const getQueryParams = (query: string) => ({
  OR: query
    .split(' ')
    .map(
      (part) =>
        [
          {
            interviewee: {
              email: {
                contains: part,
                mode: 'insensitive',
              },
            },
          },
          {
            interviewee: {
              firstName: {
                contains: part,
                mode: 'insensitive',
              },
            },
          },
          {
            interviewee: {
              lastName: {
                contains: part,
                mode: 'insensitive',
              },
            },
          },
        ] as const
    )
    .flat(),
});
