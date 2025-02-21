import "./style.css";

import { v4 as uuidv4 } from "uuid";
import { defaultKanban, todoList } from "./mock";
import { Todo, TodoList } from "./type";
import { createGlobalStyle } from "styled-components";

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
  }

  // 카테고리받고 거기에 맞는 돔을 만들어 반환
  addTodo(category: string) {
    // console.log('category: ', category);
    const $list = document.createElement("section");
    $list.classList.add("todo");
    $list.setAttribute("id", "add-item");

    const template = `
    <div class="todo-item add-item">
      <div>
        <div class="item-header">
          <div class="item-title">
            <span class="item-title-icon"></span>
            <div class="title add-title" contenteditable>제목</div>
          </div>
        </div>
        <div class="todo-content add-content" contenteditable>내용</div>
      </div>
      <div class="todo-control">
        <button class="cancel">Cancel</button>
        <button class="add">Add Item</button>
      </div>
    </div>
    `;

    $list.innerHTML = template;

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

  removeList(selectedId: string) {
    this.list = this.list.filter((list) => list.id !== selectedId);
    this.render();
  }

  generateList({ id, title, list }: TodoList) {
    const $list = document.createElement("section");
    $list.classList.add("board");

    const addButtonElement = `
      <section class="todo">
        <button class="todo-item add" id="add-todo-${title}">
          <span class="plus-btn blue"></span>
        </button>
      </section>`;

    const listHTML = list
      ?.map(({ id: todoId, content, tags }) => {
        return `
        <section class="todo" id="${title}+${todoId}">
          <div class="todo-item">
            <div class="wrapper">
              <div class="item-header">
                <div class="item-title">
                  <span class="item-title-icon"></span>
                  <div class="title">${content ? content.title : ""}</div>
                </div>
              <div class="todo-control">
                <button class="delete-item" id="delete-todo-${todoId}">
                  <span class="delete-btn"></span>
                </button>
              </div>
              </div>

              <div class="todo-content">${content ? content.body : ""}</div>
            </div>

            <div class="tags">
              ${
                tags &&
                tags
                  .map(({ id: tagId, content }) => {
                    return `
                    <span class="tag" id="tag-${todoId}">
                      ${content}
                      <button class="delete-tag delete-btn" id="todo-delete-${tagId}"></button>
                    </span>`;
                  })
                  .join("")
              }

              <div class="tag add-tag-btn" >
                <span contentEditable>태그</span>
                <button class="add-btn" id="todo-${todoId}"></button>
              </div>

            </div>
          </div>
        </section>
        `;
      })
      .join("");

    const $item = `
      <section class="board-title">
        <div class="board-header">
          <div class="total"><span id="todo-count">${
            list?.length ?? 0
          }</span></div>
          <h2 class="title">${title}</h2>
        </div>

        <div class="board-control">
          <button class='kanban-delete' id="kanban-${id}"><span class="delete-btn"></span></button>
        </div>
      </section>

      <div class="wrapper">
        ${addButtonElement}
        ${list?.length ? listHTML : ""}
      </div>`;

    $list.innerHTML = $item;
    return $list;
  }
}

new KanbanApp(defaultKanban);
