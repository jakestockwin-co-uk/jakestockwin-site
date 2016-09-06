import React from 'react';
import { Button, Form, FormField, FormInput, FormSelect } from 'elemental';

export const Contact = React.createClass({
	getInitialState: function () {
		return ({
			name: '',
			email: '',
			phone: '',
			enquiryType: '',
			message: '',
			validationErrors: '',
			button: {
				text: 'Submit',
				disabled: false,
			},
		});
	},
	submit: function (e) {
		// Stop automatic form submission.
		e.preventDefault();
		// Update buttom text
		this.setState({ button: {
			text: 'Submitting...',
			disabled: true,
		} });

		// Generate form data from current state
		var formData = {
			action: 'contact',
			name: { full: this.state.name },
			email: this.state.email,
			phone: this.state.phone,
			enquiryType: this.state.enquiryType,
			message: this.state.message,
		};
		var self = this;
		console.log('Sending ajax', formData);
		$.ajax({
			url: '/',
			type: 'POST',
			data: formData,
			cache: false,
			success: function (jqXHR) {
				if (jqXHR.success) {
					self.setState({
						success: true,
						button: {
							text: 'Submitted',
							disabled: true,
						},
					});
				} else {
					self.setState({
						success: false,
						validationErrors: jqXHR.validationErrors,
						button: {
							text: 'Submitted',
							disabled: true,
						},
					});
				}
			},
			error: function (jqXHR) {
				self.setState({
					success: false,
					error: 'An unknown error occured.',
					button: {
						text: 'Submitted',
						disabled: true,
					},
				});
			},
		});
	},
	handleSelect: function () {
		// For some reason FormSelect requires an onChange function.
	},
	render: function () {
		var selectOptions = [
			{ value: 'website', label: 'I\'m interested in your web design services' },
			{ value: 'hosting', label: 'I\'m interested in your hosting services' },
			{ value: 'message', label: 'Just leaving a message' },
			{ value: 'question', label: 'I\'ve got a question' },
			{ value: 'other', label: 'Something else...' },
		];
		var self = this;
		function updateButton () {
			if (self.state.button.text === 'Submitted') {
				if (self.state.success) {
					self.setState({ button: {
						text: 'Submit Another',
						disabled: false,
					} });
				} else {
					self.setState({ button: {
						text: 'Submit',
						disabled: false,
					} });
				}
			}
		}
		function updateName (e) {
			console.log(e.target.value);
			self.setState({ name: e.target.value });
			updateButton();
		}
		function updateEmail (e) {
			self.setState({ email: e.target.value });
			updateButton();
		}
		function updatePhone (e) {
			self.setState({ phone: e.target.value });
			updateButton();
		}
		function updateEnquiryType (option) {
			self.setState({ enquiryType: option });
			updateButton();
		}
		function updateMessage (e) {
			self.setState({ message: e.target.value });
			updateButton();
		}

		var button;
		if (this.state.button.disabled) {
			button = <Button submit disabled>{this.state.button.text}</Button>;
		} else {
			button = <Button submit>{this.state.button.text}</Button>;
		}

		var message;
		if (this.state.success !== undefined) {
			if (this.state.success) {
				message = 'Thank you for your message, we\'ll get back to your as soon as possible.';
			} else {
				message = 'There was a problem submitting your request. Please check your inputs';
			}
		}

		return (
			<div className="col-md-8 col-md-offset-2">
				<Form className="contactForm" id="contactForm" method="post" onSubmit={this.submit}>
					<FormField label="Name" htmlFor="name" className={this.state.validationErrors.name ? 'is-invalid' : null}>
						<FormInput type="text" placeholder="Enter your name" name="name" value={this.state.name} onChange={updateName} required/>
						<div htmlFor="name" className="form-validation is-invalid">{this.state.validationErrors.name ? this.state.validationErrors.name.message : ''}</div>
					</FormField>
					<FormField label="Email" htmlFor="email" className={this.state.validationErrors.email ? 'is-invalid' : null}>
						<FormInput type="email" placeholder="Enter your email" name="email" value={this.state.email} onChange={updateEmail} required/>
						<div htmlFor="email" className="form-validation is-invalid">{this.state.validationErrors.email ? this.state.validationErrors.email.message : ''}</div>
					</FormField>
					<FormField label="Phone Number" htmlFor="phone" className={this.state.validationErrors.phone ? 'is-invalid' : null}>
						<FormInput type="phone" placeholder="Enter your phone number (optional)" name="name" value={this.state.phone} onChange={updatePhone}/>
						<div htmlFor="phone" className="form-validation is-invalid">{this.state.validationErrors.phone ? this.state.validationErrors.name.phone : ''}</div>
					</FormField>
					<FormField label="What are you contacting us about?" htmlFor="enquiryType" className={this.state.validationErrors.enquiryType ? 'is-invalid' : null}>
						<FormSelect type="select" options={selectOptions} firstOption="Select..." name="enquiryType" value={this.state.enquiryType} onChange={updateEnquiryType} required/>
						<div htmlFor="enquiryType" className="form-validation is-invalid">{this.state.validationErrors.enquiryType ? this.state.validationErrors.enquiryType.message : ''}</div>
					</FormField>
					<FormField label="Message" htmlFor="message" className={this.state.validationErrors.message ? 'is-invalid' : null}>
						<FormInput type="text" placeholder="Leave us a message..." name="message" value={this.state.message} onChange={updateMessage} multiline required/>
						<div htmlFor="message" className="form-validation is-invalid">{this.state.validationErrors.message ? this.state.validationErrors.message.message : ''}</div>
					</FormField>
					<FormField htmlFor="submit">
						{button}
						<p>{message}</p>
					</FormField>
				</Form>
			</div>
		);
	},
});

/*
 if enquirySubmitted
 h3 Thanks for getting in touch.
 else
 .row: .col-sm-8.col-md-6
 form(method='post')
 input(type='hidden', name='action', value='contact')
 .form-group(class=validationErrors.name ? 'has-error' : null)
 label Name
 input(type='text', name='name.full', value=formData['name.full']).form-control
 .form-group(class=validationErrors.email ? 'has-error' : null)
 label Email
 input(type='email', name='email', value=formData.email).form-control
 .form-group
 label Phone
 input(type='text', name='phone', value=formData.phone, placeholder='(optional)').form-control
 .form-group(class=validationErrors.enquiryType ? 'has-error' : null)
 label What are you contacting us about?
 select(name='enquiryType').form-control
 option(value='') (select one)
 each type in enquiryTypes
 option(value=type.value, selected=formData.enquiryType == type.value)= type.label
 .form-group(class=validationErrors.message ? 'has-error' : null)
 label Message
 textarea(name='message', placeholder='Leave us a message...' rows=4).form-control= formData.message
 .form-actions
 button(type='submit').btn.btn-primary Send
 */

