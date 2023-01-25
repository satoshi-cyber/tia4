import { Company } from "@/graphql";

export const formatDefaultValues = ({ name, description, website }: Company) =>
  ({ name, description, website })
