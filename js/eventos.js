let listadocuentas; 
let storage = JSON.parse(localStorage.getItem('listadocuentasobj'))
if(storage == null){
fetch('data/data.json').then((response) => response.json())
    .then((result) => {
       listadocuentas = result.listabase
       console.log(listadocuentas)
    })
}
else{
    listadocuentas = storage
}
console.log(listadocuentas)

const actualizacioncuentas = (clave,valor) => {
    localStorage.setItem(clave, JSON.stringify(valor))
}
class registracion {
    constructor(cuenta,servicio,importe){
        this.cuenta = cuenta
        this.servicio = servicio
        this.importe = importe
    }
}
const listadoasientos = []

const submitcuenta = (id) =>{
    let formcuenta = document.getElementById(id);
    formcuenta.addEventListener('submit',(event)=>{
        event.preventDefault();
        let cuenta = formcuenta.children[0].value
        if (validate({account:parseInt(cuenta)},{account: {inclusion: listadocuentas}}) != undefined && cuenta.length == 7 && cuenta > 0){
            listadocuentas.push(parseInt(cuenta))
            actualizacioncuentas('listadocuentasobj',listadocuentas)
            console.log(listadocuentas)
            let cuentasdiv = document.getElementById('cuentasdiv')
            cuentasdiv.innerHTML = "<div><h4>Cuentas</h4></div>"
            for (let index = 0; index < listadocuentas.length; index++) {
                const cuenta = listadocuentas[index];
                const elemento = document.createElement('div')
                elemento.innerHTML = `
                <div>${cuenta}</div>
                `
               cuentasdiv.append(elemento)
        }}
        else{Swal.fire({
            title: 'Error',
            text: 'Esa cuenta ya se encuentra incluida, no tiene 7 caracteres o ingresó valores negativos.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        })}
        formcuenta.children[0].value = ''
        console.log(listadocuentas)
        })
}
const mostrarcuentas = () =>{
    try{
        let cuentasdiv = document.getElementById('cuentasdiv')
        for (let index = 0; index < listadocuentas.length; index++) {
            const cuenta = listadocuentas[index];
            const elemento = document.createElement('div')
            elemento.innerHTML = `
            <div>${cuenta}</div>
            `
           cuentasdiv.append(elemento)
        }
    }
    catch{console.log("I have failed you Anakin")}
}

const submitasiento = (id) =>{
        let formasiento = document.getElementById(id);
        formasiento.addEventListener('submit',(event)=>{
            event.preventDefault();
            let cuenta = formasiento.children[0].value
            let servicio = formasiento.children[1].value
            let importe = formasiento.children[2].value
            if(validate({account:parseInt(cuenta)},{account: {inclusion: listadocuentas}}) != undefined || validate({service:servicio},{service:{presence:{allowEmpty:false}}}) != undefined || validate.isNumber(parseInt(importe)) == false){
                Swal.fire({
                    title: 'Error',
                    text: 'La cuenta ingresada no está en el listado o el servicio se encuentra vacío.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                })
            }
            else{
            let asiento = new registracion (parseInt(cuenta),servicio,parseInt(importe))
            listadoasientos.push(asiento)
            botonasientos.click()
            console.log(listadoasientos)

            }
            formasiento.children[0].value = ''
            formasiento.children[1].value = ''
            formasiento.children[2].value = ''
        })
    }
const eliminarasiento = (id) => {
    let asientoeliminado = document.getElementById(id);
        asientoeliminado.addEventListener('submit',(event)=>{
            event.preventDefault();
            let asientonroelim = parseInt(asientoeliminado.children[0].value)-1
            if(asientonroelim <= listadoasientos.length-1 && asientonroelim >= 0){
            listadoasientos.splice(asientonroelim,1)
            botonasientos.click()
            console.log(listadoasientos)}
            else{
                Swal.fire({
                    title: 'Error',
                    text: 'El asiento a eliminar no existe.',
                    icon: 'warning',
                    confirmButtonText: 'Aceptar'
                })
            }
            asientoeliminado.children[0].value = ''
        })}
const mostrarasientos = (id) =>{
        let asientosdiv = document.getElementById('asientosdiv')
        let botonasientos = document.getElementById(id)
        botonasientos.addEventListener('click',(event) =>{
        event.preventDefault();
        asientosdiv.innerHTML = '';
        let total = 0
        for (let index = 0; index < listadoasientos.length; index++) {
            const asientonro = listadoasientos[index];
            const elemento = document.createElement('div')
            total = total + asientonro.importe
            elemento.innerHTML = `
            <div>Asiento N: ${index+1}, cuenta: ${asientonro.cuenta}, servicio: ${asientonro.servicio}, importe: ${asientonro.importe}.</div>
            `
           asientosdiv.append(elemento)
        }
        const sumatotal = document.createElement('div')
        if(listadoasientos.length > 0){sumatotal.textContent = "Total = $ "+total
        asientosdiv.append(sumatotal)}
        else{}
    })
}

setTimeout(() => {mostrarcuentas()}, 2000); 
submitcuenta('formcuenta')
submitasiento('formasiento')
mostrarasientos('botonasientos')
eliminarasiento('elimasiento')

