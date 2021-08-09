document.addEventListener("DOMContentLoaded", function (event) {
	const todoForm = document.querySelector('#todoForm');
	const radioBtnInputs = [...document.getElementsByClassName('custom-radio')];

	const colorTodoHandler = (colorStr) => {
		switch (colorStr) {
			case 'todoColor1' :
				return 'blue'
			case 'todoColor2' :
				return '#ffa400'
			case 'todoColor3' :
				return 'green'
			case 'todoColor4' :
				return 'red'
			case 'todoColor5' :
				return '#00d669'
			case 'todoColor6' :
				return '#530cff'
		}
	}
	const getRandColor = () => {
		const randColor = Math.floor(Math.random() * radioBtnInputs.length);
		radioBtnInputs[randColor].checked = true;
	}
	const toggleTodo = (todo) => {
		const isCompleted = todo.getAttribute('completed');
		const colorItem = todo.getAttribute('color');
		switch (isCompleted) {
			case 'true':
				todo.style.background = '#ccc';
				todo.querySelector('.todo-item__text').style.textDecoration = 'line-through';
				break;
			case 'false':
				todo.style.background = colorItem;
				todo.querySelector('.todo-item__text').style.textDecoration = 'none';
				break;
		}
	}
	const createHandler = (data) => {
		const divTodo = document.createElement("div");
		const divCheckBox = document.createElement("div");
		const checkBoxTodo = document.createElement('input');
		const textTodo = document.createElement("div");
		const todoItems = document.querySelector('#todoItems');

		const divTodoColor = colorTodoHandler(data.todoColor);

		divTodo.style.background = divTodoColor;
		divTodo.className = "todo-item";
		divTodo.setAttribute('completed', 'false');
		divTodo.setAttribute('color', divTodoColor);

		textTodo.innerText = data.text;
		textTodo.className = 'todo-item__text';
		textTodo.style.color = '#ffffff';

		divCheckBox.className = 'todo-item__check-box';
		checkBoxTodo.type = 'checkbox';

		divCheckBox.append(checkBoxTodo);
		divTodo.append(divCheckBox);
		divTodo.append(textTodo);
		todoItems.append(divTodo);

		getRandColor();

		checkBoxTodo.addEventListener('change', (e) => {
			const completedItem = e.target.closest('.todo-item').getAttribute('completed') === 'false' ? 'true' : 'false';
			e.target.closest('.todo-item').setAttribute('completed', completedItem);
			toggleTodo(e.target.closest('.todo-item'))
		})
	}
	todoForm.addEventListener('submit', (event) => {
		event.preventDefault();
		const data = Object.fromEntries(new FormData(todoForm).entries());
		if (!data.text.length) return
		document.querySelector('.todo__input').value = '';
		createHandler(data);
	})
});
