import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {surveySchema} from '@/validations/surveySchema';
import {findSurveyByHostname} from '@/actions/surveys/find-survey';
import {useSurveyStore} from '@/store/survey/survey-store';
import {toast} from 'react-hot-toast';
import {z} from 'zod';

export const useSearch = (router: string) => {
  const {setFoundSurvey, setComments, setSearchedSurvey} = useSurveyStore();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof surveySchema>>({
    resolver: zodResolver(surveySchema),
    defaultValues: {router},
  });

  const handleSearch = async (data: z.infer<typeof surveySchema>) => {
    setIsLoading(true);
    setSearchedSurvey(data);
    try {
      const {survey, error} = await findSurveyByHostname(data.host, data.router);
      if (error) {
        toast.error(error);
        setFoundSurvey(null);
        setComments([]);
      } else if (survey) {
        setFoundSurvey(survey);
        setComments(survey.comments);
      }
    } catch (error) {
      toast.error('Error grave sin manejar en handleSearch');
    } finally {
      setIsLoading(false);
    }
  };

  return {form, handleSearch, isLoading};
};
