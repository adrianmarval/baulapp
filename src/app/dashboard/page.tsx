import Image from 'next/image';

const DashboardPage = () => {
  return (
    <div className='flex justify-center items-center'>
      <Image src={'/chavez-seeklogo.svg'} alt={''} width={765} height={990} />
    </div>
  );
};

export default DashboardPage;
