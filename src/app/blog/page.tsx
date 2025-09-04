import { Column, Heading, Meta, Schema } from "@once-ui-system/core";
import { BlogPosts } from "@/components/blog/BlogPosts";
import { baseURL, blog, person } from "@/resources";

export async function generateMetadata() {
  return Meta.generate({
    title: blog.title,
    description: blog.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(blog.title)}`,
    path: blog.path,
  });
}

// Blog post data
const blogPosts = [
  {
    title: "Linformer: Making Transformers Linear, Efficient, and Scalable",
    date: "Dec 2024",
    description: "Linformer: Making Transformers Linear, Efficient, and Scalable",
    url: "https://medium.com/@ruhaan838/linformer-making-transformers-linear-efficient-and-scalable-84f21880ea02"
  },
  {
    title: "Why We Need \"Distributed Training\" in Deep Learning? 🤔",
    date: "Dec 2024",
    description: "Data parallelism and Model parallelism",
    url: "https://ruhaan838.medium.com/why-we-need-distributed-training-in-deep-learning-bf48031c3d98"
  },
  {
    title: "Role of Positional Embedding",
    date: "Jan 2025",
    description: "Positional Embedding the real brain of the Transformers",
    url: "https://ruhaan838.medium.com/role-of-positional-embedding-dfaacf6387a5"
  }
];

export default function Blog() {
  return (
    <Column maxWidth="m" paddingTop="24">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        title={blog.title}
        description={blog.description}
        path={blog.path}
        image={`/api/og/generate?title=${encodeURIComponent(blog.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}/blog`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Heading marginBottom="l" variant="heading-strong-xl" marginLeft="24">
        Technical Blog
      </Heading>
      <Column fillWidth flex={1} gap="40">
        <BlogPosts posts={blogPosts} />
      </Column>
    </Column>
  );
}
