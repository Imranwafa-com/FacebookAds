




// let intervalId = null;
// let loopStatus = "Idle";

// function updateStatus(newStatus) {
//   loopStatus = newStatus;
//   document.getElementById("status").textContent = loopStatus;
// }

// function findAndScroll(query) {
//   chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//     chrome.tabs.sendMessage(tabs[0].id, { message: "find_scroll", text: query });
//   });
// }

// document.getElementById("findScroll").addEventListener("click", function() {
//   const userInput = document.getElementById("userInput").value;
//   intervalId = setInterval(() => {
//     updateStatus("Running");
//     findAndScroll(userInput);
//   }, 5000);
// });

// document.getElementById("stopLoop").addEventListener("click", function() {
//   clearInterval(intervalId);
//   updateStatus("Stopped");
//   chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//     chrome.tabs.sendMessage(tabs[0].id, { message: "stop_loop" });
//   });
// });

// document.getElementById("forceQuit").addEventListener("click", function() {
//   clearInterval(intervalId);
//   updateStatus("Force Quit");
//   chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//     chrome.tabs.sendMessage(tabs[0].id, { message: "force_quit" });
//   });
// });





let intervalId = null;
let loopStatus = "Idle";

function updateStatus(newStatus) {
  loopStatus = newStatus;
  document.getElementById("status").textContent = loopStatus;
}

function findAndScroll(query, limit) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { message: 'find_scroll', text: query, limit: limit }); // Pass the loop limit here
    });
  
  
  if (limit > 0) {
    limit--;
    if (limit === 0) {
      clearInterval(intervalId);
      updateStatus("Loop Completed");
    }
  }
}

document.getElementById('findScroll').addEventListener('click', function() {
    const userInput = document.getElementById('userInput').value;
    const loopLimit = parseInt(document.getElementById('loopLimit').value);
    intervalId = setInterval(() => {
      updateStatus('Running');
      findAndScroll(userInput, loopLimit);
    }, 5000);
  });
  
  
document.getElementById("stopLoop").addEventListener("click", function() {
  clearInterval(intervalId);
  updateStatus("Stopped");
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { message: "stop_loop" });
  });
});

document.getElementById("forceQuit").addEventListener("click", function() {
  clearInterval(intervalId);
  updateStatus("Force Quit");
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { message: "force_quit" });
  });
});
