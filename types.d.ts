type DropDownStyledProps ={
    height? : number | string,
    width? : number | string,

}
type Options = {
    value : string | number,
    label: string
}
type DropDownProps = {
    height? : number | string,
    width? : number | string,
    defaultOption : any,
    onChange : Dispatch<SetStateAction<null>>,
    options : { value : string | number,label : string}[],
    placeHolder? : string,
    styleProps? : Object<any>,
    isMultipleSelect? : boolean,
    isTypeSearch?  : boolean 
}