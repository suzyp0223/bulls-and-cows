import "./style.css";

import { v4 as uuidv4 } from "uuid";
import { defaultKanban } from "./mock";
import { Todo, TodoList } from "./type";
import cardTemplate from "./templates/cardTemplate";
import addListButtonTemplate from "./templates/addListButtonTemplate";
import listTemplate from "./templates/listTemplate";
import listHeaderTemplate from "./templates/listHeaderTemplate";

class KanbanApp {
  list: TodoList[];

  constructor(data: TodoList[]) {
    this.list = data;

    this.render();
    this.attachEvent();
  }

  render() {
    //kanban 만들수 있는 버튼
    const addListButton = document.createElement("button");
    addListButton.classList.add("board", "add");
    addListButton.innerHTML = `<span class="plus-btn blue"></span>`;

    const board = document.querySelector(".todo-container");

    if (board) {
      board.innerHTML = "";

      // createDocumentFragment() => 가상 DOM 컨테이너.
      // DocumentFragment를 사용하면 리플로우(Reflow)와 리페인트(Repaint)를 최소화.
      // 브라우저가 불필요한 렌더링을 줄일 수 있음.  메모리 내에서만 존재.
      // fragment를 appendChild() 또는 append()를 사용해 실제 DOM에 추가하면,
      // fragment 자체는 사라지고 내부의 요소들만 남음.
      const fragment = document.createDocumentFragment();
      const listElements = this.list.map((list) => this.generateList(list));

      fragment.append(...listElements);
      board.append(fragment, addListButton);
    }
  }

  attachEvent() {
    const $addListButton = document.querySelector(".board.add");
    const $removeListButton = document.querySelectorAll(".kanban-delete");
    const $addTodoButton = document.querySelectorAll(".todo-item.add");
    const $removeTodoButton = document.querySelectorAll(".delete-item");

    // $addListButton?.addEventListener("click", () => alert("test"));
    $addListButton?.addEventListener("click", () => {
      const newId = uuidv4();

      this.list = [
        ...this.list,
        {
          id: newId,
          title: `kanban-${newId}`,
          list: [],
        },
      ];

      this.render();
    });

    $removeListButton?.forEach((button) => {
      button?.addEventListener("click", ({ currentTarget }) => {
        const [, selectedId] = (currentTarget as HTMLButtonElement).id.split(
          "kanban-"
        );

        this.removeList(selectedId);
      });
    });

    $addTodoButton.forEach((button) => {
      button.addEventListener("click", ({ currentTarget }) => {
        if (currentTarget instanceof HTMLButtonElement) {
          const [, category] = currentTarget.id.split("add-todo-");

          // Todo 추가시 InProgress,Done에도 똑같이 추가
          // prepend - 무언가를 앞에 끼워 넣을수 있는 API. /append-뒤에
          currentTarget?.closest(".wrapper")?.prepend(this.addTodo(category));
        }
      });
    });

    $removeTodoButton.forEach((button) => {
      button.addEventListener("click", ({ currentTarget }) => {
        if (currentTarget && currentTarget instanceof HTMLButtonElement) {
          const category = currentTarget?.closest(".todo")?.id.split("+")[0];
          const [, selectedId] = currentTarget.id.split("delete-todo-");

          this.removeTodo(selectedId, category);
        }
      });
    });
  }

  // 카테고리받고 거기에 맞는 돔을 만들어 반환
  addTodo(category: string) {
    // console.log('category: ', category);
    const $list = document.createElement("section");
    $list.classList.add("todo");
    $list.setAttribute("id", "add-item");

    $list.innerHTML = cardTemplate();

    $list
      .querySelector(".add")
      ?.addEventListener("click", ({ currentTarget }) => {
        const listId = this.list.findIndex(({ title }) => title === category);

        if (currentTarget && currentTarget instanceof HTMLButtonElement) {
          const $todo = currentTarget.closest(".todo-item");
          const title = $todo?.querySelector(".add-title")?.textContent;
          const body = $todo?.querySelector(".add-content")?.textContent;

          // const newTodoId = this.list?[listId].list.length > 0 ? uuidv4() : 0;

          const newTodo: Todo = {
            id: uuidv4(),
            content: {
              title: title ?? "", // 기존에 있으면 그대로 사용하고 없으면 우항값을 사용 - 널 병합 연산자
              body: body ?? "",
            },
            isDone: false,
            category: category,
            tags: [],
          };

          const todos = [...this.list[listId].list, newTodo];
          this.list[listId].list = todos;

          this.render();
        }
      });
    return $list;
  }

  // category: string = '' 없으면 빈값으로 처리
  removeTodo(selectedId: string, category: string = "") {
    const listId = this.list.findIndex((list) => list.title === category);
    const targetList = this.list.find((list) => list.title === category);

    if (targetList) {
      this.list[listId].list = targetList.list.filter(
        (todo) => todo.id !== selectedId
      );

      this.render(); // 변경된 리스트 상태를 화면에 반영
    }
  }

  removeList(selectedId: string) {
    this.list = this.list.filter((list) => list.id !== selectedId);
    this.render();
  }

  generateList({ id, title, list }: TodoList) {
    const $list = document.createElement("section");
    $list.classList.add("board");

    const addButtonElement = addListButtonTemplate(title);

    const listHTML = list
      ?.map(({ id: todoId, content, tags }) => {
        return listTemplate({ title, todoId, content, tags });
      })
      .join("");

    const $item = `
    ${listHeaderTemplate({ list, title, id })}
    <div class="wrapper">
    ${addButtonElement}
    ${list?.length ? listHTML : ""}
    </div>`;

    $list.innerHTML = $item;
    return $list;
  }
}

new KanbanApp(defaultKanban);
