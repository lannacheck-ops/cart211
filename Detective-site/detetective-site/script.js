// FOLDER PAGE CODE
const folder = document.getElementById("folder");
const openFolder = document.getElementById("open-folder");

if (folder && openFolder) {
    folder.addEventListener("click", () => {
        folder.style.display = "none";
        openFolder.classList.remove("hidden");
    });

    const startBtn = document.getElementById("start-btn");

    if (startBtn) {
        startBtn.addEventListener("click", () => {
            window.location.href = "agreement.html";
        });
    }
}

// CORKBOARD PAGE CODE
const svg = document.querySelector(".connections");
const notes = document.querySelectorAll(".note");
let connectionCount = 0; // Count successful connections
let proceedButton = null;

if (svg && notes.length > 0) {
    let firstSelected = null;

    notes.forEach((note) => {
        note.addEventListener("click", () => {
            if (!firstSelected) {
                firstSelected = note;
                note.classList.add("active");
            } else if (firstSelected === note) {
                firstSelected.classList.remove("active");
                firstSelected = null;
            } else {
                const line = document.createElementNS("http://www.w3.org/2000/svg", "line");

                const rect1 = firstSelected.getBoundingClientRect();
                const rect2 = note.getBoundingClientRect();
                const boardRect = document.querySelector(".board").getBoundingClientRect();

                const x1 = rect1.left + rect1.width / 2 - boardRect.left;
                const y1 = rect1.top + rect1.height / 2 - boardRect.top;
                const x2 = rect2.left + rect2.width / 2 - boardRect.left;
                const y2 = rect2.top + rect2.height / 2 - boardRect.top;

                line.setAttribute("x1", x1);
                line.setAttribute("y1", y1);
                line.setAttribute("x2", x2);
                line.setAttribute("y2", y2);
                line.classList.add("connection-line");

                // click to delete
                line.addEventListener("click", (e) => {
                    e.stopPropagation();
                    line.remove();
                    connectionCount--;
                    checkConnections();
                });

                svg.appendChild(line);
                connectionCount++;

                firstSelected.classList.remove("active");
                firstSelected = null;

                checkConnections();
            }
        });
    });
}

// ✅ Check if all notes are connected
function checkConnections() {
    const needed = notes.length - 1; // For 7 notes → 6 connections minimum

    if (connectionCount >= needed) {
        showProceedButton();
    }
}

// ✅ Create and show the button
function showProceedButton() {
    if (proceedButton) return;

    proceedButton = document.createElement("button");
    proceedButton.id = "proceed-corkboard";
    proceedButton.textContent = "Proceed Investigation";

    proceedButton.style.position = "fixed";
    proceedButton.style.bottom = "20px";
    proceedButton.style.right = "20px";
    proceedButton.style.padding = "15px 20px";
    proceedButton.style.background = "red";
    proceedButton.style.color = "white";
    proceedButton.style.border = "none";
    proceedButton.style.cursor = "pointer";
    proceedButton.style.fontSize = "18px";
    proceedButton.style.borderRadius = "6px";
    proceedButton.style.zIndex = "9999";

    document.body.appendChild(proceedButton);

    proceedButton.addEventListener("click", () => {
        window.location.href = "board-report.html";
    });
}

// CORKBOARD REPORT PAGE 
const proceedBtnBoard = document.getElementById("proceed-board-report")

if (proceedBtnBoard) {
    proceedBtnBoard.addEventListener("click", () => {
        window.location.href = "final-report.html";
    });
}

// AGREEMENT PAGE CODE
const agreement = document.getElementById("agreement");
const TAC = document.getElementById("TAC");

if (agreement && TAC) {
    agreement.addEventListener("click", () => {
        agreement.style.display = "none";
        TAC.classList.remove("hidden");
    });
}

// EUPHEMISM INTERACTION CODE (only runs on agreement page)
const euphemisms = document.querySelectorAll(".euphemisms");

if (euphemisms.length > 0) {
    // Create proceed button
    const proceedBtn = document.createElement("button");
    proceedBtn.id = "proceed-btn";
    proceedBtn.textContent = "Proceed Investigation";

    // Find paper container
    const tacPaper = document.querySelector(".TAC-paper");

    if (tacPaper) {
        tacPaper.appendChild(proceedBtn);
    }

    let clickedCount = 0;

    euphemisms.forEach((word) => {
        word.addEventListener("click", () => {
            if (!word.classList.contains("clicked")) {
                word.classList.add("clicked");
                clickedCount++;

                // When all euphemisms are revealed
                if (clickedCount === euphemisms.length) {
                    proceedBtn.classList.add("show");
                }
            }
        });
    });

    // (Optional) Add click to button to go to next page
    proceedBtn.addEventListener("click", () => {
        window.location.href = "agreement-report.html"; // change to your real page
    });
}

// AGREEMENT PAGE REVIEW
const proceedBtnAgreement = document.getElementById("proceed-agreement");

if (proceedBtnAgreement) {
    proceedBtnAgreement.addEventListener("click", () => {
        window.location.href = "data.html";
    });
}
// DATA PAGE DRAG + DROP (TEXT FLOAT VERSION)
const dataPage = document.getElementById("data-page");

if (dataPage) {
    const icons = document.querySelectorAll(".draggable-icon");
    const machine = document.getElementById("machine");
    const gasGrid = document.getElementById("gas-grid");
    const proceedBtn2 = document.getElementById("proceed-btn2");

    let droppedCount = 0;
    let totalIcons = icons.length;

    const gasText = {
        photos: "GPS location of photo taken",
        phone: "Call length",
        pizza: "Restaurant location",
        cart: "Christmas shopping"
    };

    let dragged = null;

    icons.forEach(icon => {
        icon.draggable = true;

        icon.addEventListener("dragstart", e => {
            dragged = e.target;
            e.dataTransfer.setData("text/plain", e.target.dataset.type);
        });
    });

    machine.addEventListener("dragover", e => e.preventDefault());

    machine.addEventListener("drop", e => {
        e.preventDefault();

        const type = dragged.dataset.type;

        dragged.style.display = "none";
        droppedCount++;

        // CREATE FLOATING LABEL BUBBLE
        const item = document.createElement("div");
        item.classList.add("gas-item");

        const label = document.createElement("div");
        label.classList.add("gas-label");
        label.textContent = gasText[type];

        item.appendChild(label);
        gasGrid.appendChild(item);

        // ✅ SHOW BUTTON ONLY WHEN ALL ICONS DROPPED
        if (droppedCount === totalIcons) {
            proceedBtn2.classList.remove("hidden");
        }
    });
    // Proceed button → new page
    proceedBtn2.addEventListener("click", () => {
        window.location.href = "data-report.html";
    });
}

const proceedBtnData = document.getElementById("proceed-data")

if (proceedBtnData) {
    proceedBtnData.addEventListener("click", () => {
        window.location.href = "user.html";
    });
}

// USER PAGE IMAGES
let imgs = document.querySelectorAll(".cover-img");
let wrapper = document.getElementById("wrapper");
if (wrapper && imgs) {
    // Random scatter positions
    imgs.forEach(img => {
        img.style.left = Math.random() * (window.innerWidth - 830) + "px";
        img.style.top = Math.random() * (window.innerHeight - 500) + "px";

        img.addEventListener("click", () => {
            img.style.display = "none";
        });
    });

    // (Optional) Button action
    document.getElementById("proceed-user-btn").addEventListener("click", () => {
        window.location.href = "user-report.html";
    });
}
// USER PAGE REPORT
const proceedBtnUser = document.getElementById("proceed-user-report")

if (proceedBtnUser) {
    proceedBtnUser.addEventListener("click", () => {
        window.location.href = "board.html";
    });
}
// FINAL REPORT PAGE CODE
const folderReport = document.getElementById("folder-report");
const openFolderReport = document.getElementById("open-folder-report");
console.log("JS loaded");
console.log(folderReport);
if (folderReport && openFolderReport) {
    folderReport.addEventListener("click", () => {
        folderReport.style.display = "none";
        openFolderReport.classList.remove("hidden");
    });
}
const finishBtn = document.getElementById("finish-btn");

if (finishBtn) {
    finishBtn.addEventListener("click", () => {
        window.location.href = "index.html";
    });
}