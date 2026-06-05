// const buttons = document.querySelectorAll("button");
// buttons.forEach(button => {
//     button.addEventListener("click", moveCard)
// })

// function moveCard() {
//     const card = this.closest("card")
//     if (Math.random() > .5) {
//         card.classList.add("gone", "right")
//     } else {
//         card.classList.add("gone", "left")
//     }
// }

// const cards = document.querySelectorAll("card");
// cards.forEach(card => {
//     let cursorXpostionAtDragStart  // ← fixed: was mismatched with let pointerX...
//     let cursorYpostionAtDragStart  // ← fixed: was mismatched with let pointerY...

//     card.addEventListener("pointerdown", startDragCard)
//     card.addEventListener("pointermove", dragCard)
//     card.addEventListener("pointerup", endDragCard)

//     function startDragCard(event) {  // ← fixed: event as parameter
//         card.classList.add("dragging")
//         cursorXpostionAtDragStart = event.clientX
//         cursorYpostionAtDragStart = event.clientY
//         card.style.setProperty("--delta-x", 0)
//         card.style.setProperty("--delta-y", 0)
//     }

//     function dragCard(event) {  // ← fixed: event as parameter
//         if (card.classList.contains("dragging")) {
//             let deltaX = event.clientX - cursorXpostionAtDragStart
//             let deltaY = event.clientY - cursorYpostionAtDragStart
//             card.style.setProperty("--delta-x", deltaX)
//             card.style.setProperty("--delta-y", deltaY)
//             if (deltaX > 100) {
//                 card.classList.remove("dragging")
//                 card.classList.add("gone", "right")
//             } else if (deltaX < -100) {
//                 card.classList.remove("dragging")
//                 card.classList.add("gone", "left")
//             }
//         }
//     }

//     function endDragCard() {
//         card.classList.remove("dragging")
//     }
// })