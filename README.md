VM Form Validator
===========

Password Srength Meter is a JavaScript password strength checker based on MooTools 1.3. It aims to provide simple, reliable password strength indications across all browsers in an unobtrusive manner. It is 100% styled by CSS and allows for custom validations. It can be used with effects or without and has an optional text component that changes with each change of state. The text defaults to 'Poor', 'Weak', 'Medium', and 'Strong'; but it can be changed according to preference or language.
You can find a [full tutorial](http://www.virtuosimedia.com/dev/javascript/mootools-plugins/password-strength-meter/password-strength-meter-tutorial), the full [API docs](http://www.virtuosimedia.com/dev/javascript/mootools-plugins/password-strength-meter/password-strength-meter-api-documentation), and [demos](http://www.virtuosimedia.com/dev/javascript/mootools-plugins/password-strength-meter/password-strength-meter-demos) at the [Virtuosi Media website](http://www.virtuosimedia.com/).

![Screenshot](https://github.com/VirtuosiMedia/Password-Strength-Meter/raw/master/password-strength-checker.png)

*Features*

* Simple out of the box
* Unobtrusive - requires no changes to existing (X)HTML markup
* Degrades gracefully
* Cross browser - tested in Internet Explorer 6+, Firefox, Safari, Opera, and Chrome
* Customizable styling - 100% CSS styling.
* 21 configurable options 
* Customizable text - The optional text can be changed according to preference or language.
* Customizable positioning - you can change which element the password meter is injected after.
* Customizable and optional effects
* 4.4kb uncompressed, 2.4kb compressed

How to use
----------

Full documentation is available either on our website or in the package download. Basic usage is as follows:

	window.addEvent('domready', function(){
		var form = new PassMeter('password');
	});