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
        "gst_newclass@odata.bind": `/gst_schoolclasses(${classLookupId})` // Column of logical name where this data insert":"use plural name of that class, which lookup is used"
    };

    Xrm.WebApi.createRecord("gst_backupstudentapplication", backupEntityData).then(
        function success(result) {
         alert("all done program to insert");
         console.log("all done program to insert" + result);
        },
        function(error) {
            console.log("all rejected");
            console.log(error.message);
        }
    );
}

// copy data
function copyName(executionContext) {
    try {
        alert("copyName also saves its backup");
        var formContext = executionContext.getFormContext();
        var primaryName = formContext.getAttribute("gst_name");
        if (primaryName != null) {
            var accountNumberFieldValue = primaryName.getValue();
            var copyName = formContext.getAttribute("gst_copyname");
            
            if (copyName != null) {
                copyName.setValue(accountNumberFieldValue);
            }
        }
        alert("Program done");
    } catch (error) {
        console.error("copy name" + error); 
    }
}













   
