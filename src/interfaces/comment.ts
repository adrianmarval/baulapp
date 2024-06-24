export interface CommentResponse {
  _id: string;
  text: string;
  date: string;
  user: string;
  userId: string;
}

export interface CommentDocument {
  _id: {toString: () => string};
  text: string;
  createdAt: Date;
  user: {
    firstName: string;
    lastName: string;
  };
}
