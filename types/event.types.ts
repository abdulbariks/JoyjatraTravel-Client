import { IModerator } from "./moderator.types";
import { IReview } from "./review.types";

export interface IEvent {
  id: string;
  name: string;
  description: string;
  location: string;
  price: number;
  imageUrl: string | null;
  startDate: string;
  endDate: string;
  content: string;
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  moderatorId: string;
  moderator: IModerator;
  reviews: IReview[];
}

export interface ICreateEventPayload {
  name: string;
  description: string;
  location: string;
  price: number;
  imageUrl?: string | null;
  startDate: string;
  endDate: string;
  content: string;
}


export interface IEventResponse {
  success: boolean;
  message: string;
    data: IEvent[];
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPages: number; 
  };
}
