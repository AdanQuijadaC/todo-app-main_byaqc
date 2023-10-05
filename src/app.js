//******* DOM elements ********//
const todoHeader = document.getElementById("todo_header");
const inputNew = document.getElementById("input_new");
const todoList = document.getElementById("todo_list");
const showAll = document.querySelector('[data-button="all"]');
const showActive = document.querySelector('[data-button="active"]');
const showCompleted = document.querySelector('[data-button="completed"]');
const items_count = document.querySelectorAll('[data-count="items_left"]');
const footerList = document.querySelectorAll('[data-value="footer_content"]');
const footerValue = document.querySelector('[data-value="footer_list"]');
//******* Operations ********//
let all_logical = true; // default
let active_logical = false;
let completed_logical = false;
let itemsArray = [];
let itemsValues = {};
let allAcc = 0;
let activeAcc = 0;
let completedAcc = 0;
let idGenerator = 0;

//******* Local Storage Fetch ********//
if (
  localStorage.getItem("todo") !== null &&
  localStorage.getItem("itemsValues") !== null &&
  JSON.parse(localStorage.getItem("todo")).length !== 0
) {
  itemsArray = JSON.parse(localStorage.getItem("todo"));
  itemsArray.forEach((item) => {
    createTodoItem(item.id, item.content);
    idGenerator = item.id;
    if (item.hasOwnProperty("complete")) {
      const target_uncheck = "[data-uncheck='" + item.id + "']";
      const target_item = `item${item.id}`;
      const target_check = "[data-checked='" + item.id + "']";
      const target_checkImg = "[data-img='" + item.id + "']";
      const target_paragraph = "[data-paragraph='" + item.id + "']";
      const checkElement = document.querySelector(target_check);
      const checkImg = document.querySelector(target_checkImg);
      const paragraph = document.querySelector(target_paragraph);
      const mainElement = document.getElementById(target_item);
      const uncheckElement = document.querySelector(target_uncheck);
      mainElement.classList.add("completed");
      mainElement.classList.remove("active");
      uncheckElement.classList.add("hidden");
      checkElement.classList.remove("hidden");
      checkElement.classList.add("flex");
      checkImg.classList.remove("hidden");
      paragraph.classList.add("line-through");
      paragraph.classList.add("opacity-50");
    }
  });

  itemsValues = JSON.parse(localStorage.getItem("itemsValues"));
  allAcc = itemsValues.allValue;
  activeAcc = itemsValues.activeValue;
  completedAcc = itemsValues.completedValue;

  footerList.forEach((item) => {
    item.classList.remove("hidden");
    item.classList.remove("lg:hidden");
  });
  footerValue.classList.remove("hidden");

  if (all_logical) {
    items_count.forEach((item) => {
      item.textContent = allAcc;
    });
  } else if (active_logical) {
    items_count.forEach((item) => {
      item.textContent = activeAcc;
    });
  } else if (completed_logical) {
    items_count.forEach((item) => {
      item.textContent = completedAcc;
    });
  }
  idGenerator++;
} else {
  allAcc = 0;
  activeAcc = 0;
  completedAcc = 0;
  idGenerator = 0;
}

//******* Functions ********//
function createTodoItem(id, inputValue) {
  // Elements
  const fragment = document.createDocumentFragment();
  const divOne = document.createElement("div");
  const divTwo = document.createElement("div");
  const divThree = document.createElement("div");
  const divFour = document.createElement("div");
  const divFive = document.createElement("div");
  const labOne = document.createElement("label");
  const imgOne = document.createElement("img");
  const parOne = document.createElement("p");
  const figOne = document.createElement("figure");
  const imgTwo = document.createElement("img");

  // Settings
  divOne.setAttribute(
    "class",
    "flex items-center flex-wrap overflow-hidden gap-2 justify-between p-5 border-b border-[--line-one] all active"
  );
  divOne.setAttribute("id", `item${id}`);
  divTwo.setAttribute("class", "items-center flex gap-4");
  divThree.setAttribute("class", "flex");
  divFour.setAttribute(
    "class",
    "w-[1.5rem] h-[1.5rem] border-[1px] border-[--Text-two] rounded-[50%] cursor-pointer hover:border-[--Text-three]"
  );
  divFour.setAttribute("data-uncheck", id);
  divFive.setAttribute(
    "class",
    "hidden bg-gradient-to-b from-[#57ddff] to-[#c058f3] rounded-[50%] w-[1.5rem] h-[1.5rem] justify-center items-center cursor-pointer"
  );
  divFive.setAttribute("data-checked", id);
  labOne.setAttribute("for", `radio${id}`);
  imgOne.setAttribute("class", "w-[50%]");
  imgOne.setAttribute("src", "../images/icon-check.svg");
  imgOne.setAttribute("data-img", id);
  parOne.setAttribute(
    "class",
    "text-[--Text-three] overflow-hidden  cursor-pointer"
  );
  parOne.setAttribute("data-paragraph", id);
  parOne.textContent = inputValue;
  imgTwo.setAttribute("class", "cursor-pointer min-w-[18px] h-[18px]");
  imgTwo.setAttribute("src", "../images/icon-cross.svg");
  imgTwo.setAttribute("data-close", id);

  // Adding
  labOne.appendChild(divFour);
  labOne.appendChild(divFive);
  divFive.appendChild(imgOne);
  divThree.appendChild(labOne);
  divTwo.appendChild(divThree);
  divTwo.appendChild(parOne);
  figOne.appendChild(imgTwo);
  divOne.appendChild(divTwo);
  divOne.appendChild(figOne);
  fragment.appendChild(divOne);
  todoList.prepend(fragment);
}

//******* Events ********//
document.addEventListener("click", (e) => {
  e.stopPropagation();
  if (e.target.dataset.uncheck) {
    const element = e.target;
    const id_uncheck = parseInt(e.target.dataset.uncheck);
    const target_item = `item${id_uncheck}`;
    const target_check = "[data-checked='" + id_uncheck + "']";
    const target_checkImg = "[data-img='" + id_uncheck + "']";
    const target_paragraph = "[data-paragraph='" + id_uncheck + "']";
    const checkElement = document.querySelector(target_check);
    const checkImg = document.querySelector(target_checkImg);
    const paragraph = document.querySelector(target_paragraph);
    const mainElement = document.getElementById(target_item);
    mainElement.classList.add("completed");
    mainElement.classList.remove("active");
    element.classList.add("hidden");
    checkElement.classList.remove("hidden");
    checkElement.classList.add("flex");
    checkImg.classList.remove("hidden");
    paragraph.classList.add("line-through");
    paragraph.classList.add("opacity-50");

    // Settings
    const all = todoList.querySelectorAll(".all");
    const active = todoList.querySelectorAll(".active");
    const completed = todoList.querySelectorAll(".completed");
    const count_all = all.length;
    const count_active = active.length;
    const items_completed = completed.length;

    activeAcc = count_active;
    completedAcc = items_completed;

    const index = itemsArray.findIndex((item) => {
      return item.id === id_uncheck;
    });

    itemsValues = {
      allValue: count_all,
      activeValue: count_active,
      completedValue: items_completed,
    };

    if (all_logical) {
      items_count.forEach((item) => {
        item.textContent = allAcc;
      });
    } else if (active_logical) {
      items_count.forEach((item) => {
        item.textContent = activeAcc;
      });
    } else if (completed_logical) {
      items_count.forEach((item) => {
        item.textContent = completedAcc;
      });
    }
    itemsArray[index].complete = true;

    localStorage.setItem("todo", JSON.stringify(itemsArray));
    localStorage.setItem("itemsValues", JSON.stringify(itemsValues));
  }

  if (e.target.dataset.close) {
    const id_close = parseInt(e.target.dataset.close);
    const target_item = `item${id_close}`;
    document.getElementById(target_item).remove();
    const items = todoList.querySelectorAll(".all");
    const active = todoList.querySelectorAll(".active");
    const completed = todoList.querySelectorAll(".completed");
    let count_items = items.length;
    let count_active = active.length;
    let count_completed = completed.length;
    allAcc = count_items;
    activeAcc = count_active;
    completedAcc = count_completed;

    itemsValues = {
      allValue: count_items,
      activeValue: count_active,
      completedValue: count_completed,
    };

    const index = itemsArray.findIndex((item) => {
      return item.id === id_close;
    });

    if (all_logical) {
      items_count.forEach((item) => {
        item.textContent = allAcc;
      });
    } else if (active_logical) {
      items_count.forEach((item) => {
        item.textContent = activeAcc;
      });
    } else if (completed_logical) {
      items_count.forEach((item) => {
        item.textContent = completedAcc;
      });
    }

    if (allAcc === 0) {
      footerList.forEach((item) => {
        item.classList.add("hidden");
        item.classList.add("lg:hidden");
      });
      footerValue.classList.add("hidden");
    }

    itemsArray.splice(index, 1);

    localStorage.setItem("todo", JSON.stringify(itemsArray));
    localStorage.setItem("itemsValues", JSON.stringify(itemsValues));
  }

  if (e.target.dataset.action) {
    const items = todoList.querySelectorAll(".completed");
    items.forEach((item) => {
      item.remove();
    });
    const all = todoList.querySelectorAll(".all");
    const active = todoList.querySelectorAll(".active");
    let count_items = all.length;
    let count_active = active.length;

    allAcc = count_items;
    activeAcc = count_active;
    completedAcc = 0;

    itemsValues = {
      allValue: count_items,
      activeValue: count_active,
      completedValue: 0,
    };

    if (count_items === 0) {
      footerList.forEach((item) => {
        item.classList.add("hidden");
        item.classList.add("lg:hidden");
      });
      footerValue.classList.add("hidden");
    }

    if (all_logical) {
      items_count.forEach((item) => {
        item.textContent = allAcc;
      });
    } else if (active_logical) {
      items_count.forEach((item) => {
        item.textContent = activeAcc;
      });
    } else if (completed_logical) {
      items_count.forEach((item) => {
        item.textContent = completedAcc;
      });
    }

    const filtred = itemsArray.filter((item) => {
      return item.complete !== true;
    });

    localStorage.setItem("todo", JSON.stringify(filtred));
    localStorage.setItem("itemsValues", JSON.stringify(itemsValues));
  }
});

Sortable.create(todoList, {
  filter: "[data-value='footer_list']",
});

inputNew.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const TODO = inputNew.value.trim();
    if (TODO !== "" && allAcc < 7) {
      createTodoItem(idGenerator, TODO);
      const todo = {
        id: idGenerator,
        content: TODO,
      };
      itemsArray.push(todo);

      const items = todoList.querySelectorAll(".all");
      const active = todoList.querySelectorAll(".active");

      const completed = todoList.querySelectorAll(".completed");
      let count_items = items.length;
      let count_active = active.length;
      let count_completed = completed.length;

      allAcc = count_items;
      activeAcc = count_active;
      itemsValues = {
        allValue: count_items,
        activeValue: count_active,
        completedValue: count_completed,
      };

      localStorage.setItem("itemsValues", JSON.stringify(itemsValues));
      localStorage.setItem("todo", JSON.stringify(itemsArray));

      inputNew.value = "";

      if (all_logical) {
        items_count.forEach((item) => {
          item.textContent = allAcc;
        });
      } else if (active_logical) {
        items_count.forEach((item) => {
          item.textContent = activeAcc;
        });
      } else if (completed_logical) {
        items_count.forEach((item) => {
          item.textContent = completedAcc;
        });
      }

      footerList.forEach((item) => {
        item.classList.remove("hidden");
        item.classList.remove("lg:hidden");
      });
      footerValue.classList.remove("hidden");

      if (document.querySelector('[data-temporal="error"]')) {
        document.querySelector('[data-temporal="error"]').remove();
      }

      idGenerator++;
    } else {
      if (!document.querySelector('[data-temporal="error"]')) {
        const fragment = document.createDocumentFragment();
        const divOne = document.createElement("div");
        const parOne = document.createElement("p");
        divOne.setAttribute("class", "absolute top-[44px] left-[3.8rem]");
        divOne.setAttribute("data-temporal", "error");
        parOne.setAttribute("class", "text-red-600 text-sm animate-bounce");
        parOne.textContent = "Limit reach!";
        divOne.appendChild(parOne);
        fragment.appendChild(divOne);
        todoHeader.appendChild(fragment);
      }
    }
  }
});

showAll.addEventListener("click", () => {
  showAll.className = "cursor-pointer text-[--Text-one]";
  showActive.className =
    "cursor-pointer text-[--Text-two] hover:text-[--Text-three]";
  showCompleted.className =
    "cursor-pointer text-[--Text-two] hover:text-[--Text-three]";

  // Sets
  items_count.forEach((item) => {
    item.textContent = allAcc;
  });

  all_logical = true;
  active_logical = false;
  completed_logical = false;
});

showActive.addEventListener("click", () => {
  showAll.className =
    "cursor-pointer text-[--Text-two] hover:text-[--Text-three]";
  showActive.className = "cursor-pointer text-[--Text-one]";
  showCompleted.className =
    "cursor-pointer text-[--Text-two] hover:text-[--Text-three]";

  // Sets
  items_count.forEach((item) => {
    item.textContent = activeAcc;
  });

  all_logical = false;
  active_logical = true;
  completed_logical = false;
});

showCompleted.addEventListener("click", () => {
  showAll.className =
    "cursor-pointer text-[--Text-two] hover:text-[--Text-three]";
  showActive.className =
    "cursor-pointer text-[--Text-two] hover:text-[--Text-three]";
  showCompleted.className = "cursor-pointer text-[--Text-one]";

  // Sets
  items_count.forEach((item) => {
    item.textContent = completedAcc;
  });

  all_logical = false;
  active_logical = false;
  completed_logical = true;
});
