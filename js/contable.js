class registracion {
    constructor(cuenta,servicio,importe){
        this.cuenta = cuenta
        this.servicio = servicio
        this.importe = importe
    }
}
const listadocuenta = ['7030806','7030811','7030812','7030704','7030707']
const listadoasientos = []


alert("Bienvenido al sistema contable edición básica.")
alert("Tenga en cuenta que esta edición gratuita sólo permite funciones limitadas y al final sólo le devolverá el monto total de lo ingresado.\nLas cuentas contables incluidas son: "+listadocuenta+"\n.")
plancuentas()
asientocontable()
servicioimputado()
montoimputado()
actualizacionlistado()
nuevoasiento()

function plancuentas (){
let consultacuenta = prompt('Desea ingresar una nueva cuenta? Responder con Si o No')
if(consultacuenta.toUpperCase() === "SI"){
    let nuevacuenta = prompt('Ingrese la nueva cuenta')
    listadocuenta.push(nuevacuenta)
    plancuentas()
}
else if(consultacuenta.toUpperCase() !== "NO"){
    plancuentas()
}
else{
    alert('A continuación deberá ingresar el asiento contable a registrar. La estructura del mismo se compone de \n- Cuenta contable\n- Servicio contradado\n- Importe\nAl final, obtendrá un total de sus asientos del mes.')
}}
function ingresodatos(texto){
    let solicitud = prompt (texto)
    return solicitud
}
function servicioimputado(){
    servicio = ingresodatos('Por favor, ingrese el servicio vinculado')
    while (servicio ==''){
        servicio = ingresodatos('No se detectó ningún dato. Por favor, ingrese el servicio vinculado')
        }
}
function montoimputado(){
    monto = ingresodatos('Por favor, ingrese el monto a imputar. Sólo se aceptan valores numéricos.')
    while (isNaN(parseInt(monto))=== true){
        monto = ingresodatos('Error. Ingrese sólo valores numéricos')
        }
}
function asientocontable(){
cuenta = ingresodatos('Por favor, ingrese la cuenta contable a imputar (debe estar entre las creadas).')
while ((listadocuenta.includes(cuenta)) == false){
    cuenta = ingresodatos('Esa cuenta no está incluida en el listado. Por favor, intente nuevamente')
}
}
function actualizacionlistado(){
const asiento1 = new registracion(cuenta,servicio,monto)
listadoasientos.push(asiento1)
}
function nuevoasiento(){
let nuevoasientocontable = ingresodatos('Desea ingresar otro asiento contable. Responder con si o no?')
if (nuevoasientocontable.toUpperCase() === 'SI'){
    asientocontable()
    servicioimputado()
    montoimputado()
    actualizacionlistado()
    nuevoasiento()
}
else if(nuevoasientocontable.toUpperCase() !== 'NO'){
    nuevoasiento()
}
else{
    const listadoimporte = listadoasientos.map((el) =>{
        return {
            importe: el.importe,
        }
    })
    alert(JSON.stringify(listadoimporte))
    const total = listadoimporte.reduce((acumulador,elemento) => acumulador + elemento,0)
    alert('El total registrado es de $'+total)}
}