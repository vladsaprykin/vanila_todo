document.addEventListener("DOMContentLoaded", function (event) {
	const todoForm = document.querySelector('#todoForm');

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
		const radioBtnInputs = [...document.getElementsByClassName('custom-radio')];
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

		divTodo.style.background = (data.isCompleted === 'true') ? '#ccc' : divTodoColor;
		divTodo.className = "todo-item";
		divTodo.setAttribute('completed', data.isCompleted);
		divTodo.setAttribute('color', divTodoColor);
		divTodo.setAttribute('id',data.id)

		textTodo.innerText = data.text;
		textTodo.className = 'todo-item__text';
		textTodo.style.color = '#ffffff';
		if (data.isCompleted === 'true') textTodo.style.textDecoration = 'line-through';

		divCheckBox.className = 'todo-item__check-box';
		checkBoxTodo.type = 'checkbox';
		if (data.isCompleted === 'true') checkBoxTodo.checked = true

		divCheckBox.append(checkBoxTodo);
		divTodo.append(divCheckBox);
		divTodo.append(textTodo);
		todoItems.append(divTodo);

		getRandColor();

		checkBoxTodo.addEventListener('change', (e) => {
			const parentBlock = e.target.closest('.todo-item');
			const completedItem = parentBlock.getAttribute('completed') === 'false' ? 'true' : 'false';
			e.target.closest('.todo-item').setAttribute('completed', completedItem);

			const todos = JSON.parse(localStorage.getItem("todos"));
			todos.map( item => {
				if (item.id === Number(parentBlock.getAttribute('id'))) {
					item.isCompleted = completedItem;
					console.log('132')
				}
				return item
			})
			localStorage.setItem('todos', JSON.stringify(todos));
			toggleTodo(parentBlock)
		})
	}
	const getTodosLS = () => {
		const todos = JSON.parse(localStorage.getItem("todos"));
		todos.forEach( item => createHandler(item))
	}
	(localStorage.getItem('todos') === null)  ? localStorage.setItem('todos', JSON.stringify([])) : getTodosLS();

	todoForm.addEventListener('submit', (event) => {
		event.preventDefault();
		const data = Object.fromEntries(new FormData(todoForm).entries());
		if (!data.text.length) return
		data.isCompleted = 'false';
		data.id = new Date().getTime();
		document.querySelector('.todo__input').value = '';
		createHandler(data);

		const todos = JSON.parse(localStorage.getItem("todos"));

		todos.push(data);
		localStorage.setItem('todos', JSON.stringify(todos));
	})
});
