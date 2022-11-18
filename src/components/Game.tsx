import React, {RefObject, useEffect, useRef, useState} from "react";
import {wait} from "@testing-library/user-event/dist/utils";
import {Mesh} from "three";
import {Player} from "./Player";
import {Ball, IBall} from "./Ball";

export const Game = () => {

    const balls = useRef<IBall[]>([])
    const [time, setTime] = useState(0)
    const [player, setPlayer] = useState<RefObject<Mesh>>(null!)
    const [mounted, setMounted] = useState(false)

    //set up listeners
    useEffect(() => {
        generateBalls();
    }, [])

    useEffect(() => {
        if (!mounted) {
            setUpListeners();
        }
    }, [player, mounted])

    useEffect( () => {
        wait(1000)
            .then(() => setTime(t => t + 1000));
    }, [time])

    useEffect(() => {
        checkIfCollide();
    }, [player, balls])

    const generateBalls = () => {
        window.setInterval(() => {
            balls.current.push({
                pos: {
                    x: Math.floor(Math.random() * 10) - 5,
                    y: Math.floor(Math.random() * 10) - 5
                },
                nonce: Math.floor(Math.random() * 1000)
            })
        }, 5000)
    }

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

    const checkIfCollide = () => {
        if (player) {
            for (let i = 0; i < balls.current.length; i++) {
                if (Math.floor(player.current!.position.x) === balls.current[i].pos.x &&
                    Math.floor(player.current!.position.y) === balls.current[i].pos.y
                ) {
                    balls.current.splice(i, 1)
                    console.log('Yummy!')
                    break
                }
            }
        }
    }

    return (
        <>
            <Player setPlayer={setPlayer}/>
            {balls.current.map((ball, i) => {
                return <Ball ball={ball} key={`${ball.pos.x}-${ball.pos.y}-${ball.nonce}`}/>
            })}
        </>
    )
}