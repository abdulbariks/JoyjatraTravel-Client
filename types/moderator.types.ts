export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}
export enum ModeratorStatus {
  ACTIVE = "ACTIVE",
  BLOCKED = "BLOCKED",
  DELETED = "DELETED",
}

export interface IModerator {
  id: string;
  name: string;
  email: string;
  password: string;
  profilePhoto: string | null;
  contactNumber: string;
  address: string;
  isDeleted: boolean;
  deletedAt: string | null;
  experience: number;
  gender: "MALE" | "FEMALE" | "OTHER";
  qualification: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}
