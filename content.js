
// let forceQuit = false;
// let loopActive = false;

// function findAndScroll(query) {
//   const matches = Array.from(document.body.innerText.matchAll(query));
  
//   if (matches.length > 0 && !forceQuit) {
//     const targetY = matches[0].index - 250;
//     window.scrollTo(0, targetY);
//   }
// }

// function startLoop(query) {
//   loopActive = true;
//   intervalId = setInterval(() => {
//     if (loopActive) {
//       findAndScroll(query);
//     }
//   }, 5000);
// }

// function stopLoop() {
//   loopActive = false;
//   clearInterval(intervalId);
// }

// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//   if (request.message === 'find_scroll') {
//     const textToFind = request.text;
//     forceQuit = false;
//     startLoop(textToFind);
//   } else if (request.message === 'force_quit') {
//     forceQuit = true;
//     stopLoop();
//   } else if (request.message === 'stop_loop') {
//     stopLoop();
//   }
// });
let forceQuit = false;
let loopActive = false;
let intervalId = null;
let val = 0;
let limil = 0;
let loopLimitCounter = 0;
let s = 0;
function findAndScroll(query) {
  const matches = Array.from(document.body.innerText.matchAll(query));

  if (matches.length > 0 && !forceQuit) {
    const targetY = matches[0].index - 250;

    window.scrollTo(0, targetY);
    val++;
    loopLimitCounter--;
    console.log('Ran: ' + val);
    if (val + 1 >= limil) {
      stopLoop();
      forceQuit = true;
      loopActive = false;
      sendMessageToPopup('Loop Completed');
      
    }
  }
}

function startLoop(query, limit) {
  loopActive = true;
  loopLimitCounter = limit ; // Adding 2 to account for surpassing the limit
  val = 0;
  limil = limit;
  s++;
  console.log('s count: ' + s);
  intervalId = setInterval(() => {
    if (loopActive) {
      findAndScroll(query);
    }
  }, 5000);

  sendMessageToPopup('Running');
}

function stopLoop() {
  loopActive = false;
  clearInterval(intervalId);
  sendMessageToPopup('Stopped');
}

function sendMessageToPopup(message) {
  chrome.runtime.sendMessage({ message });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === 'find_scroll') {
      const textToFind = request.text;
      const loopLimit = parseInt(request.limit);
      s = 0;
      forceQuit = false;
      startLoop(textToFind, loopLimit);
    } else if (request.message === 'force_quit') {
      forceQuit = true;
      stopLoop();
    } else if (request.message === 'stop_loop') {
      stopLoop();
    }
  });
  
  