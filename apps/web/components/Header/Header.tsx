
import { ImageNotify } from '../IconUtilities/ImageNotify';
import { UserIcon } from '../IconUtilities/UserIcon';
import { ImageRender } from '../IconUtilities/ImageRender';
type ButtonsObj = {
    iconName: string;
    iconClassName: string;
    svgPath: string;
    width: number;
    height: number;
};

const buttonsArray: ButtonsObj[] = [
    {
        iconName: 'help',
        iconClassName: 'icon-help',
        svgPath: '/icons/help-icon.svg',
        width: 20,
        height: 20,
    },
    {
        iconName: 'bell',
        iconClassName: 'icon-bell',
        svgPath: '/icons/bell-icon.svg',
        width: 20,
        height: 20,
    },
    {
        iconName: 'preferences',
        iconClassName: 'icon-preferences',
        svgPath: '/icons/preferences-icon.svg',
        width: 20,
        height: 20,
    },
];

const dynamicSvgObj: ButtonsObj = {
    svgPath: "/icons/cart-icon.svg",
    iconName: "cart",
    iconClassName: 'icon-cart',
    width: 33,
    height: 22,
};

const Header: React.FC = () => {

    return (
        <header className="absolute top-0 left-0 w-full h-10 bg-themeBlueColor flex items-center justify-between px-4 shadow-sm">
            <div className="flex items-center space-x-4">
                <ImageRender
                    svgPath={"/icons/aidd-icon-shell.svg"}
                    iconName="aidd icon"
                    width={267}
                    height={24}
                />
            </div>
            <div className="flex items-center space-x-4 relative">
                {
                    buttonsArray.map((button, index) => {
                        const { iconName, svgPath, width, height } = button;
                        return (
                            <span key={index} className={button.iconClassName}>
                                <ImageRender {...{ iconName, svgPath, width, height }} />
                            </span>
                        );
                    })
                }
                <ImageNotify initials='12' svgDetails={dynamicSvgObj} />
              
                <UserIcon initials='A' />
                    
            </div>
        </header>
    );
};

export default Header;