
// function index(executionContext) {
//     alert(executionContext);
//     alert(formContext);

//     var formContext = executionContext.getFormContext();
//     if (formContext.getAttribute("gst_lastname")) {
//         var lastName = formContext.getAttribute("gst_lastname").getValue();

//         if (lastName === true) {
//             alert(lastName);
//         } else {
//             alert("The 'gst_lastname' field is empty.");
//         }
//     } else {
//         alert("The 'gst_lastname' attribute does not exist on this form.");
//     }
// }

// function getInputFirstName(executionContext) {
//     var formContext = executionContext.getFormContext();
//     const firstName = formContext.getAttribute("gst_name").getValue();
//     if (!firstName) {
//         var lastName = formContext.getControl("gst_lastname");
//         lastName.setVisible(false);
//     }
// }

// function getInputLastName(executionContext){
//     var formContext = executionContext.getFormContext();
//     const firstName = formContext.getAttribute("gst_name").getValue();
//     if (firstName === true) {
//         var lastName = formContext.getControl("gst_lastname");
//         lastName.setVisible(true);
//     }
// }

// check the first name to does not contain any special character - regular expression
function checkSpecialChars(executionContext) {
    alert("Checking for special characters...");
    var formContext = executionContext.getFormContext();
    const firstName = formContext.getAttribute("gst_name").getValue();
    alert("Entered Name: " + firstName);
    const specialChars = /[!@#$%^&*(),.?":{}|<>]/g;
    const result = specialChars.test(firstName);
    alert("Contains special characters? " + result);
    if (result) {
        formContext.ui.setFormNotification("The name contains special characters.", "ERROR", "1");
    } else {
        formContext.ui.clearFormNotification("1");
    }
}

// make new coloumn no. type, validate to only can input only number.
function inputNum(executionContext) {
    let formContext = executionContext.getFormContext();
    let inpData = formContext.getAttribute("gst_phone").getValue();
    if (/[^0-9]/.test(inpData)) {
        alert("Input contains non-numeric characters: " + inpData);
        let sanitizedInput = inpData.replace(/[^0-9]/g, '');
        formContext.getAttribute("gst_phone").setValue(sanitizedInput);
        alert("Sanitized input: " + sanitizedInput);
    }
}

// Create backup entity for a entity in power apps using js

// function makeBackupApplication(executionContext) {
//     let formContext = executionContext.getFormContext();
//     let entityId = formContext.data.entity.getId();
//     let formData = getFormData(formContext);
//     if (formData) {
//         for (let key in formData) {
//             if (formData.hasOwnProperty(key)) {
//                 let value = formData[key];
//                 alert(key + ": " + value); 
//             }
//         }
//         createSecondEntityRecord(entityId, formData);
//     } else {
//         console.error("Error: formData is not defined.");
//     }
// }

// function getFormData(formContext) {
//     let formData = {};
//     formContext.data.entity.attributes.forEach(function (attribute) {
//         if (attribute.getName() === "gst_studentclass" || typeof attribute.getName() === 'object') {
//             return; 
//         }
//         let fieldName = attribute.getName(); 
//         let fieldValue = attribute.getValue(); 
//         // here add a condition if fieldValue in any value is object then it do delete with its key and value both
//         if (fieldValue !== null && fieldValue !== undefined) {
//             formData[fieldName] = fieldValue; 
//         }
//         if (fieldName === "gst_studentclass_id" && fieldValue === formData["gst_studentclass_id"]) {
//             let lookupField = formContext.getAttribute("gst_studentclass").getValue();
//             if (lookupField !== null && lookupField !== undefined) {
//                 formData["gst_studentclass"] = lookupField; 
//             }
//         }
//     });
//     return formData; 
// }

// function createSecondEntityRecord(entityId, data) {
//     var backupEntity = {
//         "studentapplicationid@odata.bind": "/studentapplications(" + entityId + ")"
//     };
//     Object.keys(data).forEach(function (key) {
//         backupEntity[key] = data[key]; 
//     });
//     Xrm.WebApi.createRecord("gst_applicationstudent", backupEntity).then(
//         function success(result) {
//             var newId = result.id;
//             console.log("Record created successfully in the Application Student table. ID: " + newId);
//         },
//         function error(error) {
//             console.log("Error creating record in the Application Student table: " + error.message);
//         }
//     );
// }
// make new coloumn no. type, validate to only can input only number.


//Old Code
function makeBackupApplication(executionContext) {

    alert("makeBackupApplication also save its backup");
    var formContext = executionContext.getFormContext();
    var primaryName = formContext.getAttribute("gst_name").getValue();
    var lastName = formContext.getAttribute("gst_lastname").getValue();
    var applicationId = formContext.getAttribute("gst_applicationid").getValue();
    var dob = formContext.getAttribute("gst_dob").getValue();
    var phone = formContext.getAttribute("gst_phone").getValue();
    var email = formContext.getAttribute("gst_email").getValue();
    var percentageNumber = formContext.getAttribute("gst_percentagenumber").getValue();

    var studentClass = formContext.getAttribute("gst_studentclass").getValue();
    var classLookupId = studentClass[0].id.replace("{","").replace("}","");
    console.log(classLookupId);

    var transportationYesNo = formContext.getAttribute("gst_transportationyesno").getValue();
    var status = formContext.getAttribute("gst_status").getValue();


    var backupEntityData = {
        "gst_name": primaryName,
        "gst_lastname": lastName,
        "gst_applicationid": applicationId,
        "gst_dob": dob,
        "gst_phone": phone,
        "gst_email": email,
        "gst_percentagenumber": percentageNumber,
        "gst_transportationyesno": transportationYesNo,
        "gst_status": status,
        "gst_newclass@odata.bind": `/gst_schoolclasses(${classLookupId})`
    };

    Xrm.WebApi.createRecord("gst_backupstudentapplication", backupEntityData).then(
        function success(result) {
            // var newId = result.id;
            // alert(newId);
            // console.log(newId);
         alert("all done program to insert");
         console.log("all done program to insert" + result);
        },
        function(error) {
            // alert(error.message);
            console.log("all rejected");
            console.log(error.message);
        }
    );
}





// Dynamic code to insert data in a table - But working not complete
// function makeBackupApplication(executionContext) {
//     let formContext = executionContext.getFormContext();
//     //     let entityId = formContext.data.entity.getId();

//     let formData = getFormData(formContext);
//         createSecondEntityRecord(formData);
//         alert("all function going correct");
// }

function getFormData(formContext) {
    let formData = {};
    formContext.data.entity.attributes.forEach(function (attribute) {
        if (attribute.getName() === "gst_studentclass" || typeof attribute.getName() === 'object') {
            return; 
        }
        let fieldName = attribute.getName(); 
        let fieldValue = attribute.getValue(); 
        formData[fieldName] = fieldValue; 
    });
    return formData; 
}

// function createSecondEntityRecord(data) {
//     var backupEntity = {};
//     Object.keys(data).forEach(function (key) {
//         if (typeof data[key] !== 'object') {
//             backupEntity[key] = data[key]; 
//         }
//     });
//     console.log(backupEntity);
//     Xrm.WebApi.createRecord("gst_backupstudentapplication", backupEntity).then(
//         function success(result) {
//             alert("function success" +result );
//         },
//         function(error) {
//             alert("these error" + error);
//         }
//     );
// }
// Dynamic code to insert data in a table - But working not complete







   
