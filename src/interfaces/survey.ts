import {CommentResponse} from './comment';

export interface SurveyInterface {
  _id: string;
  host: string;
  url: string;
  router: string;
  comments: CommentResponse[];
}

export interface SurveyResponse {
  survey: SurveyInterface | null;
  success: boolean;
  message: string;
}
