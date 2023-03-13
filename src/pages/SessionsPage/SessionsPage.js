import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import styled from "styled-components"


export default function SessionsPage() {
    const [session, setSession] = useState(undefined)
    const { IdFilme } = useParams()

    useEffect(() => {
        const url = `https://mock-api.driven.com.br/api/v8/cineflex/movies/${IdFilme}/showtimes`
        const promise = axios.get(url)
        promise.then(ans => {
            console.log(ans.data)
            setSession(ans.data)
        })
        promise.catch(err => console.log(err.response.data))
    }, [])

    if (session === undefined) {
        return (
            <PageContainer>
                <h1>Carregando...</h1>
            </PageContainer>
        )
    }

    return (
        <PageContainer>
            Selecione o horário
            <div>
                {session.days.map((day) => (
                    <SessionContainer key={day.id} data-test="movie-day">
                        {day.weekday} - {day.date}
                        <ButtonsContainer>
                            {day.showtimes.map((sess) => (
                            <Link to={`/assentos/${sess.id}`} key={sess.id}> <button data-test="showtime">{sess.name}</button></Link>
                            )
                            )}
                        </ButtonsContainer>
                    </SessionContainer>
                ))}
            </div>
            <FooterContainer >
                <div data-test="footer">
                    <img src={session.posterURL} alt="poster" />
                </div>
                <div data-test="footer">
                    <p>{session.title}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
    div {
        margin-top: 20px;
    }
`
const SessionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: 'Roboto';
    font-size: 20px;
    color: #293845;
    padding: 0 20px;
`
const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0;
    button {
        margin-right: 20px;
    }
    a {
        text-decoration: none;
    }
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