// 🗂️ FOLDER PAGE CODE
// Folder page code
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

// 📌 CORKBOARD PAGE CODE
const svg = document.querySelector(".connections");
const notes = document.querySelectorAll(".note");

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
                });

                svg.appendChild(line);

                firstSelected.classList.remove("active");
                firstSelected = null;
            }
        });
    });
}