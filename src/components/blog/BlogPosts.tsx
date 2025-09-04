'use client';

import { Card, Column, Text, Row, Heading } from "@once-ui-system/core";
import styles from "./BlogPosts.module.scss";

interface BlogPost {
  title: string;
  date: string;
  description: string;
  url: string;
}

interface BlogPostsProps {
  posts: BlogPost[];
}

export function BlogPosts({ posts }: BlogPostsProps) {
  return (
    <Column gap="24" fillWidth>
      {posts.map((post, index) => (
        <Card
          key={index}
          fillWidth
          href={post.url}

          className={styles.blogCard}
          transition="micro-medium"
          border="neutral-alpha-weak"
          background="surface"
          padding="24"
          radius="l"
        >
          <Column gap="16">
            <Row horizontal="between" vertical="center">
              <Heading as="h3" variant="heading-strong-l" className={styles.blogTitle}>
                {post.title}
              </Heading>
              <Text variant="label-default-s" className={styles.blogDate}>
                {post.date}
              </Text>
            </Row>
            <Text variant="body-default-s" className={styles.blogContent}>
              {post.description}
            </Text>
            <Row>
              <Text variant="label-default-s" className={styles.readMore}>
                Read Full Article →
              </Text>
            </Row>
          </Column>
        </Card>
      ))}
    </Column>
  );
}
