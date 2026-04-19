import { IModerator } from "./moderator.types";
import { IReview } from "./review.types";

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
