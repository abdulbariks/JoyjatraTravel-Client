export interface IReview {
  id: string;
  rating: number;
  comment: string;
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  touristId: string;
  blogId: string | null;
  eventId: string | null;
}
