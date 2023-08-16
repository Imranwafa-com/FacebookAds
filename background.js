// let scrollingInterval;
// let scrollingEnabled = false;
// let scrollText = "";

// // chrome.action.onClicked.addListener(tab => {
// // //   if (scrollingEnabled) {
// // //     clearInterval(scrollingInterval);
// // //     scrollingEnabled = false;
// // //   } else {
// // //     scrollingEnabled = true;
// // //     scrollingInterval = setInterval(() => {
// // //       chrome.scripting.executeScript({
// // //         target: { tabId: tab.id },
// // //         function: scrollToText,
// // //         args: [scrollText],
// // //       });
// // //     }, 10000); // Wait for 10 seconds between scrolls
// // //   }
// //  console.log("clicked " + scrollText);
// // });
// // console.log("clicked " + scrollText);
// chrome.action.onClicked.addListener((tab) => {
//     console.log("Extension icon clicked");
//   });
//   console.log("Extension icon was clicked!");  
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.action === "stopScrolling") {
//     clearInterval(scrollingInterval);
//     scrollingEnabled = false;
//   } else if (message.action === "updateScrollText") {
//     scrollText = message.text;
//   }
// });

// function scrollToText(text) {
//   const elements = document.querySelectorAll(`[role="heading"][aria-level="3"]`);

//   for (const element of elements) {
//     if (element.textContent.includes(text)) {
//       const rect = element.getBoundingClientRect();
//       const targetY = rect.top + window.scrollY - window.innerHeight / 2 + rect.height / 2;

//       window.scrollTo({
//         top: targetY,
//         behavior: "smooth",
//       });

//       break; // Scroll to the first matching element
//     }
//   }
// }
chrome.runtime.onInstalled.addListener(function () {
    chrome.action.onClicked.addListener(function (tab) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: openPopup,
      });
    });
  });
  
  function openPopup() {
    chrome.scripting.executeScript({
      function: function () {
        const popup = window.open(chrome.runtime.getURL('popup.html'), 'extension_popup', 'width=300,height=400');
        window.popup = popup;
      },
    });
  }
  