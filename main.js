import { apiRes } from "./api.js"

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
			name.className = "label"
			document.getElementById(parent).appendChild(name)
			document.getElementById(parent).appendChild(service)
			document.getElementById(item.id + "label").addEventListener("click", () => openOrHideTree(item))
			getChild(item.id)
		} else {
			name.textContent = item.name + " (" + item.price + ")"
			name.className = "item"
			document.getElementById(parent).appendChild(name)
		}
	})
}

getChild(null)
apiRes.services.filter((service) => service.node === 1).slice().map((item) => openOrHideTree(item))

