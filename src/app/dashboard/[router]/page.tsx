
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import {SearchBar} from '@/components/common';
import {Box} from '@mui/material';
import {getServerSession} from 'next-auth';

interface Props {
  params: {router: string};
}
const SamplicioPage = async ({params}: Props) => {
  const session = await getServerSession(authOptions);
  return (
    <Box>
      {/* Search Survey Bar */}
      <SearchBar router={params.router} session={session} />
    </Box>
  );
};

export default SamplicioPage;
