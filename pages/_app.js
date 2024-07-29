import '../globals.css'
import toast, { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux'
import configureStore from '../redux/store'
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
export const store = configureStore();
export const persistor = persistStore(store);
import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import Head from 'next/head'


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Accountable: Property Management App</title>
      </Head>

      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Toaster
            toastOptions={{
              // Define default options
              className: ' customCssToastPopup',
              duration: 5000
            }}
          />
          <Component {...pageProps} />
        </PersistGate>
      </Provider >
    </>
  )
}

export default MyApp;
