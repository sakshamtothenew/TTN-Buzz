export const Activity_Buzz = {
  activity: {
    elementType: "textarea",
    elementConfig: {
      type: "textarea",
      placeholder: "Please Select Category First...",
      disabled: true,
    },
    validation : {
      required : true
    },
    value: "",
    label: "",
    classname: "Activity",
    valid: false,
    touched: false
  },
  
};

export const Valuable_Buzz = {
  category: {
    elementType: "select",
    elementConfig: {
      placeholder: "type",
      options: ["Lost", "Found"],
    },
    validation: {
      required: true
    },
    value: "category",
    label: "Category",
    classname: "LFSelect",
    valid: false,
    touched : false
  },
  type: {
    elementType: "select",
    elementConfig: {
      type: "text",
      placeholder: "Name",
      options: [
        "Electronics",
        "Wallets",
        "File/Doc",
        "Kid",
        "Accessory",
        "others",
      ],
    },
    validation: {
      required: true
    },
    value: "item Type",
    label: "Item type",
    classname: "LFSelect",
    valid: false,
    touched: false

  },
  email: {
    elementType: "input",
    elementConfig: {
      type: "text",
      placeholder: "Email",
    },
    validation: {
      isEmail: true,
      required: true
    },
    valid: false,
    touched: false,
    value: "",
    label: "Your Email",
    classname: "LFInput",
  },

  description: {
    elementType: "textarea",
    elementConfig: {
      type: "textarea",
      placeholder: "Description..",
    },
    validation: {
      required: true,
    },
    value: "",
    label: "item describe",
    classname: "LFTextarea",
    valid: false,
    touched: false
  },

};

export const Buzz_category = {
  elementType: "select",
  elementConfig: {
    type: "text",
    placeholder: "Category",
    options: ["Activity", "Lost & Found"],
  },
  validation: {
    required: true
  },
  value: "Category",
  label: "",
  classname: "CTSelect",
  valid: false,
  touched: false,
  formIsValid: false
};
