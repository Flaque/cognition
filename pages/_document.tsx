import Document, {
  Head,
  Main,
  NextScript,
  NextDocumentContext
} from "next/document";
import { extractStyles } from "evergreen-ui";

interface Props {
  css: string;
  hydrationScript: JSX.Element;
}

export default class CognitionDev extends Document<Props> {
  static getInitialProps({ renderPage }: NextDocumentContext) {
    const page = renderPage();
    const extractedStyles = extractStyles();
    const { css, hydrationScript } = extractedStyles;
    return { ...page, css, hydrationScript };
  }

  render() {
    const { css, hydrationScript } = this.props;
    return (
      <html>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <style dangerouslySetInnerHTML={{ __html: css }} />
          <style>
            {`
              body {
                margin: 0;
              }
            `}
          </style>
          {hydrationScript}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
