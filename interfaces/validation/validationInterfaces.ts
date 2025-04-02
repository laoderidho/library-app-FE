export interface iValidateError {
    status: number;
    _data: {
        message: Record<string, string>;
    };
}

export interface iValidationContext {
    input: Record<string, any>;
    validStates: Record<string, boolean>;
    messages: Record<string, string>;
}

export interface iValidationContextIsNULL {
    input: Record<string, any>;
    validStates: Record<string, boolean>;
    messages: Record<string, string>;
    fields: String[];
}
