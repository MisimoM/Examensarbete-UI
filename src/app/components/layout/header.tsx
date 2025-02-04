'use client';

import { FC } from "react";
import { ButtonOrLink } from "../ui/button";
import { useAuth } from "@/src/app/authContext";
import { logoutUser } from "@/src/lib/services/authentication/logoutUser";

const Header: FC = () => {
    const { isAuthenticated, user, refreshAuth } = useAuth();

    const handleLogout = async () => {
        await logoutUser();
        refreshAuth();
    };

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
                        {isAuthenticated ? (
                            <>
                                <ButtonOrLink variant="secondary" href="/profile">
                                    {user?.email || "Profile"}
                                </ButtonOrLink>
                                <ButtonOrLink onClick={handleLogout}>Logout</ButtonOrLink>
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

export { Header };