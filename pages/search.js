import Footer from '../components/Footer';
import Header from '../components/Header';
import InfoCard from '../components/InfoCard';
import Map from '../components/Map';
import { useRouter } from 'next/router';
import { format } from 'date-fns';

function search({ searchResult }) {
  const router = useRouter();

  const { location, startDate, endDate, numbersOfGuests } = router.query;

  const formatDate = (startDate, endDate) => {
    const start = format(new Date(startDate), 'dd MMMM yy');
    const end = format(new Date(endDate), 'dd MMMM yy');
    return `${start} - ${end}`;
  };

  const renderSearchResult = searchResult.map(
    ({ img, location, title, description, star, price, total }) => {
      return (
        <InfoCard
          key={img}
          img={img}
          location={location}
          title={title}
          description={description}
          star={star}
          price={price}
          total={total}
        />
      );
    }
  );

  return (
    <div className='h-screen'>
      <Header
        placeholder={`${location} | ${formatDate(startDate, endDate)} | ${numbersOfGuests}`}
      />

      <main className='flex'>
        <section className='flex-grow pt-14 px-6'>
          <p className='text-xs'>
            300+ Stays - {formatDate(startDate, endDate)} - for {numbersOfGuests} number of guests
          </p>
          <h1 className='text-3xl font-semibold mt-2 mb-6'>Stays in {location}</h1>
          <div className='hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap'>
            <p className='button'>Cancellation Flexibility</p>
            <p className='button'>Type of Place</p>
            <p className='button'>Price</p>
            <p className='button'>Rooms of Beds</p>
            <p className='button'>More Filters</p>
          </div>
          <div className='flex flex-col'>{renderSearchResult}</div>
        </section>
        <section className='hidden xl:inline-flex xl:min-w-[600px]'>
          <Map searchResult={searchResult} />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default search;

export async function getServerSideProps() {
  const searchResponse = await fetch('https://links.papareact.com/isz');
  const searchData = await searchResponse.json();

  return {
    props: {
      searchResult: searchData,
    },
  };
}
