import React, {Dispatch, FC, RefObject, SetStateAction, useEffect, useRef} from "react";
import {Mesh} from "three";

type Props = {
    setPlayer: Dispatch<SetStateAction<RefObject<Mesh>>>
}

export const Player: FC<Props> = ({setPlayer}) => {
    //give our app reference to this player object
    const player = useRef<Mesh>(null!)

    // trigger on component mount
    useEffect(() => {
        setPlayer(player)
    }, [setPlayer])

    return (
        <mesh
            ref={player}
        >
            <boxGeometry attach={"geometry"}/>
            <meshLambertMaterial attach={"material"} color={'orange'} />
        </mesh>
    )
}