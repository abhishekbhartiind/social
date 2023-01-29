import { Menu, MenuButton, MenuList } from "@chakra-ui/menu";
import { IconButton } from "@chakra-ui/button";
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
        <Menu isLazy closeOnSelect={false}>
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
