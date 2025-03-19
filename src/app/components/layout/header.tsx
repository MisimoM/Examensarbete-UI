'use client';

import { FC } from "react";
import { ButtonOrLink } from "../ui/button";
import { getValidAccessToken } from "@/src/lib/services/authentication/getValidAccessToken"

const Header: FC = () => {

    return (
        <header className="h-20 border-b border-primary">
            <div className="container mx-auto">
                <div className="flex justify-between items-center h-20">
                    <div className="w-72 h-full">
                        <img
                            className="h-full max-h-full w-auto object-contain"
                            src="https://github.com/MisimoM/Examensarbete-media/blob/main/Global/HallandLogo.png?raw=true"
                            alt="logo"
                            fetchPriority="high"
                            loading="lazy"
                        />
                    </div>
                    <div className="flex gap-1">
                        <ButtonOrLink href="/login">Login</ButtonOrLink>
                        <ButtonOrLink onClick={getValidAccessToken}>Get Tokens</ButtonOrLink>
                    </div>
                </div>
            </div>
        </header>
    );
};

export { Header };