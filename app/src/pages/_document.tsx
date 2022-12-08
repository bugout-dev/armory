import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
    return (
        <Html>
            <Head>
                <meta name="description" content="Moonstream token Armory" />
                <link rel="icon" href="/favicon.svg" />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Space+Grotesk"
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
