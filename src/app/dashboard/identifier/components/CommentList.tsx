import {List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography} from '@mui/material';

interface Props {
  comments: Array<{id: number; user: string; text: string; date: string}>;
}

export const CommentList = ({comments}: Props) => {
  return (
    <List sx={{width: '100%', bgcolor: 'background.paper'}}>
      {comments.map((comment) => (
        <ListItem key={comment.id}>
          <ListItemAvatar>
            <Avatar alt='Remy Sharp' src='/profile.webp' />
          </ListItemAvatar>
          <ListItemText
            primary={comment.user}
            secondary={
              <>
                <Typography component='span' variant='body2' sx={{display: 'flex', flexDirection: 'column'}}>
                  {comment.text}
                </Typography>
                <Typography className='font-semibold' component='span' variant='body2' color='text.secondary' sx={{mt: 1}}>
                  {comment.date}
                </Typography>
              </>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};
