'use client'

import { FC } from "react";
import { ButtonOrLink } from "../ui/button";

interface HeaderProps {
    loggedIn: boolean;
}

const Header: FC<HeaderProps> = ({ loggedIn }) => {
    return (
        <header className="bg-white border-b-2 border-primary h-20">
            <div className="container mx-auto">
                <div className="flex justify-between items-center py-4">
                    <div className="flex-shrink-0">
                        <div>Logo</div>
                    </div>
                    <div className="flex gap-1">
                        {loggedIn ? (
                            <>
                                <ButtonOrLink href="/profile">Profile</ButtonOrLink>
                                <ButtonOrLink>Logout</ButtonOrLink>
                            </>
                        ) : (
                            <ButtonOrLink href="/login">Login</ButtonOrLink>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export { Header }