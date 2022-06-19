import { asciiAnnes, availableCommands, futureCommands } from "../assets/jsxElements"
import './../index.css';
import api from '../api/r6api'

function run(props, args, setReadOnly, setOutputMessage) {
    const command = args[0]
    const commandHandler = {
        "help": help,
        "welcome": welcome,
        "whoami": whoami,
        "clear": clear,
        "r6": r6,
        "": enter
    }[command]
    commandHandler?.()

    function help() {
        setReadOnly(true)
        setOutputMessage(<>

            <p>{"Currently available commands:"}</p>
            <div className="margin-0" style={{ "color": "green" }}>

                {availableCommands}
            </div>
            <p>{"Commands that will be avaiable in the future:"}</p>
            {futureCommands}
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

    async function r6() {
        //  Simply r6, so display the squad's stats
        if (!args[1]) {
            setOutputMessage(
                <span>
                    Loading the squad's data! Please hold.
                </span>)

            Promise.all(await fetchAllPlayers(["xruprim", "hockeyHeld", "PhantomGod73", "IIJulianll", "Widder7013", "Koen_Meneer"])).
                then(
                    (players) => {
                        players.sort((first, second) => {
                            return second.currentMMR - first.currentMMR
                        }
                        )
                        return players
                    }).then((sorted) => {
                        setOutputMessage(
                            sorted.map((player, index) => {
                                // Try to make the "═" the same length as others.
                                const fillLength = Math.ceil((60 - player.username.length) / 2)
                                return (
                                    <>

                                        <span key={index}>
                                            {`${"═".repeat(fillLength)}${player.username}${"═".repeat(fillLength)}`}
                                        </span>
                                        <br />
                                        {/* Here we display the stats */}
                                        <div className="stats">
                                            current mmr:
                                            <span style={{ "color":"#6cf03c"}}>
                                                 {player.currentMMR}

                                            </span>
                                            {/* <br /> */}
                                            <span>
                                                | wins: {player.wins} |

                                            </span>
                                            <span>
                                                time played: {player.timePlayed}
                                            </span>
                                            <br />
                                            <br />
                                        </div>
                                            <br />

                                    </>
                                )
                            })

                        )

                    })

        } else {
            api.userInfo("xruprim", "pc").then((userInfo) => {
                console.log(userInfo);
                setOutputMessage(
                    <span>
                        ══════════════════════{userInfo.username}══════════════════════
                    </span>)

            })

        }

        setReadOnly(true)
    }
    async function fetchAllPlayers(players) {
        let promises = []
        players.forEach(player => {
            const promise = api.userInfo(player, "pc")
            promises.push(promise)
        });
        return promises
        // const yo = await api.userInfo("xruprim", "pc")
        // const yo1 = await api.userInfo("hockeyheld", "pc")
        // const yo2 = await api.userInfo("PhantomGod73", "pc")
        // const yo3 = await api.userInfo("IIJulianll", "pc")
        // return [yo,yo1,yo2,yo3]
    }
}

export default run