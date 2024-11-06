// serviceWorkerRegistration.js
const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
  window.location.hostname === '[::1]' ||
  window.location.hostname.match(/^127(\.[0-9]{1,3}){3}$/)
);

export function register() {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    // Ensure that service worker is supported by the browser
    const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;  // Ensure correct path

    if (isLocalhost) {
      // If running on localhost, check if service worker exists
      checkValidServiceWorker(swUrl);
    } else {
      registerValidSW(swUrl);
    }
  }
}

function registerValidSW(swUrl) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      console.log('Service Worker registered: ', registration);
    })
    .catch((error) => {
      console.error('Service Worker registration failed: ', error);
    });
}

function checkValidServiceWorker(swUrl) {
  fetch(swUrl)
    .then((response) => {
      if (
        response.status === 404 ||
        response.type === 'error'
      ) {
        // Service worker is not available, so unregister it
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        registerValidSW(swUrl);
      }
    })
    .catch(() => {
      console.log('No internet connection found. App is running in offline mode.');
    });
}
