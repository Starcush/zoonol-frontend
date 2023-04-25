import { Html, Head, Main, NextScript } from 'next/document';
import styled from 'styled-components';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <Body>
        <Main />
        <NextScript />
      </Body>
    </Html>
  );
}

const Body = styled.body`
  padding: 0;
  margin: 0;
`;
