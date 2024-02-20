import { object, string} from "yup";
import { CAMPO_OBBLIGATORIO } from "../labels";

export const validationSchema = object({
    username: string().required(CAMPO_OBBLIGATORIO), 
    email: string().email().required(CAMPO_OBBLIGATORIO), 
    password: string().required(CAMPO_OBBLIGATORIO),
})

