import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Forms from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Collapse from 'react-bootstrap/Collapse';
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
const Form = () => {
    const [open, setOpen] = React.useState(false);
    const [cond, setCond] = React.useState('acid_rain');

    const Zxc = () => {
        if (cond === 'earthquake') return (<Forms.Control id="earthquake_power" placeholder='Амплитуда землетрясения'/>)
        if (cond === 'hurricane') return (<Forms.Control id="wind_speed" placeholder='Скорость ветра'/>)
        if (cond === 'acid_rain') return (<Forms.Control id="acid_power" placeholder='Сила кислоты'/>)
        else return <></>
    }

    const Addimg = () => {
        if (cond === 'earthquake') return (<Image alt={""} src={"/earthquake_img.jpg"} fluid = {true} className="d-inline-block align-top"/>)
        if (cond === 'hurricane') return (<Image alt={""} src={"/hurricane_img.jpg"} fluid = {true} className="d-inline-block align-top"/>)
        if (cond === 'acid_rain') return (<Image alt={""} src={"/rain_img.jpg"} fluid = {true} className="d-inline-block align-top"/>)
        else return <></>
    } 

    const post = (e) => {
        e.preventDefault();
        console.log(e)
        let formData = new FormData();
        formData.append('type', e.target[0].value);
        formData.append('date', e.target[1].value);
        formData.append('victims', e.target[2].value);
        formData.append(`${e.target[3].id}`, e.target[3].value);
        fetch(
            "https://demo-api.vsdev.space/api/elonus/events",
            {
                method: "POST",
                headers: {
                    "Accept": 'application/json',
                },
                body: formData
            },
        )

    }

    return (
        <Container>
            <Button
                onClick={() => setOpen(!open)}
                aria-controls="collapse-form"
                aria-expanded={open}
                variant="dark"
                >
                Create Event
            </Button>
            <Container fluid>
                <Collapse in={open}>
                    <Container id="collapse-form">
                        <Row>
                            <Col sm={8}>
                                <Forms onSubmit={(e) => post(e)}>
                                    <Forms.Select onChange={(e) => setCond(e.target.value)}>
                                        <option value="acid_rain">Кислотный дождь</option>
                                        <option value="hurricane">Ураган</option>
                                        <option value="earthquake">Землетрясение</option>
                                    </Forms.Select>
                                    <Forms.Control placeholder="Дата события"/>
                                    <Forms.Control placeholder="Марсиан пострадало"/>
                                    <Zxc/>
                                    <Button variant="dark" type='submit'>SEND</Button>
                                </Forms>
                            </Col>
                            <Col sm={4}>
                                <Addimg/>
                            </Col>
                        </Row>
                    </Container>
                </Collapse>
            </Container>
        </Container>
    )
}
export default Form;