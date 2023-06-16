import { Html, Head, Main, NextScript } from 'next/document';
import styled from 'styled-components';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <Body>
        <Main />
        <NextScript />
        {process.env.NODE_ENV !== 'development' && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
              `,
            }}
          />
        )}
      </Body>
    </Html>
  );
}

const Body = styled.body`
  padding: 0;
  margin: 0;
`;
