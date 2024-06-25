import { GetServerSideProps } from "next";
import axios from "axios";
import { useEffect } from "react";

const RedirectPage = ({ website }: { website: string }) => {
 // This component does not need to render anything
  useEffect(() => {
    //@ts-ignore
    window.location = website;
  }, []);
  return <p>redirecting......</p>
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  //@ts-ignore
  const { shortcode } = context.params;

  try {
    const response = await axios.get(
      `https://url-shortener-959j.onrender.com/url/${shortcode}`
    );
    const website = response.data;

    // return {
    //   redirect: {
    //     destination: response.data,
    //     permanent: true,
    //   },
    // };
    return { props: { website } };
  } catch (error) {
    console.log("there is an error");
    // Handle the error (e.g., URL not found)
    return {
      notFound: true,
    };
  }
};

export default RedirectPage;
