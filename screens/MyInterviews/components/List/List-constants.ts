import { MyInterviewsQuery } from "@/graphql";

export const CLASS_NAMES = {
  container: "grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-8",
};

export const SKELETON_INTERVIEWS: MyInterviewsQuery["myInterviews"] = [{ id: "1", __typename: "Interview", createdAt: new Date().toISOString(), thumbnail: '' }, { id: "2", __typename: "Interview", createdAt: new Date().toISOString(), thumbnail: '' }, { id: "3", __typename: "Interview", createdAt: new Date().toISOString(), thumbnail: '' }, { id: "4", __typename: "Interview", createdAt: new Date().toISOString(), thumbnail: '' }]
