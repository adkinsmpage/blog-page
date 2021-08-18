import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import NavBar from "../components/NavBar/NavBar";
import Post from "../components/Post/Post";
import PostList from "../components/PostList/PostList";

export interface IPostElement {
  title: string;
  author: string;
  date: string;
  content: string;
  id: number;
}

const postsList: IPostElement[] = [
  {
    title: "First Lorem ipsum dolor sit amet, consectetur adipisicing elit",
    author: "AtrykP",
    date: new Date().toISOString(),
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore inventore blanditiis illo quasi ducimus dolorem harum, eius quibusdam soluta, pariatur nostrum porro voluptatem! Harum pariatur dolores, aut impedit officia rem? Rerum, doloribus iste est consequatur non, dolorem, enim debitis blanditiis minus optio excepturi sed itaque. Animi architecto recusandae tenetur doloremque autem commodi non quibusdam, esse maiores, beatae velit similique! Sapiente fugiat tempora quae commodi nulla libero expedita corporis dolores recusandae cum ullam pariatur temporibus, veritatis voluptatum nemo quos nisi delectus aperiam doloremque hic laudantium. Hic quisquam dolores ad explicabo doloribus unde, adipisci provident ut quas non vel quis consectetur consequuntur repellat expedita, earum in! Porro praesentium, saepe id illo autem quam iste voluptas numquam tempore tempora facere sapiente voluptates vitae sint magnam reiciendis officia architecto. Repellat obcaecati porro minus itaque, consequatur aliquid, doloremque veniam vel quo molestias laudantium illum? Voluptas accusamus, tempore nisi optio quaerat accusantium eligendi, distinctio consequuntur dolorum, illo neque iste laboriosam omnis quidem totam provident tenetur! Rerum veritatis consectetur alias. Blanditiis et facere asperiores veniam aut voluptas ipsum. Corporis ratione est",
    id: 1,
  },
  {
    title: "Second Lorem ipsum dolor sit amet",
    author: "AtrykP",
    date: new Date().toISOString(),
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore inventore blanditiis illo quasi ducimus dolorem harum, eius quibusdam soluta, pariatur nostrum porro voluptatem! Harum pariatur dolores, aut impedit officia rem? Rerum, doloribus iste est consequatur non, dolorem, enim debitis blanditiis minus optio excepturi sed itaque. Animi architecto recusandae tenetur doloremque autem commodi non quibusdam, esse maiores, beatae velit similique! Sapiente fugiat tempora quae commodi nulla libero expedita corporis dolores recusandae cum ullam pariatur temporibus, veritatis voluptatum nemo quos nisi delectus aperiam doloremque hic laudantium. Hic quisquam dolores ad explicabo doloribus unde",
    id: 2,
  },
  {
    title: " third Lorem ipsum dolor sit amet, consectetur ",
    author: "AtrykP",
    date: new Date().toISOString(),
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore inventore blanditiis illo quasi ducimus dolorem harum, eius quibusdam soluta, pariatur nostrum porro voluptatem! Harum pariatur dolores, aut impedit officia rem? Rerum, doloribus iste est consequatur non, dolorem, enim debitis blanditiis minus optio excepturi sed itaque. Animi architecto recusandae tenetur doloremque autem commodi non quibusdam, esse maiores, beatae velit similique! Sapiente fugiat tempora quae commodi nulla libero expedita corporis dolores recusandae cum ullam pariatur temporibus, veritatis voluptatum nemo quos nisi delectus aperiam doloremque hic laudantium. Hic quisquam dolores ad explicabo doloribus unde, adipisci provident ut quas non vel quis consectetur consequuntur repellat expedita, earum in! Porro praesentium, saepe id illo autem quam iste voluptas numquam tempore tempora facere sapiente voluptates vitae sint magnam reiciendis officia architecto. Repellat obcaecati porro minus itaque, consequatur aliquid, doloremque veniam",
    id: 3,
  },
];

const postsArr = postsList.map((element) => (
  <Post key={element.id} data={element} />
));

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>1MinBlog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PostList>{postsArr}</PostList>
    </>
  );
};

export default Home;
