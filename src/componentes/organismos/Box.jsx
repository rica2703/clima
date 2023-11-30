import Boton from "../atomos/Boton";
import Titulo from "../atomos/Titulo";
import Input from "../atomos/Input";
import Label from "../atomos/Label";
import Opciones from "../moleculas/opciones";
import css from '../../css/main.css';
import Alerta from "../moleculas/alerta";
import Pronostico from "../moleculas/pronosticoIzquierdo";
import textos from '../../js/main';
import { useEffect, useState } from "react";

const API_WEATHER = `http://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_API_KEY}&lang=es&q=`;
function Box() {
    const [grado, setGrado] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [datoMal, setDatoMal] = useState(false);
    const handlerChangeCiudad = (e) => {
        setCiudad(e.target.value);
    }

    const [mostrarOpciones, setMostrarOpciones] = useState(false);


    const [weather, setWeather] = useState({
        city: "",
        country: "",
        region: "",
        temp: "",
        condition: "",
        icon: "",
        conditionText: "",
        localTime: "",
        latitud: "",
        longitud: "",
        tempf: "",
        precipitacion: "",
        humedad: "",

    });
    const [suchiapa, setSuchiapa] = useState({
        city: "",
        country: "",
        region: "",
        temp: "",
        condition: "",
        icon: "",
        conditionText: "",
        localTime: "",
        latitud: "",
        longitud: "",
        tempf: "",
        precipitacion: "",
        humedad: "",
    });

    const [gradoS, setGradoS] = useState("");

    useEffect(() => {
        async function fetchData() {
            const resp = await fetch(API_WEATHER + "suchiapa");
            const data2 = await resp.json();

            setSuchiapa({
                cty: data2.location.name,
                country: data2.location.country,
                temp: data2.current.temp_c,
                condition: data2.current.condition.code,
                icon: data2.current.condition.icon,
                conditionText: data2.current.condition.text,
                localTime: data2.location.localtime,
                region: data2.location.region,
                latitud: data2.location.lat,
                longitud: data2.location.lon,
                tempf: data2.current.temp_f,
                precipitacion: data2.current.precip_mm,
                humedad: data2.current.humidity,
            });
            setGradoS("º");
        }

        fetchData();
    }, []);

    const handleClick = async () => {
        try {
            if (!ciudad.trim()) {
                throw {
                    message: "Ingresa una ciudad"
                }
            }
            else {
                const response = await fetch(API_WEATHER + ciudad);
                const data = await response.json();
                if (data.error) {
                    throw { message: data.error.message }
                }
                else {
                    setWeather({
                        city: data.location.name,
                        country: data.location.country,
                        temp: data.current.temp_c,
                        condition: data.current.condition.code,
                        icon: data.current.condition.icon,
                        conditionText: data.current.condition.text,
                        localTime: data.location.localtime,
                        region: data.location.region,
                        latitud: data.location.lat,
                        longitud: data.location.lon,
                        tempf: data.current.temp_f,
                        precipitacion: data.current.precip_mm,
                        humedad: data.current.humidity,
                    });
                    setGrado("º");
                }
            }

        } catch (error) {
            setDatoMal(true);
            setError({ error: true, message: error.message });
        }


    }

    const [favorito, setFavorito] = useState({
        ciudad: "",
        region: "",
        country: "",
        temp: "",
        icon: "",
        precipitacion:"",
        humedad:"",
    });
    const handleClickFavorito = () => {
        setFavorito(
            {
                ciudad: weather.city,
                region: weather.region,
                country: weather.country,
                temp: weather.temp,
                icon: weather.icon,
                precipitacion:weather.precipitacion,
                humedad:weather.humedad,
            }
        )
    }
    return (
        <>
            <div className="padre">
                <Titulo className="titulo" textoTitulo={textos.textoDelTituloJs} />
                <div className="suchiapa">
                    <Label textoLabel={suchiapa.city} />
                    <Label textoLabel={suchiapa.region} />
                    <Label textoLabel={suchiapa.country} />
                    <Label textoLabel={suchiapa.temp} />
                    <Label textoLabel={gradoS} />
                    <img src={suchiapa.icon} alt="" />
                </div>
                <div className="footerDerecho">
                    <Input name="ciudad" type="text" onChange={handlerChangeCiudad} className="ciudadBuscador" placeholder="Ciudad o estado" />
                    <Boton textoBoton={textos.textoBoton} onClick={() => handleClick()} className="botonBuscar" />
                    {/* <Boton textoBoton={textos.opcion} className="botonOpcion" /> */}
                    <Boton textoBoton={textos.opcion} onClick={() => setMostrarOpciones(true)} className="botonOpcion" />
                </div>
            </div>
            <div className="cuerpoPadre">
                <Pronostico textoLabel1={textos.latitud} textoLabel2={textos.longitud} textoLabel3={textos.fecha} textoLabel4={textos.temperaturaF} textoLabel7={suchiapa.latitud} textoLabel8={suchiapa.longitud} textoLabel9={suchiapa.localTime} textoLabel10={suchiapa.tempf + "º"} textoLabel11={suchiapa.precipitacion} textoLabel12={suchiapa.humedad} />
                <div className="primerHijo">
                    <Label className="" textoLabel={weather.city} />
                    <Label className="" textoLabel={weather.region} />
                    <Label className="" textoLabel={weather.country} />
                    <div className="segundoHijo">
                        <Label className="" textoLabel={weather.temp} />
                        <Label className="" textoLabel={grado} />
                    </div>
                    <div className="tercerHijo">
                        <img src={weather.icon} alt="" />
                    </div>
                    {weather.city !== "" ? <Boton className="boton-corazon" onClick={() => handleClickFavorito()} /> : null}
                </div>
                {/* <Opciones textoLabel1={favorito.ciudad} textoLabel2={favorito.region} textoLabel3={favorito.country} textoLabel4={favorito.temp} src={favorito.icon} /> */}
                {mostrarOpciones && (
                    <div className="ventana-emergente">
                        <div className="ventana-content">
                            {favorito.ciudad !== "" ? <Opciones
                                textoLabel1={favorito.ciudad}
                                textoLabel2={favorito.region}
                                textoLabel3={favorito.country}
                                textoLabel4={favorito.temp + "º"}
                                src={favorito.icon}
                                textoLabel5={textos.precipitacion+favorito.precipitacion}
                                textoLabel6={textos.humedad+favorito.humedad}
                            /> : null
                            }
                            <Boton onClick={() => setMostrarOpciones(false)} textoBoton={textos.botonC} className="botonBuscar" />
                        </div>
                    </div>
                )}

                {datoMal && (
                    <div>
                        <Alerta onClick={() => setDatoMal(false)} />
                    </div>
                )}

            </div >





        </>
    );
}
export default Box;