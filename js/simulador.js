let sueldocom = 70000
let sueldoadmin = 65000
let alquiler = 120000
let servicios = 0.1

function solicitarnumero(texto){
    let solicitud = prompt(texto)
    return parseInt(solicitud)
}

alert('Siga las instrucciones para obtener un estimado de ganancias. Tenga en cuenta que la versión gratuita mantiene determinados supuestos no susceptibles de cambios.')
let local = prompt('Cuenta con un inmueble propio a utilizar para la actividad comercial? Responder con Sí o No.')
while (local != 'No' && local != 'no' && local != 'Si' && local != 'si' && local != 'Sí' && local != 'sí'){
    local = prompt ('Por favor, responda solamente Sí o No.')
}
let empleadoscom = solicitarnumero('Cuántos empleados tendrá para la venta en su comercio?')
while (isNaN(empleadoscom) === true || (isNaN(empleadoscom) === false && empleadoscom <0)){
    empleadoscom = solicitarnumero('Ingrese valores iguales o superiores a 0')
}
let empleadosadm = solicitarnumero('Cuántos empleados administrativos tendrá para su comercio?')
while (isNaN(empleadosadm) === true || (isNaN(empleadosadm) === false && empleadosadm <0)){
    empleadosadm = solicitarnumero('Ingrese valores iguales o superiores a 0')
}
let stockinicial = solicitarnumero('Cuánto planea invertir en stock al inicio? Utilizar un valor estimado para un período de rotación de 3 meses.')
while (isNaN(stockinicial) === true || (isNaN(empleadosadm) === false && stockinicial <=0)){
    stockinicial = solicitarnumero('Ingrese valores superiores a 0')
}
let margen = solicitarnumero('Finalmente, cuánto margen planea aplicarle al precio de sus productos? Los números se tomarán como porcentajes. Es decir, si ingresa 1, a los fines del cálculo se interpretará como 1%.')
while (isNaN(margen) === true || (isNaN(margen) === false && margen <=0)){
    margen = solicitarnumero('Ingrese valores superiores a 0')
}
alert('Gracias. Con los datos ingresados y aplicando supuestos conocidos debido a nuestra amplia trayectoria (que increíblemente cabe en 61 líneas de código), calcularemos cuál será su ganancia final una vez acabado el stock.')
let costolaboral = multiplicar(sumar(multiplicar(empleadoscom,sueldocom),multiplicar(empleadosadm,sueldoadmin)),3)
if(local == 'si' || local == 'Si' || local == 'sí' || local == 'Sí' ){oficina = 0}
else {oficina = 1}
let costosfijos = multiplicar(sumar(multiplicar(oficina,alquiler),multiplicar(servicios,alquiler)),3)
let costostotales = sumar(costosfijos,costolaboral)
let resultadooperativo = restar(multiplicar(stockinicial,dividir(margen,100)),costostotales)
if(resultadooperativo >= 0){alert('Felicidades, dado tu mix de gastos y margen deseado, obtendrás una ganancia en caso de liquidar el stock en 3 meses. Cualquier tiempo menor mejorará tu resultado.\nTu ganancia esperada es de '+resultadooperativo+'.')}
else{alert('Al parecer, tus gastos superan a tus ingresos. Te sugerimos ingresar nuevamente a la página y aumentar el margen deseado o disminuir los costos laborales (la simulación ya supone sueldos en negro y sin aportes, por lo que debieras eliminar empleados).\nLa pérdida esperada es de '+resultadooperativo+'.')}

function sumar(parametroA, parametroB){
    let resultado = parametroA + parametroB
    console.log('Resultado es: '+ resultado)
    return resultado
}
function restar(parametroA, parametroB){
    let resultado = parametroA - parametroB
    console.log('Resultado es: '+ resultado)
    return resultado
}
function dividir(parametroA, parametroB){
    let resultado = parametroA / parametroB
    console.log('Resultado es: '+ resultado)
    return resultado
}
function multiplicar(parametroA, parametroB){
    let resultado = parametroA * parametroB
    console.log('Resultado es: '+ resultado)
    return resultado
}