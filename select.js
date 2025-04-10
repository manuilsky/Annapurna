class SelectComponent {
  constructor(selector, data) {
    this.select = document.querySelector(selector);
    this.trigger = this.select.querySelector(".ac-trigger");
    this.panel = this.select.querySelector(".ac-panel");
    this.options = this.panel.querySelectorAll(".ac-text");
    this.selectedText = this.trigger.querySelector("div");
    this.data = data;
    this.contentContainer = document.querySelector(".selected-information");

    this.setupEventListeners();
  }

  setupEventListeners() {
    this.options.forEach((option) => {
      option.addEventListener("click", () => this.handleOptionClick(option));
    });

    this.trigger.addEventListener("click", (event) =>
      this.handleTriggerClick(event),
    );
  }

  handleOptionClick(option) {
    this.selectedText.textContent = option.textContent;
    this.trigger.click();
    const preparedOption = option.textContent
      .trim()
      .replaceAll(/[\\n\\t]/gm, "");
    this.updateContent(preparedOption);
  }

  handleTriggerClick(event) {
    if (event.target === this.selectedText) {
      event.stopPropagation();
    }
  }

  updateContent(selectedOptionName) {
    const selectedData = this.data.find((item) => {
      return item.name === selectedOptionName;
    });

    if (selectedData) {
      this.contentContainer.innerHTML = "";

      selectedData.subcategories.forEach((subcategory, index) => {
        const accordionContainer = document.createElement("div");
        accordionContainer.className = `accordion-container-${index}`;

        const accordion = document.createElement("div");
        accordion.className = "ac js-enabled";
        accordion.id = `select-info-${index}`;

        const header = document.createElement("h2");
        header.className = "ac-header";

        const triggerButton = document.createElement("button");
        triggerButton.type = "button";
        triggerButton.className = "ac-trigger body-short";
        triggerButton.id = "ac-trigger-select";
        triggerButton.role = "button";
        triggerButton.setAttribute("aria-controls", `ac-panel-${index}`);
        triggerButton.setAttribute("aria-disabled", "false");
        triggerButton.setAttribute("aria-expanded", "false");

        const triggerText = document.createElement("div");
        triggerText.textContent = subcategory.name;

        triggerButton.appendChild(triggerText);
        header.appendChild(triggerButton);

        const panel = document.createElement("div");
        panel.className = "ac-panel";
        panel.id = `ac-panel-${index}`;
        panel.role = "region";
        panel.setAttribute("aria-labelledby", `ac-trigger-${index}`);
        panel.style.transitionDuration = "500ms";
        panel.style.height = "0px";

        subcategory.rows.forEach((row) => {
          const panelText = document.createElement("div");
          panelText.className = "ac-text row";

          const col10 = document.createElement("div");
          col10.className = "col-10 col-sm-12";
          const spanTitle = document.createElement("span");
          spanTitle.className = "spanTitle body-small";
          spanTitle.textContent = row.title;
          col10.appendChild(spanTitle);

          const col5Text = document.createElement("div");
          col5Text.className = "col-5 col-sm-12";

          const spanText = document.createElement("span");
          spanText.className = "spanText body-small";
          if (row.type === "text") {
            spanText.textContent = row.text_value;
          } else if (row.type === "file") {
            const fileLink = document.createElement("a");
            fileLink.href = row.file_path;
            fileLink.download =
              row.file_path.split("/")[row.file_path.split("/").length - 1];
            fileLink.textContent = row.file_name;

            const fileIcon = document.createElement("img");
            fileIcon.className = "file-icon";
            fileIcon.src = "images/file-icon.svg";

            fileLink.prepend(fileIcon);
            spanText.appendChild(fileLink);
          } else if (row.type === "link") {
            const link = document.createElement("a");
            link.href = row.text_value;
            link.textContent = row.text_value;
            spanText.appendChild(link);
          }

          col5Text.appendChild(spanText);

          const col5Date = document.createElement("div");
          col5Date.className = "col-5 col-sm-12";
          const spanDate = document.createElement("span");
          spanDate.className = "spanDate body-small";
          spanDate.textContent = row.date_status;
          col5Date.appendChild(spanDate);

          panelText.appendChild(col10);
          panelText.appendChild(col5Text);
          panelText.appendChild(col5Date);
          panel.appendChild(panelText);
        });

        accordion.appendChild(header);
        accordion.appendChild(panel);
        accordionContainer.appendChild(accordion);
        this.contentContainer.appendChild(accordionContainer);

        const acc = new Accordion(`.accordion-container-${index}`);
        index === 0 && acc.open(0);
      });
    } else {
      this.contentContainer.innerHTML = "<p>Информация не найдена.</p>";
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const mockData = [
    {
      id: 1,
      name: "Информация о компании",
      subcategories: [
        {
          id: 10,
          name: "Общая информация",
          rows: [
            {
              id: 100,
              title: "Адрес, указанный в ЕГРЮЛ",
              type: "text",
              text_value: "г. Москва, ул. Пушкина, д. Колотушкина",
              date_status: "14.03.2024",
            },
            {
              id: 101,
              title: "Телефон",
              type: "text",
              text_value: "+7(495)-123-45-67",
              date_status: "14.03.2024",
            },
            {
              id: 102,
              title:
                "Электронная скан-копия лицензии на осуществление деятельности по управлению инвестиционными фондами, паевыми инвестиционными фондами и негосударственными пенсионными фондами",
              type: "file",
              text_value: null,
              file_name: "Лицензия № 21-000-1-01017 от 15 мая 2018 года",
              file_path: "images/team-1.jpg",
              date_status: "14.05.2024 Бессрочно до внесения изменений",
              created_at: "2025-03-16 12:54:11",
              updated_at: "2025-04-03 10:51:03",
            },
            {
              id: 2,
              subcategory_id: 1,
              title: "Место нахождения",
              type: "text",
              text_value: "г. Москва",
              file_name: "",
              file_path: "",
              date_status: "06.03.2023 Без изменений",
              created_at: "2025-03-16T09:38:15.000000Z",
              updated_at: "2025-03-16T09:38:15.000000Z",
            },
            {
              id: 3,
              subcategory_id: 1,
              title: "Адрес сайта",
              type: "link",
              text_value: "www.website.ru",
              file_name: "",
              file_path: "",
              date_status: "06.03.2023 Без изменений",
              created_at: "2025-03-16T09:38:15.000000Z",
              updated_at: "2025-03-16T09:38:15.000000Z",
            },
            {
              id: 4,
              title: "Адрес, указанный в ЕГРЮЛ 22",
              type: "file",
              text_value: null,
              file_name: " VfTQivJfBO ",
              file_path: "/uploades/y7goraqZi1.txt",
              date_status: "14.05.2024 Бессрочно до внесения изменений",
              created_at: "2025-03-16T09:54:11.000000Z",
              updated_at: "2025-04-03T07:51:03.000000Z",
            },
          ],
        },
        {
          id: 11,
          name: "Финансы",
          rows: [
            {
              id: 102,
              title: "Прибыль за 2023 год",
              type: "text",
              text_value: "10000000",
              date_status: "14.03.2024",
            },
          ],
        },
      ],
    },
    {
      id: 2,
      name: "Доверительное управление",
      subcategories: [
        {
          id: 20,
          name: "Условия",
          rows: [
            {
              id: 200,
              title: "Минимальная сумма",
              type: "text",
              text_value: "500000 руб.",
              date_status: "14.03.2024",
            },
          ],
        },
      ],
    },
    {
      id: 3,
      name: "ИПИФК «Аннапурна»",
      subcategories: [
        {
          id: 30,
          name: "Описание фонда",
          rows: [
            {
              id: 300,
              title: "Тип фонда",
              type: "text",
              text_value: "Открытый",
              date_status: "14.03.2024",
            },
          ],
        },
      ],
    },
  ];

  new SelectComponent(".select", mockData);
});
