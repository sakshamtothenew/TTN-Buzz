export const Activity_Buzz = {
    activity: {
        elementType: "textarea",
        elementConfig: {
            type: "textarea",
            placeholder: "create Activity"
        },
        value: "",
        label: "Your Name"
    },


}


export const Valuable_Buzz = {
    category: {
        elementType: "select",
        elementConfig: {
            placeholder: "type",
            options: ["Lost", "Found"]
        },
        value: "",
        label: "Category"
    },
    name: {
        elementType: "input",
        elementConfig: {
            type: "text",
            placeholder: "Name"
        },
        value: "",
        label: "Your Name"
    },
    description: {
        elementType: "textarea",
        elementConfig: {
            type: "textarea",
            placeholder: "Description.."
        },
        value: "",
        label: "item describe"
    },
    item_type: {
        elementType: "select",
        elementConfig: {
            type: "text",
            placeholder: "Name",
            options: ["Electronics", "Wallets", "File/Doc", "Kid", "Accessory", "others"]
        },
        value: "",
        label: "category"
    },

}


export const Buzz_category = {
    elementType : "select" ,
    elementConfig : {
        type : "text",
        placeholder : "Category",
        options : [ "Activity" , "Lost & Found" ]
    },
    value : "",
    label : "category"
}