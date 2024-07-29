import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/maskable.png"></link>
          <link
            rel="icon"
            href="logo.png"
            type="image/png"
            sizes="any"
          />
          <meta name="theme-color" content="#052757" />

        </Head>
        <body>
          <Main />
          <NextScript />

          <script
            dangerouslySetInnerHTML={{
              __html: `
               var v = document.createElement('script');
                var s = document.getElementsByTagName('script')[0];

                (function(d, t) {
                    var v = d.createElement(t), s = d.getElementsByTagName(t)[0];
                    v.onload = function() {
                      window.voiceflow.chat.load({
                        verify: { projectID: '660b2c160357b4f6d22dd19b' },
                        url: 'https://general-runtime.voiceflow.com',
                        versionID: 'production',
                                assistant: {
                                  stylesheet: "/style.css"
                                }
                      });
                    }
                    v.src = "https://cdn.voiceflow.com/widget/bundle.mjs"; v.type = "text/javascript"; s.parentNode.insertBefore(v, s);
                })(document, 'script');                               
              `,
            }}
          />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
