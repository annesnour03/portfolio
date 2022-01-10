const reserved = ['annes','mabel']
const badname = ['yassine']
function calculate() {
    var firstbox = document.getElementById("firstname")
    var secondbox = document.getElementById("secondname")

    var firstname = firstbox.value
    var secondname = secondbox.value
    console.log(firstname, secondname);

    if (textbox_input(firstbox, secondbox)) // ?? '== false' is not needed?
        return

    document.getElementById('calculate').innerHTML = "Calculating..."

    // Wait 2 seconds
    setTimeout(() => {
        document.getElementById('calculate').innerHTML = "Calculate"
    }, 2000)

    let love = calc_love(firstname, secondname)
    const obj = document.getElementById("score");
    animateValue(obj, 0,love,2000)
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

    const reserve = checkreserved(firstname,secondname)
    if (reserve == 100 || reserved < 0){
        console.log("reserved name!");
        return String(reserve)
    }
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

function checkreserved(x,y){
    if (reserved.includes(x && y)){
        return 100
    }
    else if(badname.includes(x || y)){
        return 69
    }
    return 1
}
// Counting up animation function
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start) + String("%");
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

