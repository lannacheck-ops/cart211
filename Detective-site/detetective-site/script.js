const svg = document.querySelector(".connections");
const notes = document.querySelectorAll(".note");

let firstSelected = null;

notes.forEach((note) => {
    note.addEventListener("click", () => {
        if (!firstSelected) {
            // First image clicked
            firstSelected = note;
            note.classList.add("active");
        } else if (firstSelected === note) {
            // Clicked same image again -> cancel selection
            firstSelected.classList.remove("active");
            firstSelected = null;
        } else {
            // Second image clicked -> connect with line
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

            // Add CSS animation
            line.classList.add("connection-line");

            // Allow line deletion
            line.addEventListener("click", (e) => {
                e.stopPropagation(); // prevent image click
                line.remove();
            });

            svg.appendChild(line);

            // Clear selection
            firstSelected.classList.remove("active");
            firstSelected = null;
        }
    });
});