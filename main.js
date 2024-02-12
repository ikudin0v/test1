const apiRes = {
	"services": [
			{
					"id": 1,
					"head": null,
					"name": "Проф.осмотр",
					"node": 0,
					"price": 100.0,
					"sorthead": 20
			},
			{
					"id": 2,
					"head": null,
					"name": "Хирургия",
					"node": 1,
					"price": 0.0,
					"sorthead": 10
			},
			{
					"id": 3,
					"head": 2,
					"name": "Удаление зубов",
					"node": 1,
					"price": 0.0,
					"sorthead": 10
			},
			{
					"id": 4,
					"head": 3,
					"name": "Удаление зуба",
					"node": 0,
					"price": 800.0,
					"sorthead": 10
			},
			{
					"id": 5,
					"head": 3,
					"name": "Удаление 8ого зуба",
					"node": 0,
					"price": 1000.0,
					"sorthead": 30
			},
			{
					"id": 6,
					"head": 3,
					"name": "Удаление осколка зуба",
					"node": 0,
					"price": 2000.0,
					"sorthead": 20
			},
			{
					"id": 7,
					"head": 2,
					"name": "Хирургические вмешательство",
					"node": 0,
					"price": 200.0,
					"sorthead": 10
			},
			{
					"id": 8,
					"head": 2,
					"name": "Имплантация зубов",
					"node": 1,
					"price": 0.0,
					"sorthead": 20
			},
			{
					"id": 9,
					"head": 8,
					"name": "Коронка",
					"node": 0,
					"price": 3000.0,
					"sorthead": 10
			},
			{
					"id": 10,
					"head": 8,
					"name": "Слепок челюсти",
					"node": 0,
					"price": 500.0,
					"sorthead": 20
			}
	]
}

const openOrHideTree = (item) => {
	document.getElementById(item.id).hidden = !document.getElementById(item.id).hidden
	document.getElementById(item.id).hidden === true ? document.getElementById(item.id + "label").textContent = item.name + " (+)":document.getElementById(item.id + "label").textContent = item.name + " (-)"
}

const getChild = (head) => {
	let parent
	head === null ? parent = "root" : parent = head

	apiRes.services.filter((service) => service.head === head).slice().sort((a,b) => a.sorthead - b.sorthead).map((item) => {
		let name = document.createElement("div")
		let service = document.createElement("div")
		name.id = item.id + "label"
		service.id = item.id
		service.style = "margin-left:20px"

		if (item.node === 1) {
			name.textContent = item.name + " (-)"
			document.getElementById(parent).appendChild(name)
			document.getElementById(parent).appendChild(service)
			document.getElementById(item.id + "label").style = "cursor: pointer"
			document.getElementById(item.id + "label").addEventListener("click", () => openOrHideTree(item))
			getChild(item.id)
		} else {
			name.textContent = item.name + " (" + item.price + ")"
			document.getElementById(parent).appendChild(name)
		}
	})
}

getChild(null)
apiRes.services.filter((service) => service.node === 1).slice().map((item) => openOrHideTree(item))

