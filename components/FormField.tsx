type Props = {
    type?: string;
    title: string;
    state: string;
    placeholder: string;
    isTextArea?: boolean;
    setState: (value: string) => void;
}


const FormField = ({type, title, state, placeholder, isTextArea, setState} : Props) => {
  return (
    <div className="flex flex-col items-center justify-start w-full gap-4">
        <label className="w-full">{title}</label>
        {
            isTextArea ? (
            <textarea 
            placeholder={placeholder}
            value={state}
            required
            className="w-full outline-0 rounded-xl p-4 bg-[#F1F4F5]"
            onChange={(e)=>setState(e.target.value)}
            />) : 
            <input 
            type={type || "text"}
            placeholder={placeholder}
            value={state}
            required
            className="w-full outline-0 rounded-xl p-4 bg-[#F1F4F5]"
            onChange={(e)=>setState(e.target.value)}
            />
        }
    </div>
  )
}

export default FormField