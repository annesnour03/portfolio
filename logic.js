function calculate() {
    var firstbox = document.getElementById("firstname")
    var secondbox = document.getElementById("secondname")

    var firstname = firstbox.value
    var secondname = secondbox.value
    console.log(firstname, secondname);

    if (textbox_input(firstbox, secondbox)) // ?? '== false' is not needed?
        return

    document.getElementById('calculate').innerHTML = "Calculating..."

    setTimeout(() => {
        document.getElementById('calculate').innerHTML = "Calculate"
    }, 2000)
    let love = calc_love(firstname, secondname)
    document.getElementById("score").innerHTML = String(love) + "%"
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
    firstname = String(firstname).toLocaleLowerCase().replace(/\W/g, '')
    secondname = String(secondname).toLocaleLowerCase().replace(/\W/g, '')

    console.log('nigerian')
    var firstval = 0
    var secondval = 0
    for (const i of firstname) {
        firstval += i.charCodeAt(0) ** 2 - 96
    }

    for (const i of secondname) {
        secondval += i.charCodeAt(0) ** 2 - 96
    }

    console.log(firstval + secondval)
    return (firstval + secondval) % 101
}