document.addEventListener("DOMContentLoaded", function () {
  let currentIsMobile = window.innerWidth < 431;
  let tooltipInstances = [];

  function destroyTooltips() {
    tooltipInstances.forEach((group) => {
      group.forEach((instance) => instance.destroy());
    });
    tooltipInstances = [];
  }

  function createTooltips() {
    const isMobile = window.innerWidth < 431;
    const isTelescop = document.body.classList.contains("telescop");
    const isWideScreen = window.innerWidth > 769;

    const useCustomOffset = isTelescop && isWideScreen;
    const firstSecondOffset = useCustomOffset ? [8, -8] : [-12, -8];

    const thirdTooltipOffset = isMobile ? [-12, -8] : [12, -18];

    const first = tippy("#firstInfoTooltip", {
      content:
        '<div class="custom-tooltip explanation-text-m">Прирост стоимости пая за период с даты формирования фонда, деленный на расчетную стоимость пая на начало периода, умноженный на 100.</div>',
      allowHTML: true,
      interactive: false,
      placement: "bottom-end",

      touch: true,
      offset: firstSecondOffset,
    });

    const second = tippy("#secondInfoTooltip", {
      content:
        '<div class="custom-tooltip explanation-text-m">Доходность, % = (Расчетная стоимость пая на Дату обновления - Расчетная стоимость пая на Декабрь предыдущего года) / Расчетная стоимость пая на Декабрь предыдущего года * 100%</div>',
      allowHTML: true,
      interactive: false,
      placement: "bottom-start",

      touch: true,
      offset: firstSecondOffset,
    });

    const third = tippy("#thirdInfoTooltip", {
      content:
        '<div class="custom-tooltip explanation-text-m">С марта 2025 года валюта, в которой определяется стоимость чистых активов ИПИФК «Телескоп А», была изменена с доллара США на Российский рубль. Представленные данные стоимости пая до марта 2025 года (и соответствующие им доходности) пересчитаны, исходя из курса ЦБ РФ на дату расчета СЧА.</div>',
      allowHTML: true,
      interactive: false,
      placement: "bottom-start",
      touch: true,
      offset: thirdTooltipOffset,
    });

    const fourth = tippy("#fourthInfoTooltip", {
      content:
        '<div class="custom-tooltip explanation-text-m">Доходность, в % годовых = (Прирост стоимости пая % + 1) <img src="images/formula.svg"/> -1</div>',
      allowHTML: true,
      interactive: false,
      placement: "bottom-start",

      touch: true,
      offset: firstSecondOffset,
    });

    tooltipInstances.push(first, second, third, fourth);
  }

  createTooltips();

  window.addEventListener("resize", () => {
    const isMobile = window.innerWidth < 431;
    if (isMobile !== currentIsMobile) {
      currentIsMobile = isMobile;
      destroyTooltips();
      createTooltips();
    }
  });
});
