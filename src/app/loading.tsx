import {Spinner} from '@/components/common';

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className='flex justify-center items-center h-96'>
      <Spinner />
    </div>
  );
}
