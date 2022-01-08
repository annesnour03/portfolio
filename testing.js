function calculate() {
    var firstname = document.getElementById("firstname")
    var secondname = document.getElementById("secondname")

    if (textbox_input(firstname, secondname)) // ?? '== false' is not needed?
        return

    document.getElementById('calculate').innerHTML = "Calculating..."

    setTimeout(() => {
        document.getElementById('calculate').innerHTML = "Calculate"
    }, 2000);
    calc_love(firstname, secondname)
}

function textbox_input(firstname, secondname) {


    var firstval = firstname.value
    var secondval = secondname.value
    var empty = false
    if (firstval == "") {
        console.log('invalid')
        firstname.style.border = "2px solid red"
        empty = true
    }
    else {
        firstname.style.border = "2px solid black"
    }

    if (secondval == "") {
        console.log('invalid')
        secondname.style.border = "2px solid red"
        empty = true
    }
    else {
        secondname.style.border = "2px solid black"
    }

    return empty
}

function calc_love(firstname, secondname) {
    console.log('nigerian')
    var firstval = 0
    for (const i in firstname) {
        console.log(i);
        firstval += i - 97
    }

    console.log(firstval)
    return "yoyo"

}

calc_love("aap","boek")