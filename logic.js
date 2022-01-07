function calculate(){
    var firstname =  document.getElementById("firstname").val
    console.log("mieble")
    document.getElementById('calculate').innerHTML = "Calculating..."

    setTimeout(() => {
        document.getElementById('calculate').innerHTML = "Calculate"
    }, 2000);

    alert(firstname) // Werkt niet voor een reden ?? is undefined
}