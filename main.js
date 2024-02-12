import { apiRes } from "./api.js"

const getChild = (head) => {
	let parent
	head === null ? parent = "root" : parent = head //указывается родительский элемент перед итерацией рекурсивной функции, если null, то корневой DOM элемент, если нет - id вышележащего узла

	apiRes.services
	.filter((service) => service.head === head)// данные от api фильтруются по head
	.slice().sort((a,b) => a.sorthead - b.sorthead) //slice для сортировки копии массива, сортировка по возрастанию по значению ключа sorthead
	.map((item) => {
		if (item.node === 1) {//если node - узел(1) то добавляем 2 дочерних div, первый - для имени узла, с id в формате nodeId+"label", второй - контейнер для вложенных элементов с id узла
			document.getElementById(parent).insertAdjacentHTML("beforeend", `<div id="${item.id+"label"}" class="label">${" (-)" + item.name}</div> 
																																				<div id="${item.id}" style="margin-left:20px"></div>`)//
			document.getElementById(item.id + "label").addEventListener("click", () => openOrHideTree(item)) //eventListener на нажатие(вызывает openOrHideTree(), развёртывающую/свёртывающую ветвь дерева)
			getChild(item.id) //рекурсивно вызываем функцию, но в head уже указывается выше созданный элемент, чтобы найти его детей
		} else {//если node - лист(0) то добавляем 1 дочерний div, в котором содержится только имя дочернего элемента
			document.getElementById(parent).insertAdjacentHTML("beforeend", `<div id="${item.id+"label"}" class="item">${item.name + " (" + item.price + ")"}</div>`)
		}
	})
}

const openOrHideTree = (item) => {
	document.getElementById(item.id).hidden = !document.getElementById(item.id).hidden //свернуть указанную ветвь дерева
	document.getElementById(item.id).hidden === true //сменить + на - или наоборот в корне ветви дерева, когда она разворачивается или сворачивается
	? document.getElementById(item.id + "label").textContent = " (+)" + item.name
	: document.getElementById(item.id + "label").textContent = " (-)" + item.name
}

getChild(null)//вызов функции для корневых узлов

apiRes.services//свернуть все ветви дерева после построения
.filter((service) => service.node === 1)
.map((item) => openOrHideTree(item))

