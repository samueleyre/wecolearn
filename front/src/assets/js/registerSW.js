if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then( () => {

    }, (error) =>{
      console.log('error registering sevice worker');
    })
  });
}
