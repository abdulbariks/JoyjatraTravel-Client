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

export interface IReview {
  [key: string]: unknown;
}

export interface IBlog {
  id: string;
  title: string;
  location: string;
  description: string | null;
  imageUrl: string;
  content: string | null;
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  moderatorId: string;
  moderator: IModerator;
  reviews: IReview[];
}
