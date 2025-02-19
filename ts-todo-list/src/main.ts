import "./style.css";

interface Todo {
  id: number;
  content: string;
  isDone: boolean;
}

class TodoApp {
  todoList: Todo[];

  /** @constructs TodoApp */
  constructor() {
    this.todoList = [];
    this.initEvent();
  }

  // 이벤트 붙이는 부분
  initEvent() {
    const inputEl = document.querySelector("#todo-input");

    inputEl.addEventListener("keydown", this.addTodo.bind(this));
  }

  /**
   * 할 일을 추가할 수 있다.
   * 엔터로 동작 > event등록
   * @param {string} text
   */
  addTodo(event) {
    if (event.key !== "Enter") {
      return;
    }

    const target = event.target;

    // 입력값 없을시
    if (!target.value) {
      return;
    }

    this.todoList.push({
      id: this.todoList.length + 1,
      isDone: false,
      content: target.value,
    });

    target.value = '';
    this.render(this.todoList);
  }

  /**
   *  모든 할 일을 조회할 수 있다.
   *
   * @returns {Todo[]} 전체 할일
   */
  getTodoList() {
    return this.todoList;

    // mock 데이터
    // return [
    //   {
    //     id: 0,
    //     content: "mock",
    //     isDone: false,
    //   },
    // ];
  }

  /**
   * 모든 할 일을 필터링하여 조회할 수 있다.
   *
   * @param {string} filterType
   * @returns {Todo[]} 필터링된 할일
   */
  getTodoListByFilter(filterType) {}

  /**
   * 할 일의 내용과 상태를 수정할 수 있다.
   *
   * @param {Object} todo -수정될 할일
   * @param {string} [todo.text]  -수정될 내용
   * @param {string} [todo.status]  -수정될 상태
   */
  updateTodo({ id, text, status }) {}

  /**
   * 특정 할 일을 제거할 수 있다.
   *
   * @param {number} id
   */
  removeTodo(id) {}

  generateTodoList(todoList) {
    const containerEl = document.createElement("div");
    const todoTemplate = `<div class="item__div">
    <input type='checkbox' ${todoList.isDone && "checked"} />
    <div class='content ${todoList.isDone && "checked"}' contentEditable>${
      todoList.content
    }</div>
    <button>X</button>
    </div>`;

    containerEl.classList.add("item");
    containerEl.innerHTML = todoTemplate;

    return containerEl;
  }

  render(todoList = []) {
    const todoListEl = document.querySelector(".todo-items");

    // 가상의 돔. 실질적으로 그려지지않은 상태
    const fragment = document.createDocumentFragment();
    const todoListComponent = todoList.map((todo) =>
      this.generateTodoList(todo)
    );

    fragment.append(...todoListComponent);
    todoListEl.appendChild(fragment);
  }
}

const todoApp = new TodoApp();
todoApp.render();
