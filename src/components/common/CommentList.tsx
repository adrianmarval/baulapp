'use client';
import {CommentResponse} from '@/interfaces/comment';
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  IconButton,
  TextField,
  Button,
  CircularProgress,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {useState, useRef, useEffect} from 'react';
import {useSurveyStore} from '@/store/survey/survey-store';
import {Session} from 'next-auth';
import {useCommentHandler} from '@/hooks/useCommentHandler';

interface Props {
  session: Session;
}

export const CommentList = ({session}: Props) => {
  const {comments} = useSurveyStore();
  const {handleDeleteComment, handleEditComment, isEditingComment, isDeletingComment} = useCommentHandler();

  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editingCommentId]);

  if (!comments || comments.length === 0) {
    return <Typography variant='h6'>No comments found</Typography>;
  }

  const handleEditClick = (comment: CommentResponse) => {
    setEditingCommentId(comment._id);
    setEditText(comment.text);
  };

  const handleSaveEdit = (commentId: string) => {
    handleEditComment(commentId, editText);
    setEditingCommentId(null);
  };

  const handleDeleteClick = (commentId: string) => {
    handleDeleteComment(commentId);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSaveEdit(editingCommentId!);
    } else if (event.key === 'Enter' && event.shiftKey) {
      event.preventDefault();
      const textarea = event.target as HTMLInputElement;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      if (start !== null && end !== null) {
        const newValue = textarea.value.substring(0, start) + '\n' + textarea.value.substring(end);
        textarea.value = newValue;
        textarea.selectionStart = textarea.selectionEnd = start + 1;
        setEditText(newValue);
      }
    }
  };

  return (
    <List sx={{width: '100%', bgcolor: 'background.paper'}}>
      {comments.map((comment) => (
        <ListItem key={comment._id}>
          <ListItemAvatar>
            <Avatar className='w-16 h-16' alt='Profile picture' src='/profile.webp' />
          </ListItemAvatar>
          {editingCommentId === comment._id ? (
            <>
              <TextField
                inputRef={inputRef}
                fullWidth
                multiline
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                disabled={isEditingComment}
                onKeyDown={handleKeyDown}
              />
              <div className='flex flex-col ml-2 justify-center items-center gap-1'>
                <Button
                  className='w-24 bg-green-600 hover:bg-green-500'
                  variant='contained'
                  onClick={() => handleSaveEdit(comment._id)}
                  disabled={isEditingComment}
                >
                  {isEditingComment ? <CircularProgress size={24} /> : 'Guardar'}
                </Button>
                <Button
                  className='w-24'
                  variant='contained'
                  onClick={() => setEditingCommentId(null)}
                  disabled={isEditingComment}
                >
                  Cancelar
                </Button>
              </div>
            </>
          ) : (
            <>
              <ListItemText
                primary={comment.user}
                secondary={
                  <>
                    <Typography
                      className='font-bold text-lg mb-2 text-slate-600'
                      component='span'
                      variant='body2'
                      sx={{display: 'flex', flexDirection: 'column'}}
                    >
                      {comment.text}
                    </Typography>
                    <Typography className='font-light' component='span' variant='body2' color='text.secondary' sx={{mt: 1}}>
                      {comment.date}
                    </Typography>
                  </>
                }
              />
              {comment.userId === session.user.id && (
                <>
                  <IconButton onClick={() => handleEditClick(comment)} disabled={isEditingComment || isDeletingComment}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClick(comment._id)} disabled={isEditingComment || isDeletingComment}>
                    {isDeletingComment ? <CircularProgress size={24} /> : <DeleteIcon />}
                  </IconButton>
                </>
              )}
            </>
          )}
        </ListItem>
      ))}
    </List>
  );
};
