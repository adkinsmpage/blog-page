import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer/Footer";
import NavBar from "../components/NavBar/NavBar";
import PostList from "../components/PostList/PostList";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>1MinBlog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <PostList>
        <h1>hello</h1>
      </PostList>
      <Footer />
    </>
  );
};

export default Home;
