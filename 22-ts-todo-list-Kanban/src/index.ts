import "./style.css";

import { v4 as uuidv4 } from "uuid";
import { defaultKanban, todoList } from "./mock";
import { TodoList } from "./type";

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

    // console.log('this.list: ', this.list);

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

    // $addListButton?.addEventListener("click", () => alert("test"));
    $addListButton?.addEventListener("click", () => {
      const newId = Number(uuidv4());

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
  }

  generateList({id, title, list}: TodoList) {
    const $list = document.createElement('section');
    $list.classList.add('board');

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
