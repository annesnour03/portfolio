function calculate(){
    var firstname =  document.getElementById("firstname").value
    var secondname =  document.getElementById("secondname").value
    if(firstname == "" || secondname ==""){
        console.log("empty input")
        return
    }
    document.getElementById('calculate').innerHTML = "Calculating..."

    setTimeout(() => {
        document.getElementById('calculate').innerHTML = "Calculate"
    }, 2000);

}