//Данные
let data = {
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




// Имитация запроса к API
function getData(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(JSON.stringify(data))
            
        }, 1000);
    })

}



document.body.innerHTML="<b>Загрузка данных</b>";
getData().then(

        data => JSON.parse(data)
    
    ).then(

        data => {
            document.body.innerHTML="";
            CreateList(data)          
        }
    )
    

// Создание списка услуг
function CreateList(data) {
    let ul = document.createElement('ul');
    ul.id = "contain";
    document.body.append(ul);
    let contain = document.getElementById('contain');

    let {services} = data;
    
    services.forEach(service => {

        if(service.head === null){

            if(contain.children.length === 0){  
                contain.append(createService(service)); 
            }
            else{    
                contain.insertBefore(createService(service), findElem(contain, service.sorthead))
            }
  
        } 
        else {

            contain = document.getElementById(service.head);
            let element = createService(service);
            element.style.marginLeft = "20px";

            if(contain.children.length === 0){

               contain.append(element); 

            }
            else{

                contain.insertBefore(element, findElem(contain, service.sorthead))

            }

            
        } 
        


    });

    // Создание услуги
    function createService(service) {

        let element = document.createElement('li');
        element.setAttribute('sorthead', service.sorthead);
        
        if(service.node == 1) {

            element.classList.add("weight");
            element.classList.add("cursor");
            element.innerText = `${service.name}`;
        
            element.addEventListener('click', (e) => {
            
                console.log(e.target.id)
                 if(e.target.id === '') ul.classList.toggle("hidden");
                 e.stopPropagation()
 
             })

            let ul = document.createElement('ul');  
            ul.classList.add("hidden");
            ul.id = service.id;

            element.append(ul)
    
        }else {
            element.innerText = `${service.name} - ${service.price}`
            element.classList.add('norm');
            element.classList.add("non-cursor");
            element.id = service.id;
        }
        
       
        return element
    }
    
    // Поиск соседнего элемента для добавления нового элемента
    function findElem(parent, sorthead) {
    
       
            if (parent.children[parent.children.length-1].getAttribute('sorthead') >= sorthead) return  parent.children[parent.children.length-1];
            
            for (let i = 0; i < parent.children.length-1; i++) {
    
                if(parent.children[i].getAttribute('sorthead') == sorthead ) return parent.children[i];
                    
            }
            
        
    }
    
}





