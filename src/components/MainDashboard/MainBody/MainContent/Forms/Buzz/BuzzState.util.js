export const Activity_Buzz = {
  activity: {
    elementType: "textarea",
    elementConfig: {
      type: "textarea",
      placeholder: "create Activity...",
    },
    value: "",
    label: "",
    classname: "Activity",
  },
};

export const Valuable_Buzz = {
  category: {
    elementType: "select",
    elementConfig: {
      placeholder: "type",
      options: ["Lost", "Found"],
    },
    value: "category",
    label: "Category",
    classname: "LFSelect",
  },
  item_type: {
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
    value: "item Type",
    label: "Item type",
    classname: "LFSelect",
  },
  name: {
    elementType: "input",
    elementConfig: {
      type: "text",
      placeholder: "Name",
    },
    value: "",
    label: "Your Name",
    classname: "LFInput",
  },
  
  description: {
    elementType: "textarea",
    elementConfig: {
      type: "textarea",
      placeholder: "Description..",
    },
    value: "",
    label: "item describe",
    classname: "LFTextarea",
  },
 
};

export const Buzz_category = {
  elementType: "select",
  elementConfig: {
    type: "text",
    placeholder: "Category",
    options: ["Activity", "Lost & Found"],
  },
  value: "Category",
  label: "",
  classname: "CTSelect",
};
