import Boton from "../atomos/Boton";
import Label from "../atomos/Label";
import css from '../../css/main.css';
import textos from '../../js/main';
function Opciones(props) {
    return (
        <>
        <div>
            <Label textoLabel={textos.favorito}/>
            <Label className="" textoLabel={props.textoLabel1} />
            <Label className="" textoLabel={props.textoLabel2} />
            <Label className="" textoLabel={props.textoLabel3} />
            <Label className="" textoLabel={props.textoLabel4} />
            <Label textoLabel={props.textoLabel5}/>
            <Label textoLabel={props.textoLabel6}/>
           <img src={props.src} alt="" />
            </div>
        </>
    );
}
export default Opciones;