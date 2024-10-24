function openInputForm(executionContext) {
    var formContext = executionContext;
    window.top.formContext = formContext
    console.log(formContext)
    // Store the form context in local storage or pass it via query string
    var pageInput = {
        pageType: "webresource",
        webresourceName: "gst_popupformhtml"
    };
    var navigationOptions = {
        target: 2,
        width: { value: 400, unit: "px" },
        height: { value: 300, unit: "px" },
        position: 1
    };
    Xrm.Navigation.navigateTo(pageInput, navigationOptions).then(
        function success() {
            console.log("Web Resource successfully opened.");
        },
        function error() {
            console.log("Error opening web resource.");
        }
    );
}