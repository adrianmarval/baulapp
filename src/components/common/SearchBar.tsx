// components/SearchBar.tsx
'use client';
import {useSearch} from '@/hooks/useSearch';
import {Card, TextField, Button, Grid, FormControl, FormHelperText, InputAdornment} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {CommentList} from './CommentList';
import {Session} from 'next-auth';
import {redirect} from 'next/navigation';
import {useSurveyStore} from '@/store/survey/survey-store';
import {CommentBox} from './CommetBox';
import {useEffect} from 'react';

interface Props {
  router: string;
  session: Session | null;
}

export const SearchBar = ({router, session}: Props) => {
  const {foundSurvey, searchedSurvey, setFoundSurvey, setSearchedSurvey} = useSurveyStore();
  const {form, handleSearch, isLoading} = useSearch(router);

  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors},
  } = form;

  const handlePaste = async (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pastedText = event.clipboardData.getData('text');

    let hostname: string;
    try {
      const url = new URL(pastedText);
      hostname = url.hostname;
    } catch (error) {
      if (pastedText.includes('.') && !pastedText.includes(' ')) {
        hostname = pastedText.trim();
      } else {
        console.error('El texto pegado no es un URL o un nombre de host válido.');
        return;
      }
    }
    setValue('host', hostname);
    handleSubmit(handleSearch)();
  };

  useEffect(() => {
    setFoundSurvey(null);
    setSearchedSurvey(null);
  }, [router]);

  if (!session) redirect('/api/auth/signin');

  return (
    <Grid>
      <Card className='p-4'>
        <form onSubmit={handleSubmit(handleSearch)}>
          <FormControl fullWidth error={!!errors.host}>
            <TextField
              className='w-full'
              id='input-with-icon-textfield'
              label='Introduce el Url o hostname'
              variant='standard'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              {...register('host')}
              onPaste={handlePaste}
              fullWidth
            />
            <TextField {...register('router')} sx={{display: 'none'}} />
            <FormHelperText>{errors.host?.message}</FormHelperText>
            <Button type='submit' variant='contained' sx={{mt: 2}} disabled={isLoading}>
              {isLoading ? 'Buscando...' : 'Buscar'}
            </Button>
          </FormControl>
        </form>
      </Card>

      {foundSurvey || searchedSurvey ? (
        <Card className='mt-10 flex flex-col items-center justify-center p-4'>
          {foundSurvey && <CommentList session={session} />}
          <CommentBox session={session} foundSurvey={foundSurvey} />
        </Card>
      ) : null}
    </Grid>
  );
};
