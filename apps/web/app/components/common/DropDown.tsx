type DropDownList = {
    label: string;
    value: string;
};

type CustomDropdownProps = {
    isOpen: boolean;
    onClose: (value: string) => void;
    dropDownItems: DropDownList[];
};

const CustomDropdown: React.FC<CustomDropdownProps> = ({ isOpen, onClose, dropDownItems }) => {
    return (
        isOpen && (
            <div id="custom-dropdown" 
            className="absolute right-0 mt-2 w-auto min-w-48 bg-white shadow-[0px_0px_24px_0px_rgba(0,0,0,0.25)] rounded-md">
                <ul className="py-2">
                    {dropDownItems.map((item) => (
                        <li
                            className="px-4 py-2 text-center text-neutral-999 font-lato text-sm normal-case font-normal leading-normal hover:bg-gray-200 cursor-pointer"
                            onClick={() => onClose(item.value)}
                            key={item.value}
                        >
                            {item.label}
                        </li>
                    ))}
                </ul>
            </div>
        )
    );
};

export default CustomDropdown;