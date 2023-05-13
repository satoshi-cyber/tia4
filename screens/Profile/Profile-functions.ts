export const formatValues = ({
  firstName,
  lastName,
  linkedInProfile,
  bio,
}: {
  firstName?: string | null;
  lastName?: string | null;
  linkedInProfile?: string | null;
  bio?: string | null;
}) => ({
  firstName,
  lastName,
  linkedInProfile,
  bio: bio ?? null,
});
