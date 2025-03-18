document.addEventListener("DOMContentLoaded", function () {
  const navigation = Array.from(document.querySelectorAll(".navigation"));
  const triggers = navigation.map((item) => item.querySelector(".trigger"));

  triggers.forEach((item, i) => {
    if (!item) return;
    // проходимся по каждому тригеру
    item.addEventListener("click", (e) => {
      // ставим на него слушатель события клика
      navigation[i].classList.toggle("active");
    });
  });
});
