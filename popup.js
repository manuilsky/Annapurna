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

  // Скрываем попап сразу при загрузке, чтобы он не мигал
  if (localStorage.getItem("popupConfirmed") === "true") {
    popupOverlay.classList.add("hidden");
    return; // Прерываем выполнение дальнейших инструкций
  }

  popupOverlay.classList.remove("hidden"); // Показываем попап, если он не был подтверждён
  toggleBodyScroll(true); // Блокируем скролл

  // Подтверждение — закрываем попап и сохраняем статус в localStorage
  confirmButton.addEventListener("click", () => {
    popupOverlay.classList.add("hidden");
    localStorage.setItem("popupConfirmed", "true");
    toggleBodyScroll(false); // Разблокируем скролл
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
