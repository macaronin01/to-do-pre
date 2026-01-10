let items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];
console.log(localStorage.getItem('items'));

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks() {
  const saved = localStorage.getItem('items');
  return saved ? JSON.parse(saved) : items;
}

function createItem(item) {
	const template = document.getElementById("to-do__item-template");
	const clone = template.content.querySelector(".to-do__item").cloneNode(true);
  const textElement = clone.querySelector(".to-do__item-text");
  const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
  const editButton = clone.querySelector(".to-do__item-button_type_edit");

  textElement.textContent = item;

	deleteButton.addEventListener('click', function () {
		clone.remove();
		const items = getTasksFromDOM();
		saveTasks(items);
	});

	duplicateButton.addEventListener('click', function () {
		const itemName = textElement.textContent;
		const newItem = createItem(itemName);
		listElement.prepend(newItem);

		const items = getTasksFromDOM();
		saveTasks(items);
	});

	editButton.addEventListener('click', function () {
		textElement.setAttribute("contenteditable", "true");
		textElement.focus();
	});

	textElement.addEventListener("blur", () => {
		textElement.setAttribute("contenteditable", "false");
		let items = getTasksFromDOM();
		saveTasks(items);
	});

	return clone;
}

items = loadTasks();
items.forEach(item => {
    const task = createItem(item);
    listElement.append(task);
});

formElement.addEventListener('submit', function (evt) {
  evt.preventDefault();
	const inputText = inputElement.value;
	listElement.prepend(createItem(inputText));
	items = getTasksFromDOM();
	saveTasks(items);
  inputElement.value = '';
});

function getTasksFromDOM() {
  const itemsNamesElements = document.querySelectorAll('.to-do__item-text');
	let tasks = [];
	itemsNamesElements.forEach(item => {
		tasks.push(item.textContent);
	});
	return tasks;
}

function saveTasks(tasks) {
  localStorage.setItem('items', JSON.stringify(tasks));
}