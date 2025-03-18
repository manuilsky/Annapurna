class SharePriceTable {
  constructor(data, container) {
    this.data = data;
    this.container = container;
  }

  renderTables() {
    this.container.innerHTML = "";
    this.data.forEach((entry) => {
      this.container.appendChild(this.createTable(entry));
    });
  }

  createTable(entry) {
    const table = document.createElement("table");
    table.innerHTML = `
            <tr>
              <th>${entry.year}</th>
            </tr>
            <tr>
              <td>Стоимость пая, USD</td>
              <td>М/М</td>
            </tr>
            ${this.generateRows(entry)}
            <tr class="body-short">
              <td>-</td>
              <td>${entry.annual_percentage ?? "-"}</td>
            </tr>
        `;
    return table;
  }

  generateRows(entry) {
    const months = [
      "january",
      "february",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "september",
      "october",
      "november",
      "december",
    ];

    return months
      .map(
        (month) => `
            <tr>
            <td>${entry[`${month}_price`] ?? "-"}</td>
            <td ${
              entry[`${month}_change`] && entry[`${month}_change`] > 0
                ? "style='color: #40FFB2;'"
                : entry[`${month}_change`] && entry[`${month}_change`] < 0
                ? "style='color: #FF2E5B;'"
                : ""
            }>${
          entry[`${month}_change`]
            ? `${entry[`${month}_change`] > 0 ? "+" : ""}${
                entry[`${month}_change`]
              }%`
            : "-"
        }</td>
        </tr>
        `,
      )
      .join("");
  }

  scrollTable(step) {
    const maxScrollLeft =
      this.container.scrollWidth - this.container.clientWidth;
    const targetScroll = this.container.scrollLeft + step;
    this.container.scrollTo({
      left: Math.min(Math.max(targetScroll, 0), maxScrollLeft),
      behavior: "smooth",
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const data = [
    {
      id: 3,
      year: "2025",
      january_price: "0.04",
      february_price: "0.11",
      march_price: "0.11",
      april_price: null,
      may_price: null,
      june_price: null,
      july_price: null,
      august_price: null,
      september_price: null,
      october_price: "0.10",
      november_price: null,
      december_price: null,
      january_change: null,
      february_change: "0.07",
      march_change: null,
      april_change: null,
      may_change: null,
      june_change: null,
      july_change: null,
      august_change: null,
      september_change: null,
      october_change: "0.07",
      november_change: null,
      december_change: null,
      annual_percentage: null,
    },
    {
      id: 4,
      year: "2026",
      january_price: "0.05",
      february_price: "0.12",
      march_price: "0.13",
      april_price: "0.14",
      may_price: null,
      june_price: null,
      july_price: null,
      august_price: null,
      september_price: null,
      october_price: "0.11",
      november_price: null,
      december_price: null,
      january_change: null,
      february_change: "0.07",
      march_change: "0.01",
      april_change: "0.01",
      may_change: null,
      june_change: null,
      july_change: null,
      august_change: null,
      september_change: null,
      october_change: "-0.02",
      november_change: null,
      december_change: null,
      annual_percentage: "0.05",
    },
    {
      id: 5,
      year: "2027",
      january_price: "0.06",
      february_price: "0.13",
      march_price: "0.15",
      april_price: "0.16",
      may_price: "0.17",
      june_price: null,
      july_price: null,
      august_price: null,
      september_price: "0.18",
      october_price: "0.12",
      november_price: null,
      december_price: null,
      january_change: null,
      february_change: "0.07",
      march_change: "0.02",
      april_change: "0.01",
      may_change: "0.01",
      june_change: null,
      july_change: null,
      august_change: null,
      september_change: "0.01",
      october_change: "-0.06",
      november_change: null,
      december_change: null,
      annual_percentage: "0.08",
    },
    {
      id: 6,
      year: "2028",
      january_price: "0.06",
      february_price: "0.13",
      march_price: "0.15",
      april_price: "0.16",
      may_price: "0.17",
      june_price: null,
      july_price: null,
      august_price: null,
      september_price: "0.18",
      october_price: "0.12",
      november_price: null,
      december_price: null,
      january_change: null,
      february_change: "0.07",
      march_change: "0.02",
      april_change: "0.01",
      may_change: "0.01",
      june_change: null,
      july_change: null,
      august_change: null,
      september_change: "0.01",
      october_change: "-0.06",
      november_change: null,
      december_change: null,
      annual_percentage: "-0.08",
    },
  ];

  const scrollableContainer = document.querySelector(".scrollable-container");
  const sharePriceTable = new SharePriceTable(data, scrollableContainer);
  sharePriceTable.renderTables();

  const step = scrollableContainer.querySelector("table").offsetWidth;

  document
    .querySelector(".next-year")
    .addEventListener("click", () => sharePriceTable.scrollTable(step));
  document
    .querySelector(".next-year")
    .addEventListener("touch", () => sharePriceTable.scrollTable(step));
  document
    .querySelector(".prev-year")
    .addEventListener("click", () => sharePriceTable.scrollTable(-step));
  document
    .querySelector(".prev-year")
    .addEventListener("touch", () => sharePriceTable.scrollTable(-step));
});
