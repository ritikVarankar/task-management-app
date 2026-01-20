import type { ComponentProps } from 'react';
interface optionProps{
    value:string;
    label:string;
}
interface InputGroupProps extends ComponentProps<"select"> {
    labelName: string;
    labelClassName: string;
    classDivName: string;
    classErrorName: string;
    classInputName: string;
    classIconName: string;
    selectVisibleText: string;
    placeholder:string;
    error: boolean;
    selectVisible: boolean;
    optionData:optionProps[];
}
export default function CustomSelect({ selectVisible,selectVisibleText,placeholder, labelName,labelClassName, optionData, classDivName, classErrorName, classInputName, classIconName, error, ...otherProps }:InputGroupProps) {
    return (
        <>
            { labelName ? (<div className={labelClassName}>{ labelName }</div>) : null }
            <div className={ error ? `${classDivName}${' error-field'}` : classDivName } >
                <select className={classInputName}  {...otherProps} >
                    {
                        selectVisible ? '' : (
                        <option value="">{ selectVisibleText ? selectVisibleText : 'Select'}</option>
                        )
                    }
                    {
                        optionData.map((dt:any,index:number)=>(
                            <option key={String(index)} value={dt.value}>{dt.label}</option> 
                        ))
                    }
                </select>

            </div>
            {error ? (<div className={classErrorName}>{error}</div>) : null}
        </>
    );
}