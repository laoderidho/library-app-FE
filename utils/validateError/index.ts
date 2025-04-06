import type { iValidateError, iValidationContext, iValidationContextIsNULL } from "~/interfaces/validation/validationInterfaces";

export const handleValidationErrors = (err: iValidateError, context: iValidationContext) => {
    if (err.status === 400) {
        for (const key in err._data.message) {
            console.log(key)
            if (context.input[key]) {
                // @ts-ignore
                context.input[key].$el?.querySelector('input')?.focus();
                context.validStates[key] = true;
                context.messages[key] = err._data.message[key];
            }
        }
    }
};

export const ValidateNull = (validInput: iValidationContextIsNULL): boolean => {
    let isValid = true

    validInput.fields.forEach((field) => {
        // @ts-ignore
        const isEmpty = !validInput.input[field]
        // @ts-ignore
        validInput.messages[field] = isEmpty ? "tidak boleh kosong" : "";
        // @ts-ignore
        validInput.validStates[field] = isEmpty ? true : false
        if (isEmpty) isValid = false;
    })

    return isValid
}