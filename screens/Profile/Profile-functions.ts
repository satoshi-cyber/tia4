import { ProfileQuery } from "@/graphql";

export const formatDefaultValues = ({ firstName, lastName }: ProfileQuery['profile']) =>
  ({ firstName, lastName })
