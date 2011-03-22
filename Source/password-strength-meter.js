/*
---
description: Checks the strength of a password and updates a password meter accordingly

license: MIT-style

authors:
- Virtuosi Media

requires:
- core/1.2.4: '*'

provides: [VMFormValidator]

...
*/
var PassMeter = new Class({
	
	Implements: [Events, Options],

	options: {
		injectAfter: null,										//The name of the form element the password meter should be injected below. Defaults to this.passField
		minLength: 6,											//Minimum password length
		maxLength: 15,											//Maximum password length
		useFx: true,											//Use the effects
		transition: Fx.Transitions.Sine.easeOut,				//The effects transition
		duration: 250,											//The duration of the effects
		containerId: 'containerId',								//The id of the containing element for the password meter
		meterId: 'meterId',										//The id of the containing element for the password meter	
		poorClass: 'poorPass',									//The class for a bad password element
		weakClass: 'weakPass',									//The class for a weak password element
		mediumClass: 'mediumPass',								//The class for a medium password element
		strongClass: 'strongPass',								//The class for a strong password element
		textId: 'textId',										//The id for the password meter text element
		useText: true,											//Use text with the meter
		poorText: 'Poor',										//The class for a bad password
		weakText: 'Weak',										//The class for a weak password
		mediumText: 'Medium',									//The class for a medium password
		strongText: 'Strong',									//The class for a strong password
		weakRegEx: '([a-z]{1}[A-Z]{1})|([A-Z]{1}[a-z]{1})[^\s]',//The regex to be passed for the password to be weak
		mediumRegEx: '[0-9]{1}',								//The regex to be passed for the password to be medium
		strongRegEx: '[^a-zA-Z0-9]{1}'							//The regex to be passed for the password to be strong		
	},

	initialize: function(passwordFieldName, options){
		this.setOptions(options);		
		this.passField = $(document.body).getElement('[name='+passwordFieldName+']');
		
		var containerId = new Element('div', { 'id': this.options.containerId });
		var meterId = new Element('div', { 'id': this.options.meterId, 'class': this.options.poorClass });
		var textId = new Element('div', { 'id': this.options.textId, 'html': this.options.poorText });
 		
		if (!this.options.injectAfter){ 
			containerId.inject(this.passField, 'after') 
		} else {
			var injectAfter = $(document.body).getElement('[name='+this.options.injectAfter+']');
			containerId.inject(injectAfter, 'after') 			
		}
		if (Browser.opera){ meterId.setStyle('overflow', 'auto'); } //Opera fix for transitions		
		meterId.inject(containerId, 'top');

		if (this.options.useText) { textId.inject(meterId, 'bottom'); }

		this.passField.addEvent('keyup', function(){
			var value = this.passField.get('value').trim();
			var weakRegEx = new RegExp(this.options.weakRegEx);
			var mediumRegEx = new RegExp(this.options.mediumRegEx);
			var strongRegEx = new RegExp(this.options.strongRegEx);

			if ((value.length >= this.options.minLength) && (value.length < this.options.maxLength) && ((weakRegEx.test(value))||(mediumRegEx.test(value))||(strongRegEx.test(value)))){ //If the password entered is in range and has met at least one of the regexes
				if (((mediumRegEx.test(value))&&(weakRegEx.test(value)))||((strongRegEx.test(value))&&(weakRegEx.test(value)))||((strongRegEx.test(value))&&(mediumRegEx.test(value)))){ //If the password entered has met at least two of the regexes
					if ((strongRegEx.test(value))&&(mediumRegEx.test(value))&&(weakRegEx.test(value))){ //If the password entered has met all of the regexes
						this.changeMeter('strong');
					} else {
						this.changeMeter('medium');
					}
				} else {
					this.changeMeter('weak');								  
				}
			} else {
				this.changeMeter('poor');
			}
		}.bind(this));
	},
	
	changeMeter: function(strength){
		if (this.options.useFx){
			var morphMeter = new Fx.Morph(this.options.meterId, {duration: this.options.duration, transition: this.options.transition}).start('.'+this.options[strength+'Class']);
		} 				
		$(this.options.meterId).setProperty('class', this.options[strength+'Class']);
		if (this.options.useText) { $(this.options.textId).setProperty('html', this.options[strength+'Text']); }
	}
});