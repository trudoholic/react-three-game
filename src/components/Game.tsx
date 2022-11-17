import React, {RefObject, useEffect, useRef, useState} from "react";
import {Player} from "./Player"
import {Mesh} from "three";

export const Game = () => {

    const [player, setPlayer] = useState<RefObject<Mesh>>(null!)
    const [mounted, setMounted] = useState(false)

    //set up listeners
    // useEffect(() => {
    //     generateBalls();
    // }, []);

    useEffect(() => {
        if (!mounted) {
            setUpListeners();
        }
    }, [player, mounted])

    // useEffect( () => {
    //     wait(1000)
    //         .then(() => setTime(t => t + 1000));
    // }, [time]);
    // useEffect(() => {
    //     checkIfCollide();
    // }, [player, balls]);

    const setUpListeners = () => {
        if (player && player.current) {
            //only want listeners to be created once so setMounted true so doesn't fire again
            setMounted(true);
            window.addEventListener('keydown', (e) => {
                //player has been created
                switch (e.key) {
                    case 'w':
                        player.current!.position.y += 0.2
                        break;
                    case 's':
                        player.current!.position.y -= 0.2
                        break;
                    case 'd':
                        player.current!.position.x += 0.2
                        break;
                    case 'a':
                        player.current!.position.x -= 0.2
                        break;
                    default:
                        break;
                }
                //to force update state
                setPlayer(Object.create(player));
            })
        }
    }

    return (
        <Player setPlayer={setPlayer}/>
        // {balls.current.map((ball, i) => {
        //     return <Ball ball={ball} key={`${ball.pos.x}-${ball.pos.y}-${ball.nonce}`}/>
        // })}
    )
}