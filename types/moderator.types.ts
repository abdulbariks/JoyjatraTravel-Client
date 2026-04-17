export interface IModerator {
  id: string;
  name: string;
  email: string;
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
