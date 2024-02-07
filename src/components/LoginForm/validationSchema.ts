import { object, string} from "yup";
import { REQUIRED_FIELD } from "../labels";

export const validationSchema = object({
    username: string().required(REQUIRED_FIELD), 
    email: string().email().required(REQUIRED_FIELD), 
    password: string().required(REQUIRED_FIELD),
})
