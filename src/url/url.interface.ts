import { Types } from 'mongoose';

export interface IURL {
  _id?: Types.ObjectId | string;
  original_url: string;
  short_code: string;
  expires_at: Date;
  click_count: number;
  deleted?: boolean;
}
