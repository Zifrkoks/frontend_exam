import React from "react";
import {Container, Card, Spinner, Row, Col} from "react-bootstrap";
import {observer} from "mobx-react";
import Form from "../components/Form";

const mapping = {
    "acid_power": "Сила кислоты",
    "wind_speed": "Скорость ветра",
    "earthquake_power": "Амплитуда землетрясения",
    "date": "Дата события",
    "victims": "Марсиан пострадало",
    "acid_rain": "Кислотный дождь",
    "hurricane": "Ураган",
    "earthquake": "Землетрясение"
}

function getDescription(event = {}) {
    switch (event.type) {
        case "acid_rain":
            return mapping["acid_power"] + ": " + event.acid_power
        case "hurricane":
            return mapping["wind_speed"] + ": " + event.wind_speed
        case "earthquake":
            return mapping["earthquake"] + ": " + event.earthquake_power
        default:
            return ""
    }
}


const EventsPage = observer(() => {
    const [jsonContent, setJsonContent] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        setLoading(true)
        fetch("https://demo-api.vsdev.space/api/elonus/events")
            .then((res) => res.json())
            .then(data => setJsonContent(data))
            .then(_ => setLoading(false))
    }, [])
    


    function ImgElement(props){
        const widthImg = "320";
        const heightImg = "150";

        switch(props.type){
        case "acid_rain":
            return <Card.Img width={widthImg} height={heightImg} src = "/rain_img.jpg"/>
        case "hurricane":
            return <Card.Img width={widthImg} height={heightImg} src = "/hurricane_img.jpg"/>
        case "earthquake":
            return <Card.Img width={widthImg} height={heightImg} src = "/earthquake_img.jpg" />
        default:
            return "type"
        }
    }
    function ImgElement(props){
        const widthImg = "320";
        const heightImg = "150";

        switch(props.type){
        case "acid_rain":
            return <Card.Img width={widthImg} height={heightImg} src = "/rain_img.jpg"/>
        case "hurricane":
            return <Card.Img width={widthImg} height={heightImg} src = "/hurricane_img.jpg"/>
        case "earthquake":
            return <Card.Img width={widthImg} height={heightImg} src = "/earthquake_img.jpg" />
        default:
            return "type"
        }
    }
    function Footer(props){
        switch(props.type){
            case "acid_rain":
                return <Card.Footer style={{backgroundColor: '#FFE4C4'}}>{mapping["date"]}: {props.date}</Card.Footer>
            case "hurricane":
                return <Card.Footer style={{backgroundColor: '#7FFFD4'}}>{mapping["date"]}: {props.date}</Card.Footer>
            case "earthquake":
                return <Card.Footer style={{backgroundColor: '#BDB76B'}}>{mapping["date"]}: {props.date}</Card.Footer>
            default:
                return "type"
            }
    }


    return (
        <Container style={{marginTop: "1rem"}}>
            <Form/>
            {loading ? (
                    <Spinner animation={"border"} role={"status"} className={"align-jsonContent-center"}>
                        <span className="visually-hidden">Загрузка...</span>
                    </Spinner>
                ) :
                (<Row xs={1} md={2} className={"g-4 mt-1"}>
                    {jsonContent.map(event =>
                        <Col>
                            <Card>
                                <ImgElement type = {event.type}></ImgElement>
                                <Card.Title>{mapping[event.type]}</Card.Title>
                                <Card.Text>
                                    {getDescription(event)}
                                </Card.Text>
                                <Card.Text>
                                    {mapping["victims"]}: {event.victims}
                                </Card.Text>
                                
                                <Footer type = {event.type} date = {event.date}/>
                            </Card>
                        </Col>
                    )}
                </Row>)}
        </Container>
    )
})

export default EventsPage;
