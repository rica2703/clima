import css from '../../css/main.css';
import Label from '../atomos/Label';
import textos from '../../js/main';
function Pronostico(props){
    return(
        <>
        
                <div className="cuerpoIzquierdo">
                    <Label textoLabel={props.textoLabel1} />
                    <Label textoLabel={props.textoLabel2} />
                    <Label textoLabel={props.textoLabel3} />
                    <Label textoLabel={props.textoLabel4} />
                    <Label textoLabel={textos.precipitacion} />
                    <Label textoLabel={textos.humedad} />
                </div>
                <div className="cuerpoIzquierdoDerecho">
                    <Label className="" textoLabel={props.textoLabel7} />
                    <Label className="" textoLabel={ props.textoLabel8} />
                    <Label className="" textoLabel={ props.textoLabel9} />
                    <Label className="" textoLabel={props.textoLabel10} />
                    <Label className="" textoLabel={props.textoLabel11} />
                    <Label className="" textoLabel={props.textoLabel12} />

                </div>
           
        </>
    );
}
export default Pronostico;