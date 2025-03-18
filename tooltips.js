document.addEventListener("DOMContentLoaded", function () {
  function createTooltips() {
    tippy("#firstInfoTooltip", {
      content:
        '<div class="custom-tooltip explanation-text-m">Прирост стоимости пая за период с даты формирования фонда, деленный на расчетную стоимость пая на начало периода, умноженный на 100.</div>',
      allowHTML: true,
      interactive: false,
      placement: "bottom-end",
      touch: true,
      offset: [-12, -8],
    });
    tippy("#secondInfoTooltip", {
      content:
        '<div class="custom-tooltip explanation-text-m">Доходность, в % годовых = (Прирост стоимости пая % + 1) <img src="images/formula.svg"/> -1</div>',
      allowHTML: true,
      interactive: false,
      placement: "bottom-start",
      touch: true,
      offset: [-12, -8],
    });
  }

  // Инициализация тултипов
  createTooltips();
});
