// step1 =>  Register SW

// if('serviceWorker' in navigator)
if (navigator.serviceWorker) {
  navigator.serviceWorker
    .register("/sw.js")
    .then(console.log)
    .catch(console.log);
}

const sendNotification = (message) => {
  let config = {
    body: message,
    icon: "https://freeiconshop.com/wp-content/uploads/edd/notification-flat.png",
  };
  let noti = new Notification("Ahmed Eldesoky", config);
  noti.addEventListener("click", (e) => console.log("notification clicked"));
};

if (Notification) {
  if (Notification.permission === "granted") {
    sendNotification("hello world 1");
  } else {
    Notification.requestPermission((permission) => {
      if (permission === "granted") {
        sendNotification("hello world 2");
      }
    });
  }
}
