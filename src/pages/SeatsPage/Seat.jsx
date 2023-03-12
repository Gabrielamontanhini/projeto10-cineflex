import { useState } from "react"
import styled from "styled-components"

export default function Seat({ id, free, num }) {
    const [taken, SetTaken] = useState(false)


    function select(free) {
        if (free == true) {
            if (taken == true) {
                SetTaken(false)
            } else {
                SetTaken(true)
            }
        } else {
            alert("esse nnn porra")
        }

    }

    return (
        <SeatItem key={id} free={free} taken={taken} onClick={() => select(free)}>
            {num}
        </SeatItem>
    )
}


const SeatItem = styled.div`

    background-color:${props => {
        if (props.taken == true) {
            return "#1AAE9E"
        } else {
            if (props.free == true) {
                return "#C3CFD9"
            } else {
                return "#FBE192"
            }
        }
    }};
    border: 1px solid ${props => {
        if (props.taken == true) {
            return "#0E7D71"
        } else {
            if (props.free == true) {
                return "#7B8B99"
            } else {
                return "#F7C52B"
            }
        }
    }}; 
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
