function Input(props){
    return <input name={props.name} onChange={props.onChange} type={props.type} className={props.className} placeholder={props.placeholder} />
}
export default Input;