import { BaseAuth } from "../shared/base-auth";
import { RegisterForm } from "./content/register-form";

export function RegisterContent() {
    return (
        <div>
            <BaseAuth direction="left" children={<RegisterForm />} type="register" />
        </div>
    )
}