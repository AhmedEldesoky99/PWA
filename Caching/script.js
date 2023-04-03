// step1 =>  Register SW

// if('serviceWorker' in navigator)
if (navigator.serviceWorker) {
  navigator.serviceWorker
    .register("/sw.js")
    .then(console.log)
    .catch(console.log);
}
