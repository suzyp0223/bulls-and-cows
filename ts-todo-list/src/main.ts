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
    const controlButtonElements = document.querySelectorAll(
      "div.control > button.btn"
    );

    controlButtonElements.forEach((button) => {
      const [, buttonClass] = button.classList.value.split(" ");

      button.addEventListener("click", (event: MouseEventInit) => {
        const currentTodoList = this.getTodoListByFilter(buttonClass);

        this.toggleFilterStatus(event);
        this.render(currentTodoList);
      });
    });

    // 타입가드
    if (inputEl) {
      inputEl?.addEventListener("keydown", this.addTodo.bind(this));
    }
  }

  // 상태 변경함수
  toggleFilterStatus(event: MouseEventInit) {
    // 1. 돔을 가져온다.
    const controlButtonElements = document.querySelectorAll(
      "div.control > button.btn"
    );
    // 초기화, 지운다.
    controlButtonElements.forEach((btn) => btn.classList.remove("active"));

    const targetElement = ((event as MouseEvent).target) as HTMLButtonElement;

    // active클래스를 붙인다
    if (targetElement) {
      targetElement.classList.add("active");
    }
  }

  /**
   * 할 일을 추가할 수 있다.
   * 엔터로 동작 > event등록
   * @param {string} text
   */
  addTodo(event: KeyboardEventInit) {
    if (event.key !== "Enter") {
      return;
    }

    // as 어설션은 타입 추론을 덮어쓰고 명시적으로 타입을 선언하는 방식
    //  컴파일러에게 "내가 이 타입을 확신한다"라고 말하는 것에 가까움.
    // // <>는 타입스크립트에서  타입 어설션을 제네릭 형태로 사용하는 방법.
    // // event가 KeyboardEvent임을 먼저 어설션하고, 그 안에서
    // // **target**이 실제로 HTMLInputElement라는 타입임을 다시 한 번 어설션
    const target = <HTMLInputElement>(event as KeyboardEvent).target;

    // 입력값 없을시
    if (!target.value) {
      return;
    }

    this.todoList.push({
      id: this.todoList.length + 1,
      isDone: false,
      content: target.value,
    });

    target.value = "";
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
  getTodoListByFilter(filterType: string) {
    if (filterType === "all") {
      return this.todoList;
    }
    if (filterType === "complete") {
      return this.todoList.filter((todo) => todo.isDone);
    }
    if (filterType === "not-complete") {
      return this.todoList.filter((todo) => !todo.isDone);
    }
  }

  /**
   * 할 일의 내용과 상태를 수정할 수 있다.
   *
   * @param {Object} todo -수정될 할일
   * @param {string} [todo.text]  -수정될 내용
   * @param {string} [todo.status]  -수정될 상태
   */
  updateTodo(event: MouseEvent, selectedId: Todo["id"]) {
    const inputText =
      (event as MouseEvent).target &&
      ((event as MouseEvent).target as HTMLDivElement).innerText;

    if (!inputText) {
      return;
    }
    const selectedIndex = this.todoList.findIndex(
      (todo) => todo.id === selectedId
    );
    const selectedTodo = this.todoList[selectedIndex];
    const newTodo = {
      ...selectedTodo,
      content: inputText,
    };

    this.todoList.splice(selectedIndex, 1, newTodo);
    this.render(this.todoList);
  }

  updateTodoStatus(selectedId: Todo["id"]) {
    const selectedIndex = this.todoList.findIndex(
      (todo) => todo.id === selectedId
    );
    const selectedTodo = this.todoList[selectedIndex];
    const newTodo = {
      ...selectedTodo,
      isDone: !selectedTodo.isDone,
    };

    // 인덱스 받고, 1개 지우고, newTodo추가
    this.todoList.splice(selectedIndex, 1, newTodo);
    this.render(this.todoList);
  }

  /**
   * 특정 할 일을 제거할 수 있다.
   *
   * @param {number} id
   */
  removeTodo(selectedId: Todo["id"]) {
    // console.log("selectedId: ", selectedId);

    this.todoList = this.todoList.filter((todo) => todo.id !== selectedId);
    // console.log('this.todoList: ', this.todoList);
    this.render(this.todoList);
  }

  generateTodoList(todo: Todo) {
    const containerEl = document.createElement("div");
    const todoTemplate = `<div class="item__div">
    <input type='checkbox' ${todo.isDone && "checked"} />
    <div class='content ${todo.isDone && "checked"}' contentEditable>${
      todo.content
    }</div>
    <button class="todoButton">X</button>
    </div>`;

    containerEl.classList.add("item");
    containerEl.innerHTML = todoTemplate;

    const contentEl = containerEl.querySelector(".content");
    const chcekboxEl = containerEl.querySelector("input[type=checkbox]");
    const deleteButtonEl = containerEl.querySelector(".todoButton");

    contentEl?.addEventListener("blur", (event) =>
      this.updateTodo(event, todo.id)
    );
    chcekboxEl?.addEventListener("change", () =>
      this.updateTodoStatus(todo.id)
    );
    deleteButtonEl?.addEventListener("click", () => this.removeTodo(todo.id));

    if (deleteButtonEl) {
      containerEl.appendChild(deleteButtonEl);
    }
    return containerEl;
  }

  // Todo[] = [] 호출 시 인자가 없으면 빈 배열이 자동으로 전달.
  render(todoList: Todo[] = []) {
    const todoListEl = document.querySelector(".todo-items");

    // todoListEl?.replaceChildren();

    if (todoListEl) {
      todoListEl.innerHTML = "";
      // todoListEl.replaceChildren();
    }

    // 가상의 돔. 실질적으로 그려지지않은 상태
    const fragment = document.createDocumentFragment();
    const todoListComponent = todoList.map((todo) =>
      this.generateTodoList(todo)
    );

    fragment.append(...todoListComponent);
    // todoListEl?.appendChild(fragment);  //?를 넣으면 ?앞 값이 존재할때만 동작 아래 타입가드와 동일함.

    // 타입가드 - null일것 같을때
    if (todoListEl) {
      todoListEl.appendChild(fragment);
    }
  }
}

const todoApp = new TodoApp();
todoApp.render();
