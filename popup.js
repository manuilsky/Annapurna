document.addEventListener("DOMContentLoaded", () => {
  const popupOverlay = document.getElementById("popupOverlay");
  const confirmButton = document.querySelector(".button-popup");
  const closeButton = document.querySelector(".cross-icon-popup");

  // Функция блокировки и разблокировки скролла
  const toggleBodyScroll = (disable) => {
    if (disable) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  };

  // Показываем попап при каждой загрузке
  popupOverlay.classList.remove("hidden");
  toggleBodyScroll(true);

  // Подтверждение — просто закрываем попап
  confirmButton.addEventListener("click", () => {
    popupOverlay.classList.add("hidden");
    toggleBodyScroll(false);
  });

  // Закрытие по крестику — перенаправление на index2.html
  closeButton.addEventListener("click", () => {
    window.location.href = "index2.html";
  });

  // Закрытие при клике вне попапа — перенаправление на index2.html
  popupOverlay.addEventListener("click", (event) => {
    if (event.target === popupOverlay) {
      window.location.href = "index2.html";
    }
  });
});
