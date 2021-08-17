# Autofillform.js
I cant find how to autofill form based on url query param after submit form on the same page.

So I decide to make my own library called autofillform.js.
Lets try and create issue if you find! This extremely lightweight library for autofillform.

## How to use autofillform.js
```javascript
AutoFillForm.init();
```

### Event autofillform.js
```javascript
window.addEventListener('autofill-cancel', function (e) {
  console.log("Autofill cancel because url query param doesnt found, please submit form using form.submit()");
});

window.addEventListener('autofill-success', function (e) {
  console.log("After autofill form");
});

// And then init autofillform
AutoFillForm.init();
```
