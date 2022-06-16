import asciiAnnes from "../assets/jsxElements"
import './../index.css';

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
        setOutputMessage(<>

            <p>{"Currently available commands:"}</p>
            <div className="margin-0" style={{"color" : "green"}}>

                <p>&emsp;&emsp;help</p>
                <p>&emsp;&emsp;welcome</p>
                <p>&emsp;&emsp;whoami</p>
                <p>&emsp;&emsp;clear</p>
            </div>
            <p>{"Commands that will be avaiable in the future:"}</p>
            <p>&emsp;&emsp;cd</p>
            <p>&emsp;&emsp;ls</p>
            <p>&emsp;&emsp;r6</p>
            <p>&emsp;&emsp;gui</p>
            <p>&emsp;&emsp;chess</p>
            <p>&emsp;&emsp;gol</p>
            <p>&emsp;&emsp;resume</p>
            <p>&emsp;&emsp;contact</p>
        </>
        )
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