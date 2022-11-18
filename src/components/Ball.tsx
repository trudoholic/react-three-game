import React, {Dispatch, FC, RefObject, SetStateAction, useEffect, useRef} from "react";
import {Mesh} from "three";

export interface IBall {
    pos: { x: number, y: number }, nonce: number
}

type Props = {
    ball: IBall
}

export const Ball: FC<Props> = ({ball}) => {
    //give game ref to ball
    const ref = useRef<Mesh>(null!)
    // ball.ref = ref

    return (
        <mesh
            position={[ball.pos.x, ball.pos.y, 0]}
            ref={ref}
        >
            <sphereGeometry attach={"geometry"} args={[0.25, 16, 16]} />
            <meshLambertMaterial attach={"material"} color={'pink'} />
        </mesh>
    )
}