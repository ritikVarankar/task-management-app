import type { ComponentProps } from 'react';
interface InputGroupProps extends ComponentProps<"input"> {
    labelName: string;
    labelClassName: string;
    classDivName: string;
    classErrorName: string;
    classInputName: string;
    classIconName: string;
    inputtype: string;
    iconshow: boolean;
    error: boolean;
}
export default function TextInput({ labelName,labelClassName, classDivName, classErrorName, classInputName, classIconName, iconshow, error, inputtype, ...otherProps }:InputGroupProps) {
    
    return (
        <>
            { labelName ? (<div className={labelClassName}>{ labelName }</div>) : null }
            <div className={ error ? `${classDivName}${' error-field'}` : classDivName } >
                {
                    iconshow ? (
                        <i className={classIconName}></i>
                    ) : null
                }

                <input type={inputtype} className={classInputName} {...otherProps}  />

            </div>
            {error ? (<div className={classErrorName}>{error}</div>) : null}
        </>
    );
}