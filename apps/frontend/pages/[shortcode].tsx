import { GetServerSideProps } from 'next';
import axios from 'axios';

const RedirectPage = () => {
  return null; // This component does not need to render anything
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    //@ts-ignore
    const { shortcode } = context.params;

  try {
    const response = await axios.get(`https://url-shortener-959j.onrender.com/url/${shortcode}`);
    const { website } = response.data;

    // Redirect to the actual website
    return {
      redirect: {
        destination: website,
        permanent: false,
      },
    };
  } catch (error) {
    // Handle the error (e.g., URL not found)
    return {
      notFound: true,
    };
  }
};

export default RedirectPage;
