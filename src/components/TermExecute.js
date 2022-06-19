import { asciiAnnes, availableCommands, futureCommands } from "../assets/jsxElements"
import './../index.css';
import $ from 'jquery';

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
    scrollSmoothlyToBottom("outline")


    function help() {
        setReadOnly(true)
        if (!args[1]) {
            setOutputMessage(<>

                <p>{"Currently available commands:"}</p>
                <div className="margin-0" style={{ "color": "green" }}>

                    {availableCommands}
                </div>
                <p>{"Commands that will be avaiable in the future:"}</p>
                {futureCommands}
                <p>
                    PS : Commands marked with a <span style={{ color: "red" }}>*</span>, have additional arguments, type "<a className="highlight-color">help r6</a>" for example.
                </p>
            </>
            )
            return
        }

        // User specified a command for help.
        switch (args[1]) {
            case "r6":
                setOutputMessage(<>
                    <p>This command displays the Rainbow Six Siege stats of a given player.</p>
                    <p>Usage: <a className="highlight-color">r6</a></p>
                    <p>Using r6 without argument lists the squads stats!</p>
                    <br/>
                    <p>Usage: <a className="highlight-color">r6</a> {"<playername>"} <a className="dimmed-color">{"[platform]"}</a></p>
                    <p>The platform here is PC as a default, but can be specified to : {"[xbox,psn]"}</p>
                </>)
                break
        }
    }

    function welcome() {
        setReadOnly(true)
        setOutputMessage(<>
            {asciiAnnes}
            <br></br>
            <p>
                Hello my name is <a className="highlight-color">Annes Negmel-Din</a> and this is my interactive portfolio.
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
                My name is <a className="highlight-color">Annes Negmel-Din</a> and I'm {age} years and {days} days old.
            </p>)
        setReadOnly(true)
    }

    function clear() {
        setReadOnly(true)
        props.clear()
    }

    function enter() {
        setReadOnly(true)
    }

    async function r6() {
        const theSquad = ["xruprim", "hockeyHeld", "PhantomGod73", "IIJulianll", "Widder7013", "Koen_Meneer"]
        //  Simply "r6", so display the squad's stats
        if (!args[1]) {
            setOutputMessage(<span>Loading the squad's data! Please hold.</span>)

            Promise.all(await fetchAllPlayers(theSquad)).
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
                                return formatStats(player, index)
                            })
                        )
                        scrollSmoothlyToBottom("outline")



                    })

            setReadOnly(true)
            return
        }

        // Case of requesting a specific players details.
        setOutputMessage(
            <span>
                Loading {args[1]}'s data! Please hold.
            </span>
        )
        const platform = args[2] ? args[2] : "pc"

        api.userInfo(args[1], platform).then((userInfo) => {
            setOutputMessage(
                formatStats(userInfo, 10)
            )
            scrollSmoothlyToBottom("outline")

        }).catch((error) => {
            setOutputMessage(
                <span>
                    {`${error}`}
                </span>
            )
            scrollSmoothlyToBottom("outline")
        })

        /**
        * This function formats the player's stats in to a nice line in HTML.
        * The top3 players get a color (gold, silver, bronze).
        * @param {object}  player object with stats inside.
        * @param {integer}  index relative to the squad members.
        * @return  formatted html
        */
        function formatStats(player, index) {
            // Try to make the "═" the same length as others.
            const filler = player.username.length % 2 ? 0 : 1
            const fillLengthStart = Math.ceil((60 - player.username.length) / 2)
            const fillLengthEnd = fillLengthStart + filler

            const leaderboardColors = ["gold", "silver", "#CD7F32"]
            const playerNameColor = index <= 2 ? leaderboardColors[index] : "white"
            console.log(playerNameColor, player.username)
            return (
                <>

                    <span key={index} style={{ "color": `${playerNameColor}` }}>
                        {`${"═".repeat(fillLengthStart)}${player.username}${"═".repeat(fillLengthEnd)}`}
                    </span>
                    <br />
                    {/* Here we display the stats */}
                    <div className="stats">
                        current mmr:
                        <span style={{ "color": "#6cf03c" }}>
                            {player.currentMMR}

                        </span>
                        <img src={player.rankIcon} className="rank-icon unselectable" />
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

        }
        async function fetchAllPlayers(players) {
            let promises = []
            players.forEach(player => {
                const promise = api.userInfo(player, "pc")
                promises.push(promise)
            });
            return promises
        }

        setReadOnly(true)
    }

}
const scrollSmoothlyToBottom = (id) => {
    const element = $(`#${id}`);
    element.animate({
        scrollTop: element.prop("scrollHeight")
    }, 500);
}



export default run