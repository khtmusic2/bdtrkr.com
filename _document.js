import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="bn">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <meta name="description" content="বাংলাদেশের সকল কুরিয়ার একসাথে ট্র্যাক করুন — Pathao, RedX, Paperfly, Steadfast, Sundarban এবং আরও অনেক কুরিয়ার।" />
        <meta name="keywords" content="courier tracking bangladesh, pathao tracking, redx tracking, paperfly tracking, steadfast tracking, কুরিয়ার ট্র্যাকিং" />
        <meta property="og:title" content="BD Courier Tracker — সকল কুরিয়ার ট্র্যাকিং" />
        <meta property="og:description" content="এক জায়গায় বাংলাদেশের সব কুরিয়ার ট্র্যাক করুন।" />
        <meta property="og:type" content="website" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
