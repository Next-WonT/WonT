export interface ReviewDataTypes {
  id: number;
  created_at: string;
  user_email: string;
  review_data: string;
  review_image: string[];
  user_id: string;
  title: string;
  region?: string;
  trip_date: string[];
  writer?: string;
}
