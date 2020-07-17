export const basicInfoForm = {
    newerId: {
        elementType: "input",
        elementConfig: {
            type: "text",
            placeholder: "Newer ID",
        },
        validation: {
            required: true
        },
        value: "",
        label: "",
        classname: "LFInput",
        valid: false,
        touched: false
    },



    gender: {
        elementType: "select",
        elementConfig: {
            placeholder: "Select department",
            options: ["Male", "Female", "Other"],
        },
        validation: {
            required: true
        },
        value: "Gender",
        label: "",
        classname: "LFSelect",
        valid: false,
        touched: false
    },
    nationality: {
        elementType: "input",
        elementConfig: {
            type: "text",
            placeholder: "Nationality",
        },
        validation: {
            required: true,
            isEmail: true
        },
        value: "",
        label: "",
        classname: "LFInput",
        valid: false,
        touched: false
    },
    maritalStatus: {
        elementType: "select",
        elementConfig: {
            placeholder: "Issue title",
            options: ["Married", "Single", "Divorced", "Seperated", "Widowed"],
            disabled: true
        },
        value: "Marital Status ",
        label: "",
        classname: "LFSelect",
        valid: false,
        touched: false
    },
}

export const dobInfoForm = {
    dob: {
        elementType: "date",
        elementConfig: {
            type: "date",
            placeholder: "Estimated time",
        },
        validation: {
            required: true,
            isDate: true
        },
        value: "",
        label: "",
        classname: "Date",
        valid: false,
        touched: false
    },
    birthCountry: {
        elementType: "input",
        elementConfig: {
            type: "text",
            placeholder: "Birth country",
        },
        validation: {
            required: true,
            isEmail: true
        },
        value: "",
        label: "",
        classname: "LFInput",
        valid: false,
        touched: false
    },

    birthPlace: {
        elementType: "input",
        elementConfig: {
            type: "text",
            placeholder: "Birth Place",
        },
        validation: {
            required: true,
            isEmail: true
        },
        value: "",
        label: "",
        classname: "LFInput",
        valid: false,
        touched: false
    }
}

export const contactForm = {
    personalEmail: {
        elementType: "input",
        elementConfig: {
            type: "text",
            placeholder: "Personal Email",
        },
        validation: {
            required: true,
            isEmail: true
        },
        value: "",
        label: "",
        classname: "LFInput",
        valid: false,
        touched: false
    },
    mobileNumber: {
        elementType: "input",
        elementConfig: {
            type: "text",
            placeholder: "Contact No.",
        },
        validation: {
            required: true,
            isEmail: true
        },
        value: "",
        label: "",
        classname: "LFInput",
        valid: false,
        touched: false

    }

}