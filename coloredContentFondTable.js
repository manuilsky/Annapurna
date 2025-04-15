document.addEventListener("DOMContentLoaded", function () {
  const rowsToColor = document.querySelectorAll(".categorie");

  rowsToColor.forEach((row) => {
    row.querySelectorAll(".usd-value, .percent-value").forEach((cell) => {
      const value = cell.textContent.trim();
      if (value.startsWith("-")) {
        cell.style.color = "#FF2E5B";
      } else {
        cell.style.color = "#40FFB3";
      }
    });
  });
});
