

firebase.initializeApp({
  apiKey: 'AIzaSyDz_dt5ciZX9Fc8kRqacsEBDUy0uK1LaAQ',
  authDomain: 'alarmadiaria-b503b.firebaseapp.com',
  projectId: 'alarmadiaria-b503b'
});

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

// Agregar datos
function guardar() {

    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var fecha = document.getElementById('fecha').value;


db.collection("users").add({
    first: nombre,
    last: apellido,
    born: fecha
})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
    document.getElementById('nombre').value ="";
    document.getElementById('apellido').value ="";
    document.getElementById('fecha').value ="";
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});

}


// Leer Datos
var tabla = document.getElementById('tabla');
db.collection("users").onSnapshot((querySnapshot) => {
    tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().first}`);
        tabla.innerHTML += `
         <tr>
            <th scope="row">${doc.id}</th>
            <td>${doc.data().first}</td>
            <td>${doc.data().last}</td>
            <td>${doc.data().born}</td>
            <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
            <td><button class="btn btn-warning">Editar</button></td>
        </tr>
        `

    });
});


//Borrar datos
function eliminar(id) {
  db.collection("users").doc(id).delete().then(function() {
    console.log("Document successfully deleted!");
}).catch(function(error) {
    console.error("Error removing document: ", error);
});
  

}

