import {create} from 'zustand';
import {SurveyInterface} from '@/interfaces/survey';
import {CommentResponse} from '@/interfaces/comment';
import {z} from 'zod';
import {surveySchema} from '@/validations/surveySchema';

interface SurveyState {
  foundSurvey: SurveyInterface | null;
  comments: CommentResponse[];
  searchedSurvey: z.infer<typeof surveySchema> | null;
  setSearchedSurvey: (searchedSurvey: z.infer<typeof surveySchema> | null) => void;
  setFoundSurvey: (foundSurvey: SurveyInterface | null) => void;
  setComments: (comments: CommentResponse[]) => void;
  addComment: (comment: CommentResponse) => void;
  removeComment: (commentId: string) => void;
  updateComment: (commentId: string, newText: string) => void;
}

export const useSurveyStore = create<SurveyState>((set) => ({
  foundSurvey: null,
  comments: [],
  searchedSurvey: {host: '', router: '', url: ''},
  setFoundSurvey: (foundSurvey) => set({foundSurvey}),
  setSearchedSurvey: (searchedSurvey) => set({searchedSurvey}),
  setComments: (comments) => set({comments}),
  addComment: (comment) => set((state) => ({comments: [...state.comments, comment]})),
  removeComment: (commentId) =>
    set((state) => ({
      comments: state.comments.filter((c) => c._id !== commentId),
    })),
  updateComment: (commentId, newText) =>
    set((state) => ({
      comments: state.comments.map((c) => (c._id === commentId ? {...c, text: newText} : c)),
    })),
}));
