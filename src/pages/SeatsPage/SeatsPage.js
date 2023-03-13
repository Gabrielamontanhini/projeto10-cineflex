import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useLocation, useParams } from "react-router-dom"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"


export default function SeatsPage() {

    const { IdSessao } = useParams()

    const [data, SetData] = useState([])
    const [day, SetDay] = useState([])
    const [seats, SetSeats] = useState([])
    const [movie, setMovie] = useState([])
    const [takeSeat, setTakeSeat] = useState([])
    const [numSeat, setNumSeat]=useState([])

    const [name, setName] = useState("")
    const [cpf, setCpf] = useState()
    const navigate = useNavigate()
    


    useEffect(() => {
        const url = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${IdSessao}/seats`
        const promise = axios.get(url)
        promise.then(ans => {
            SetData(ans.data)
            console.log(ans.data)
            SetDay(ans.data.day)
            setMovie(ans.data.movie)
            SetSeats(ans.data.seats)
        })
        promise.catch(err => console.log(err.response.data))
    }, [])


    function book(e) {
        e.preventDefault()
        const urlPost = "https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many"
        const requisition = {ids: takeSeat, name, cpf }
        const promise = axios.post(urlPost, requisition)
        promise.then(ans => console.log("deu certo"))
        promise.catch(err => alert(err.response.data))
    console.log(requisition)
    }


function bookSeat(id, num, isAvailable){
    setTakeSeat([...takeSeat, id])
    setNumSeat([...numSeat, num])
    if (!isAvailable){
        alert("Esse assento não está disponível")
    }
}

    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>

                {seats.map((seat) =>
                          <div data-test="seat">
                    <SeatItem 
                    key={seat.id}
                    id={seat.id}
                    num={seat.name}
                    free={seat.isAvailable}
                    state={!seat.isAvailable ? "unavailable" :
                                (takeSeat.includes(seat.id) ? "selected" : "available")}
                                onClick={()=>bookSeat(seat.id, seat.name, seat.isAvailable)} 
                    >
                        {seat.name}
                    </SeatItem>
                    </div>
                )}
                
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <SelectedCircle />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <FreeCircle />
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <TakenCircle />
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer onSubmit={book}>


                <label htmlFor="name">Nome do Comprador:</label>
                <input
                    data-test="client-name"
                    id="name"
                    type="text"
                    placeholder="Digite seu nome..."
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                />

                <label htmlFor="cpf">CPF do Comprador:</label>
                <input
                    data-test="client-cpf"
                    id="cpf"
                    type="number"
                    placeholder="Digite seu CPF..."
                    required
                    value={cpf}
                    onChange={e => setCpf(e.target.value)}
                />

                <Link 
                to={"/sucesso"}
                state={{"movie": movie,
                        "data": data,
                        "seats": numSeat,
                        "name": name,
                        "cpf":cpf
                    }}
                ><button type="submit" > Reservar assento(s)</button></Link>
            </FormContainer>

            <FooterContainer >
                <div data-test="footer">
                    <img src={movie.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{movie.title}</p>
                    <p>{day.weekday} - {data.name}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const COLORS = [
    {
        background:"#C3CFD9",
        borders:"#7B8B99" //disponivel
    },
    {
        background:"#FBE192",
        borders:"#F7C52B"
    },
    {
        background:" #1AAE9E",
        borders:"#0E7D71" //selecionado
    }
]

const SeatItem = styled.div`

    background-color:${props => {
        if (!props.free) {
            return "#FBE192"
        } else {
            if (props.free && props.state === "available") {
                return "#C3CFD9"
            } else {
                return "#1AAE9E"
            }
        }
    }};
    border: 1px solid ${props => {
        if (!props.free) {
            return "#F7C52B"
        } else {
            if (props.free && props.state === "available"){
                return "#7B8B99"
            } else {
                return "#0E7D71" 
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

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.form`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: 1px solid blue;         // Essa cor deve mudar
    background-color: lightblue;    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const FreeCircle = styled.div`
border: 1px solid #7B8B99;        // Essa cor deve mudar
    background-color: #C3CFD9;   // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const SelectedCircle = styled.div`
background: #1AAE9E;
border: 1px solid #0E7D71;  // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const TakenCircle = styled.div`
background: #FBE192;
border: 1px solid #F7C52B;  // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`


const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`

const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`
