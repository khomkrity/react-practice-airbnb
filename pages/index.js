import Head from 'next/head';
import Banner from '../components/Banner';
import Header from '../components/Header';
import LocationCard from '../components/LocationCard';
import HomeCard from '../components/HomeCard';
import MoreInfoCard from '../components/MoreInfoCard';

export default function Home({ locationData, homeData, moreInfoData }) {
  const renderNearbyLocationData = locationData.map(({ img, location, distance }) => {
    return <LocationCard key={location} img={img} location={location} distance={distance} />;
  });

  const renderHomeData = homeData.map(({ img, title }) => {
    return <HomeCard key={title} img={img} title={title} />;
  });

  return (
    <div className=''>
      <Head>
        <title>Airbnb</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <Banner />
      <main className='max-w-7xl mx-auto px-8 sm:px-16'>
        <section className='pt-6'>
          <h2 className='text-4xl font-semibold pb-5'>Explore Nearby</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {renderNearbyLocationData}
          </div>
        </section>
        <section>
          <h2 className='text-4xl font-semibold py-8'>Live Anywhere</h2>
          <div className='flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3'>
            {renderHomeData}
          </div>
        </section>
        <section>
          <MoreInfoCard
            img={moreInfoData.img}
            title={moreInfoData.title}
            description={moreInfoData.description}
            buttonText={moreInfoData.buttonText}
          />
        </section>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const locationDataResponse = await fetch('https://links.papareact.com/pyp');
  const homeDataResponse = await fetch('https://links.papareact.com/zp1');
  const locationData = await locationDataResponse.json();
  const homeData = await homeDataResponse.json();

  const moreInfoData = {
    img: 'https://links.papareact.com/4cj',
    title: 'The Greatest Outdoors',
    description: 'Wishlists curated by Airbnb',
    buttonText: 'Get Inspired',
  };

  return {
    props: {
      locationData,
      homeData,
      moreInfoData,
    },
  };
}
