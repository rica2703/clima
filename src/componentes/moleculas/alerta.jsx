import Titulo from "../atomos/Titulo";
import Boton from "../atomos/Boton";
import css from '../../css/main.css';
import textos from '../../js/main';
function Alerta(props){
    return(
        <>
        <div className="alerta">
            <div>
            <Titulo textoTitulo={textos.alerta} className=""/>
            <Boton className="botonBuscar" textoBoton={textos.botonC} onClick={props.onClick}/>
            </div>
        </div>
        </>
    );
}
export default Alerta;