const listContainerTemplate = ({list, title, id}  ) => {
  return `
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
  </div>
  `;
};

export default listContainerTemplate;