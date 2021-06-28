import AnalogyList from '../public/analogy.json'
import {useState, useEffect, useRef} from 'react'
import Link from 'next/link'


function getRandomInt(max: number) {
    return Math.floor(Math.random() * max)
}

function generateNewAnalogy() {
    var fromIdx = getRandomInt(AnalogyList.from.length)
    var toIdx = getRandomInt(AnalogyList.to.length)

    return [AnalogyList.from[fromIdx], AnalogyList.to[toIdx]]
}


function Analogy() {

    var [fromElement, toElement] = generateNewAnalogy()

    const minRounds = 1, maxRounds = 6, defaultRounds = 0
    const minDuration = 1, maxDuration = 6, defaultDuration = 0
    
    const [from, setFromElement] = useState(fromElement)
    const [to, setToElement] = useState(toElement)
    const [rounds, setRounds] = useState(defaultRounds)
    const [duration, setDuration] = useState(defaultDuration)
    const [gameState, setGameState] = useState('Game')

    const roundsRef = useRef(null)
    const durationRef = useRef(null)


    useEffect(() => {
        if (rounds > 0) {
            console.log(`[INFO: OnComponentDidMount] Rounds: ${rounds}, Duration: ${duration}`)
            setGameState(`${rounds}`)
            setTimeout(() => {
                [fromElement, toElement] = generateNewAnalogy()
                setFromElement(fromElement)
                setToElement(toElement)
                setRounds(rounds - 1)
            }, duration)
        } 

        return () => {
            setGameState('Game Over')
        }
    }, [rounds, duration])


    const onGameStart = () => {

        // I don't get what in the world is the problem with this
        // before the null check the ts linter kept complaining
        // about the possible nullness of the object, so added a
        // null check, the error still is not going away. 
        // Coming from C++, my understanding is that the if 
        // block shouldn't work because of the shortcircuiting
        // so there is no problem. 🤷‍♂️
        if (roundsRef.current !== null && 
            roundsRef.current.value >= minRounds && 
            roundsRef.current.value <= maxRounds) {
            setRounds(roundsRef.current.value)
        }

        if (durationRef.current !== null &&
            durationRef.current.value >= minDuration &&
            durationRef.current.value <= maxDuration) {
            setDuration(durationRef.current.value * 1000) // Because timeout takes milliseconds
        }

        console.log(`[INFO: OnGameStart::Refs] Rounds: ${roundsRef.current.value}, Duration: ${durationRef.current.value * 1000}`)
        console.log(`[INFO: OnGameStart::StateVar] Rounds: ${rounds}, Duration: ${duration}`)
    }

    return (
        <div className="container disable-select">
            <main>
                <Link href="/"><a><p className="title"><strong>Ultraspeaking <span className="oss"><em>opensource</em></span></strong></p></a></Link>
                <h1>Analogies and Metaphors</h1>
                <p className="gamedesc">The objective of this game is to let your brain's autocomplete function take the center stage. Speak before you think!</p>
                <div className="game">
                    <div className="gamebox">
                        <h3 className="state">{ gameState }</h3>
                        <div className="rule"></div>
                        <p className="analogy">A <strong>{from}</strong> is like <strong>{to}</strong> Because...</p>                        
                    </div>
                    <div className="gamesettings">
                        <h4>Settings</h4>
                        <div className="rule"></div>
                        <div className="form-group">
                            <label htmlFor="rounds"><span>Rounds</span></label>
                            <input ref={roundsRef} type="number" name="rounds" min="1" max="6" placeholder="0"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="duration"><span>Duration</span></label>
                            <input ref={durationRef} type="number" name="duration"  min="2" max="6" placeholder="0s"/>
                        </div>
                        <button className="start" onClick={onGameStart}>Start</button>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Analogy