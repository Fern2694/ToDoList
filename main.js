const container = document.querySelector('.container');
var inputValue = document.querySelector('.input');
const add = document.querySelector('.add');
const removeAll = document.querySelectorAll('.removeAll');

if(window.localStorage.getItem("todos") == undefined){  
    var todos = [];                                        
     window.localStorage.setItem("todos", JSON.stringify(todos)); 
    }                                                                        

var todosEX = window.localStorage.getItem("todos"); 
var todos = JSON.parse(todosEX); 

class icon{
	constructor(name){
        this.createIcon(name);
    }
    createIcon(name){
    var iconBox =document.createElement('div');
    iconBox.classList.add('icon');

    var removeAll = document.createElement('button');
    removeAll.classList.add('removeAll');
    removeAll.innerHTML = "<img src=\"iconos/recycle-bin.svg\" width=\"40px\" height=\"40px\">";
    removeAll.addEventListener('click', () => this.removeAll());

    container.appendChild(iconBox);

    iconBox.appendChild(removeAll);

    }
    removeAll(){
        iconBox.parentNode.removeChild(iconBox);
         window.localStorage.clear();
    }
}

class item{
	constructor(name){
		this.createItem(name);
	}
    createItem(name){
    	var itemBox = document.createElement('div');
        itemBox.classList.add('item');

    	var input = document.createElement('input');
    	input.type = "text";
    	input.disabled = true;
    	input.value = name;
    	input.classList.add('item_input');

    	var edit = document.createElement('button');
    	edit.classList.add('edit');
    	edit.innerHTML = "<img src=\"iconos/editar.png\" width=\"45px\" height=\"45px\">";
    	edit.addEventListener('click', () => this.edit(input, name));

    	var remove = document.createElement('button');
    	remove.classList.add('remove');
    	remove.innerHTML = "<img src=\"iconos/remove.svg\" width=\"40px\" height=\"40px\">";
        remove.addEventListener('click', () => this.remove(itemBox, name));
        
        
        

    	container.appendChild(itemBox);

        itemBox.appendChild(input);
        itemBox.appendChild(edit);
        itemBox.appendChild(remove);
        

    }

    edit(input, name){
        if(input.disabled == true){
           input.disabled = !input.disabled;
        }
    	else{
            input.disabled = !input.disabled;
            let indexof = todos.indexOf(name);
            todos[indexof] = input.value;
            window.localStorage.setItem("todos", JSON.stringify(todos));
        }
    }

    remove(itemBox, name){
        itemBox.parentNode.removeChild(itemBox);
        let index = todos.indexOf(name);
        todos.splice(index, 1);
        window.localStorage.setItem("todos", JSON.stringify(todos));
    }

    
}

    

add.addEventListener('click', check);
window.addEventListener('keydown', (e) => {
	if(e.which == 13){
		check();
	}
})

function check(){
	if(inputValue.value != ""){
		new item(inputValue.value);
        todos.push(inputValue.value);
        window.localStorage.setItem("todos", JSON.stringify(todos));
		inputValue.value = "";
	}
}


for (var v = 0 ; v < todos.length ; v++){
    new item(todos[v]);
}


new item("No hay ToDo´s, puedes tomarte un café");