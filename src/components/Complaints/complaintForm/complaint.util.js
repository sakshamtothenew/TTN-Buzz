export const Complaint_Form = {
    name: {
        elementType: "input",
        elementConfig: {
            type: "text",
            placeholder: "Name",
        },
        validation: {
            required: true
        },
        value: "",
        label: "Your Name",
        classname: "LFInput",
        valid: false,
        touched: false
    },

    email: {
        elementType: "input",
        elementConfig: {
            type: "email",
            placeholder: "Enter email",
        },
        validation: {
            required: true,
            isEmail: true
        },
        value: "",
        label: "Your Email",
        classname: "LFInput",
        valid: false,
        touched: false
    },

    department: {
        elementType: "select",
        elementConfig: {
            placeholder: "Select department",
            options: ["IT", "HR", "Admin", "Transport", "Food", "Finance"],
        },
        validation: {
            required: true
        },
        value: "Select Department",
        label: "department",
        classname: "LFSelect",
        valid: false,
        touched: false
    },

    issueTitle: {
        elementType: "select",
        elementConfig: {
            placeholder: "Issue title",
            options: ["choose department first.."],
            disabled: true
        },
        value: "Select Issue-Title",
        label: "Issue Title",
        classname: "LFSelect",
        valid: false,
        touched: false
    },

    description: {
        elementType: "textarea",
        elementConfig: {
            type: "text",
            placeholder: "Description..",
        },
        validation: {
            required: true
        },
        value: "",
        label: "Your Concern",
        classname: "LFTextarea",
        valid: false,
        touched: false
    },
}