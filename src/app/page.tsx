import { Redirect } from '@/components';
import { Flex, Heading } from '@once-ui-system/core';

export default function Home() {
  // Instead of using server-side redirect which won't work in static export,
  // we'll use a client-side redirect that will work with GitHub Pages
  return (
    <Flex fillWidth horizontal="center" padding="l" direction="column" gap="m">
      <Heading as="h1">Welcome to my portfolio</Heading>
      <Redirect to="/about" />
    </Flex>
  );
}
