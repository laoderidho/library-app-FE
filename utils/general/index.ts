import type { IValidateisChange } from "~/interfaces/general";

export const changeModeInvalid = (input: IValidateisChange) => {
    for (const key in input.input) {
        if(input.input[key] !== input.oldValueInput[key]) {
            input.validStates[key] = false;
        }
    }
}
