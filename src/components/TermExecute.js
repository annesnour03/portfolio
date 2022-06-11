import asciiAnnes from "../assets/jsxElements"
function run(props, args, setReadOnly, setOutputMessage) {
    const command = args[0]
    switch (command) {
        case "help":
            props.newInput()
            setReadOnly(true)
            setOutputMessage(<p>{"This is the help message"}</p>)
            break
        case "welcome":

            props.newInput()
            setReadOnly(true)
            setOutputMessage(<>
                {asciiAnnes}
                <br></br>
                <p>
                    Hello my name is <a style={{ color: "#88f0fd" }}>Annes Negmel-Din</a> and this is my interactive portfolio.
                </p>
                <p>
                    If you want to switch to GUI mode, enter "gui" or click on the floating button.
                </p>
                <p>
                    To see all the commands, try "help"!
                </p>
            </>
            )
            break
        case "clear":
            props.clear()
            props.newInput()

            break
        case "whoami":
            const today = new Date()
            // American style date.
            const birthday = new Date("03-01-2003")

            // Divide by milliseconds per day
            const daysSinceBirth = Math.floor((today - birthday) / (1000 * 60 * 60 * 24))
            const age = Math.floor(daysSinceBirth / 365.25)
            const days = Math.floor(daysSinceBirth % 365.25)
            setOutputMessage(
                <p>
                    My name is <a style={{ color: "#88f0fd" }}>Annes Negmel-Din</a> and I'm {age} years and {days} days old.
                </p>)
            props.newInput()
            setReadOnly(true)

            break


        // Simply enter or spaces.
        case "":
            props.newInput()
            setReadOnly(true)
            break
    }
}

export default run