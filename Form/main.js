if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
    .then(reg => console.log('Registro de SW exitoso', reg))
    .catch(err => console.warn('Error al tratar de registrar el sw', err))
}

//Tabla
const tableBody = new Vue({
    el: '#tableBody',
    data: {
        storageData: JSON.parse(localStorage.getItem('Data'))
    },
    methods: {
        deleteData(index){
            this.storageData.splice(index,1);
            localStorage.Data = JSON.stringify(this.storageData);
        }
    }
})

const tabla = new Vue({
    el: '#myTable',
    data: {
        titles: ['Nombre','Apellido','Edad','Fecha de nacimiento', 'Email', 'Personaje favorito']
    }
});

//Carrusel 
const carrusel = new Vue({
    el: "#carrusel",
    data:{
        direction: 1,
        num: 0, 
        image: ['a','b','c','d','e']
    },
    methods: {
        startCarousel(){
            this.num+=this.direction;
            if (this.num > this.image.length-1) this.num = 0;
            if (this.num < 0) this.num = this.image.length-1;
            document.getElementById("imagen").src="img/" +this.image[this.num] + ".jpg";  
        },
        prevImage(){
            this.direction = -1;
            clearInterval(startInterval);
            startInterval = setInterval(this.startCarousel,3000);
            this.startCarousel();
        },
        nextImage(){
            this.direction = 1;
            clearInterval(startInterval);
            startInterval = setInterval(this.startCarousel,3000);
            this.startCarousel();
        }
    }
})

var startInterval = setInterval(carrusel.startCarousel,3000);

//Formulario
const formulario = new Vue({
    el: '#addNew',
    data: {
        userData: {
            name: '',
            lastname: '',
            age: '',
            date: '',
            email: '',
            favChar: ''
        }
    },
    methods:{
        checkForm(){
            if(this.userData.name === '' || this.userData.lastname === '' || this.userData.age === '' || this.userData.date === '' || this.userData.email === '' || this.userData.favChar === ''){
                alert('Es necesario llenar todos los campos');
            } 
            else {
                this.validEmail();
            }
            
        },
        validEmail(){
            let contenido = this.userData.email;
            let cont = contenido.split('@');
            if(!cont[1] || cont[0]==""){
                alert('Introduzca un correo válido');
            } else {
                this.saveData();
            }
        },
        saveData(){
            let data = localStorage.getItem('Data');
            if (data) {
                let dataList = JSON.parse(data);
                this.saveInLocalStorage(dataList);
            } else {
                let dataList = [];
                this.saveInLocalStorage(dataList);
            }
            this.userData.name = '';
            this.userData.lastname = '';
            this.userData.age = '';
            this.userData.date = ''
            this.userData.email = '';
            this.userData.favChar = '';
        },
        saveInLocalStorage(dataList){
            dataList.push(this.userData);
            localStorage.setItem('Data',JSON.stringify(dataList));
            data = localStorage.getItem('Data');
            tableBody.storageData = JSON.parse(data);
        }
    }
})

const searchButton = new Vue({
    el: '#searchButton',
    data: {
        titles: ['Nombre','Apellido','Edad','Fecha de nacimiento', 'Email', 'Personaje favorito']
    }
})