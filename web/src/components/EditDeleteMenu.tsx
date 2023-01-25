import { IconButton, Menu, MenuButton, MenuList } from "@chakra-ui/react";
import React from "react";
import { GiHamburgerMenu } from 'react-icons/gi';
import { DeleteMenuItem } from "./menuItems/DeleteMenuItem";
import { EditMenuItem } from "./menuItems/EditMenuItem";

interface EditDeleteMenuProps {
    id: string;
}

export const EditDeleteMenu: React.FC<EditDeleteMenuProps> = ({
    id
}) => {
    return (
        <Menu isLazy>
            <MenuButton
                as={IconButton}
                aria-label="Edit/Delete Options"
                icon={<GiHamburgerMenu />}
                variant="ghost"
            />
            <MenuList>
                <EditMenuItem id={id} />
                <DeleteMenuItem id={id} />
            </MenuList>
        </Menu>
    );
};
