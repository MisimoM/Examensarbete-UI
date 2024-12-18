import { FC } from "react";
import { ButtonOrLink } from "../ui/button";

const Header : FC = ({}) =>
{
    return (
        <header className="bg-white border-b-2 border-primary  h-20">
            <div className="container mx-auto">
                <div className="flex justify-between items-center py-4">
                    <div className="flex-shrink-0">
                        <div>Logo</div>
                    </div>
                    <div className="flex gap-1">
                        <ButtonOrLink href="/login">Login</ButtonOrLink>
                        <ButtonOrLink variant="secondary">Knapp</ButtonOrLink>
                    </div>
                </div>
            </div>
        </header>
    )
}

export { Header }