import { ProfileQuery } from "@/graphql";

export const formatDefaultValues = ({ firstName, lastName, linkedInProfile, bio }: ProfileQuery['profile']) =>
  ({ firstName, lastName, linkedInProfile, bio })
