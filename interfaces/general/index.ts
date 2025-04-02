export interface IValidateisChange {
    input: Record<string, any>;
    validStates: Record<string, boolean>;
    oldValueInput: Record<string, any>;
}