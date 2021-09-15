import Head from 'next/head';
import Banner from '../components/Banner';
import Header from '../components/Header';
import ExploreCard from '../components/ExploreCard';

export default function Home({ exploreData }) {
  const renderExploreData = exploreData.map(({ img, location, distance }) => {
    return <ExploreCard key={location} img={img} location={location} distance={distance} />;
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
            {renderExploreData}
          </div>
        </section>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const response = await fetch('https://links.papareact.com/pyp');
  const exploreData = await response.json();

  return {
    props: {
      exploreData,
    },
  };
}
