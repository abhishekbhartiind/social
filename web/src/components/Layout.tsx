import React, { ReactNode } from 'react'
import { Navbar } from './Navbar';
import Wrapper, { WrapperVariant } from './Wrapper';

interface LayoutProps {
    home?: boolean
    variant?: WrapperVariant
    children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ variant, children, home }) => {
    return (
        <>
            <Navbar home={home}/>
            <Wrapper variant={variant}>
                {children}
            </Wrapper>
        </>
    );
}

export default Layout;
