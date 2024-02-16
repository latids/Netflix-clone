interface InputProps {
  id: string;
  onChange: any;
  value: string;
  label: string;
  type?: string;
}

const Input: React.FC<InputProps> = ({ id, onChange, value, label, type }) => {
  return (
    <div className="relative">
      <input
        id={id}
        value={value}
        onChange={onChange}
        required
        type={type}
        className="block px-6 pt-6 pb-1 w-full text-white rounded-md peer
                    bg-neutral-700 appearance-none focus:outline-none ring-0 "
        placeholder=" "
      />
      <label
        htmlFor={id}
        className="absolute duration-200 text-md text-zinc-500 transform -translate-y-3 scale-75 
                   z-10 top-3 origin-[0] left-6 peer-placeholder-shown:translate-y-0
                   peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-3"
      >
        {label}
      </label>
    </div>
  );
};
export default Input;
