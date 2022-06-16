import asciiAnnes from "../assets/jsxElements"
function run(props, args, setReadOnly, setOutputMessage) {
    const command = args[0]
    const commandHandler = {
        "help": help,
        "welcome": welcome,
        "whoami": whoami,
        "clear": clear,
        "": enter
    }[command]
    commandHandler?.()

    function help() {
        setReadOnly(true)
        setOutputMessage(<p>{"This is the help message"}</p>)
    }

    function welcome() {
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
    }

    function whoami() {
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
        setReadOnly(true)
    }

    function clear() {
        props.clear()
    }

    function enter() {
        setReadOnly(true)
    }
}

export default run