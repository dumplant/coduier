import { Member, Profile, Project } from "@prisma/client";

export type ProjectWithMembersWithProfiles = Project & {
  members: (Member & { profile: Profile })[];
};
