import { upload } from '@/services/modules/wenda';
import Editor from 'for-editor'
import { useEffect, useState } from 'react';

interface IProps {
    onChange?: (value: string) => void
    onSave?: (value: string) => void
    addImg?: (file: File, index: number) => void
    [key: string]: any
}
const MdEditor: React.FC<IProps> = props=>{
    let [value, setValue] = useState(props.value);

    useEffect(()=>{
        props.onChange && props.onChange(value);
    }, [value]);

    async function uploadImg(file: File){
        let form = new FormData();
        form.append('img', file);
        let result = await upload(form);
        let {path} = result.data[0];
        setValue(`${value}![${file.name}](${path})`);
    }

    return <Editor {...props} value={value} onChange={value=>setValue(value)} addImg={(file, index)=>uploadImg(file)}/> 
}

export default MdEditor;