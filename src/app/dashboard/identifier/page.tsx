import {Box, Card, TextField} from '@mui/material';
import {CommetBox} from './components/CommetBox';
import {CommentList} from './components/CommentList';

const comments = [
  {
    id: 1,
    text: 'This is a comment',
    date: 'Jan 15, 2014',
    user: 'Emilio Martinez',
  },
  {
    id: 2,
    text: 'This is a comment',
    date: 'Jan 18, 2014',
    user: 'Adrian Marval',
  },
  {
    id: 3,
    text: 'This is a comment',
    date: 'Jan 24, 2014',
    user: 'Solmaira Maza',
  },
];

const DashboardPage = () => {
  return (
    <Box>
      {/* Search Survey Bar */}
      <Card>
        <form action="">

        <TextField className='w-full' id='outlined-basic' label='Introduce el Url o hostname' variant='outlined' />
        </form>
      </Card>
      {/* Comments */}
      <Card className='mt-10 flex flex-col items-center justify-center p-4'>
        <CommentList comments={comments} />
        <CommetBox />
      </Card>
    </Box>
  );
};

export default DashboardPage;
