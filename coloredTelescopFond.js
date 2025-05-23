document.addEventListener("DOMContentLoaded", function () {
  const rowsToColor = document.querySelectorAll(".colored");

  rowsToColor.forEach((row) => {
    row.querySelectorAll(".percent-value").forEach((cell) => {
      const value = cell.textContent.trim();
      if (value.startsWith("-")) {
        cell.style.color = "#FF2E5B";
      } else {
        cell.style.color = "#40FFB3";
      }
    });
  });
});
