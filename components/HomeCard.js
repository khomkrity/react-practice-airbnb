import Image from 'next/image';

function HomeCard({ img, title }) {
  return (
    <div className='cursor-pointer hover:scale-105 transition transform duration-300 ease-out'>
      <div className='relative h-72 w-72'>
        <Image className='rounded-xl' src={img} layout='fill' />
      </div>
      <h3 className='text-2xl mt-3'>{title}</h3>
    </div>
  );
}

export default HomeCard;
