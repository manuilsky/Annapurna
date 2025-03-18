document.addEventListener("DOMContentLoaded", function () {
  const rowsToColor = ["#row-1", "#row-5", "#row-8"];

  rowsToColor.forEach((rowId) => {
    const row = document.querySelector(rowId);
    if (row) {
      row.querySelectorAll(".usd-value, .percent-value").forEach((cell) => {
        const value = cell.textContent.trim();
        if (value.startsWith("-")) {
          cell.style.color = "#FF2E5B";
        } else {
          cell.style.color = "#40FFB3";
        }
      });
    }
  });
});
