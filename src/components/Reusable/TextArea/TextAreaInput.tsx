import type { ComponentProps } from 'react';
interface InputGroupProps extends React.HTMLProps<HTMLTextAreaElement> {
    labelName: string;
    labelClassName: string;
    classDivName: string;
    classErrorName: string;
    classInputName: string;
    error: boolean;
}
export default function TextAreaInput({ labelName,labelClassName, classDivName, classErrorName, classInputName, error, ...otherProps }:InputGroupProps) {
    
    return (
        <>
            { labelName ? (<div className={labelClassName}>{ labelName }</div>) : null }
            <div className={ error ? `${classDivName}${' error-field'}` : classDivName } >

                <textarea className={classInputName} {...otherProps}  />

            </div>
            {error ? (<div className={classErrorName}>{error}</div>) : null}
        </>
    );
}