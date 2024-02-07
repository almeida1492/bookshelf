import { array, boolean, date, number, object, ref, string} from "yup";
import { MATCH_PASSWORD, REQUIRED_FIELD } from "../labels";

export const validationSchema = object({
    name: string().required(REQUIRED_FIELD),
    
    lastname: string().required(REQUIRED_FIELD),
    
    gender: string<'Female' | 'Male' | 'Other' >().required(REQUIRED_FIELD),
    
    maritalstatus: string<'Not married' | 'Married' | 'Common-law married' | 'Separeted' | 'Divorced' | 'Widowed'>().required(REQUIRED_FIELD), 
    
    age: number().min(18, "Must be at least 18").required(REQUIRED_FIELD),
    
    phonenumber: string().required(REQUIRED_FIELD).matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, "Must be +(XX)XXXXXXXXXX"),
    
    birthdate: date().max(new Date(), "Date of Birth cannot be in the future.") 
    .min(new Date(1900, 0, 1), "Date of Birth should be later than 1st Jan 1900.").required(REQUIRED_FIELD) ,
    
    citizenship: string().min(4,"Yoy must right your citizenship").required(REQUIRED_FIELD),
    
    linkedin: string().url().required(REQUIRED_FIELD).matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        'Enter correct url!'
    ),
    
    photo: array().required(REQUIRED_FIELD),
    
    username: string().required(REQUIRED_FIELD), 
    
    email: string().email().required(REQUIRED_FIELD),
    
    password: string().required(REQUIRED_FIELD).matches( /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"), 
    
    confirmpassword: string().required(REQUIRED_FIELD).oneOf([ref('password')], MATCH_PASSWORD),
    
    privacypolicy: boolean().oneOf([true], "Must accept terms of use"),
});

