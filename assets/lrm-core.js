var LRM = LRM ? LRM : {};

// jQuery(document).ready(
+(function($) {

	// var $formModal = $('.lrm-user-modal'),
	// 	// $formLogin = $formModal.find('.lrm-login'),
	// 	// $formSignup = $formModal.find('.lrm-signup'),
	// 	// $formForgotPassword = $formModal.find('.lrm-reset-password'),
	// 	$formModalTab = $('.lrm-switcher'),
	// 	$tabLogin = $formModalTab.children('li').eq(0).children('a'),
	// 	$tabSignup = $formModalTab.children('li').eq(1).children('a'),
		// $forgotPasswordLink = $formLogin.find('.lrm-form-bottom-message a'),
		// $backToLoginLink = $formForgotPassword.find('.lrm-form-bottom-message a'),
		var loader_html = $("#tpl-lrm-button-loader").html();

	// ### Woocommerce Section ###
	//
	// // Product single page
	// $(document).on('submit', "form.cart", signup_selected);
	// // Products list
	// $(document).on('click', ".add_to_cart_button", signup_selected);
	// // To stop adding to cart items
	// $(".add_to_cart_button").removeClass("ajax_add_to_cart");

	// ### Woocommerce Section :: END ###

	jQuery(document).on('lrm_show_signup', signup_selected);

	jQuery(document).on('lrm_show_signin', login_selected);
	jQuery(document).on('lrm_show_login', login_selected);

	setTimeout(function() {
		if ( LRM.selectors_mapping.login ) {
			jQuery(LRM.selectors_mapping.login)
			.off("click")
			.on('click', function(event){
				event.preventDefault();
				jQuery(document).trigger('lrm_show_login');
				return false;
			});
		}
		if ( LRM.selectors_mapping.register ) {
			jQuery(LRM.selectors_mapping.register)
			.off("click")
			.on('click', function(event){
					event.preventDefault();
					jQuery(document).trigger('lrm_show_signup');
					return false;
			});
		}
	}, 300);

	//jQuery("form.cart").on('submit', signup_selected);

	//open sign-up form
	$(document).on('click', '.lrm-signup', signup_selected);
	$(document).on('click', '.lrm-register', signup_selected);
	$(document).on('click', '.lrm-switch-to--register', signup_selected);

	//open login-form form
	$(document).on('click', '.lrm-signin', login_selected);
	$(document).on('click', '.lrm-login', login_selected);
	$(document).on('click', '.lrm-switch-to--login', login_selected);

	//
	$(document).on('click', '.lrm-login .lrm-form-message a,.lrm-switch-to--reset-password', function(event){
		event.preventDefault();
		forgot_password_selected(event);
	});

	//close modal
	$('.lrm-user-modal').on('click', function(event){
		if( $(event.target).is( '.lrm-user-modal' ) || $(event.target).is('.lrm-close-form') ) {
			$formModal.removeClass('is-visible');
		}
	});
	//close modal when clicking the esc keyboard button
	$(document).keyup(function(event){
    	if(event.which=='27'){
    		$formModal.removeClass('is-visible');
	    }
    });
	//
	// //switch from a tab to another
	// $formModalTab.on('click', function(event) {
	// 	event.preventDefault();
	// 	( $(event.target).hasClass( "lrm-switch-to--login" ) ) ? login_selected(event) : signup_selected(event);
	// });

	//hide or show password
	$('.hide-password').on('click', function(){
		var togglePass= $(this),
			passwordField = togglePass.parent().find('input');

		( 'password' == passwordField.attr('type') ) ? passwordField.attr('type', 'text') : passwordField.attr('type', 'password');
		( togglePass.data("hide") == togglePass.text() ) ? togglePass.text( togglePass.data("show") ) : togglePass.text( togglePass.data("hide") );
		//focus and move cursor to the end of input field
		passwordField.putCursorAtEnd();
	});
	//
	// //show forgot-password form
	// $forgotPasswordLink.on('click', function(event){
	// 	event.preventDefault();
	// 	forgot_password_selected(event);
	// });
	//
	// //back to login from the forgot-password form
	// $backToLoginLink.on('click', function(event){
	// 	event.preventDefault();
	// 	login_selected(event);
	// });

	function login_selected(event){
		if ( LRM.is_user_logged_in ) {
			return true;
		}

		$formModal = $(event.target).closest(".lrm-main");

		// var $formModal = $('.lrm-user-modal'),
		// 	  $formLogin = $formModal.find('.lrm-login'),
		// 	  $formSignup = $formModal.find('.lrm-signup'),
		// 	  $formForgotPassword = $formModal.find('.lrm-reset-password'),
		// 	  $formModalTab = $('.lrm-switcher'),
		// 	  $tabLogin = $formModalTab.children('li').eq(0).children('a'),
		// 	  $tabSignup = $formModalTab.children('li').eq(1).children('a'),
		// 	  $forgotPasswordLink = $formLogin.find('.lrm-form-bottom-message a'),
		// 	  $backToLoginLink = $formForgotPassword.find('.lrm-form-bottom-message a'),
		//
		$formModal.addClass('is-visible');
		$formModal.find('.lrm-login-section').addClass('is-selected');
		$formModal.find('.lrm-signup-section').removeClass('is-selected');
		$formModal.find('.lrm-reset-password-section').removeClass('is-selected');
		$formModal.find('.lrm-switcher').children('li').eq(0).children('a').addClass('selected');
		$formModal.find('.lrm-switcher').children('li').eq(1).children('a').removeClass('selected');

		if ( event ) {
			event.preventDefault();
		}
		return false;
	}

	function signup_selected(event){
		if ( LRM.is_user_logged_in ) {
			return true;
		}

		var $formModal = $(event.target).closest(".lrm-main");

		$formModal.addClass('is-visible');
		$formModal.find('.lrm-login-section').removeClass('is-selected');
		$formModal.find('.lrm-signup-section').addClass('is-selected');
		$formModal.find('.lrm-reset-password-section').removeClass('is-selected');
		$formModal.find('.lrm-switcher').children('li').eq(0).children('a').removeClass('selected');
		$formModal.find('.lrm-switcher').children('li').eq(1).children('a').addClass('selected');

		// $formModal.addClass('is-visible');
		// $formLogin.removeClass('is-selected');
		// $formSignup.addClass('is-selected');
		// $formForgotPassword.removeClass('is-selected');
		// $tabLogin.removeClass('selected');
		// $tabSignup.addClass('selected');

		if ( event ) {
			event.preventDefault();
		}
		return false;
	}

	function forgot_password_selected(event){
		if ( LRM.is_user_logged_in ) {
			return true;
		}
		var $formModal = $(event.target).closest(".lrm-main");

		$formModal.addClass('is-visible');
		$formModal.find('.lrm-login-section').removeClass('is-selected');
		$formModal.find('.lrm-signup-section').removeClass('is-selected');
		$formModal.find('.lrm-reset-password-section').addClass('is-selected');


		// $formLogin.removeClass('is-selected');
		// $formSignup.removeClass('is-selected');
		// $formForgotPassword.addClass('is-selected');
		return false;
	}

	$(document).on('submit', '.lrm-form', function(event){
		event.preventDefault();

		var $form = $(event.target);

		$form.find(".has-error").removeClass("has-error")
			  .next("span").removeClass("is-visible");

		$form.find("button[type='submit']").prepend(loader_html);


		$.ajax({
			type: 'POST',
			dataType: 'json',
			url: LRM.ajax_url,
			data: $form.serialize(),
			success: function(response){
				$form.find(".lrm-button-loader").remove();

				if (!response.data.for) {
					$form.find(".lrm-form-message").html(response.data.message);

					if ( !response.success ) {
						$form.find(".lrm-form-message").addClass("lrm-is-error");
					}
				} else {
					$form.find('input[name="'+response.data.for+'"]').addClass('has-error')
						  .next('span').html(response.data.message).addClass('is-visible');
					$form.find(".lrm-form-message").removeClass("lrm-is-error").html("");
				}
				if ( response.success && response.data.logged_in ) {
					LRM.is_user_logged_in = true;
					jQuery(document).trigger('lrm_user_logged_in')

					if ( LRM.reload_after_login ) {
						window.location.reload();
					}
				}

				jQuery(document).trigger('lrm_pro/maybe_refresh_recaptcha');
			}
		});
	});

	// ajaxSetup is global, but we use it to ensure JSON is valid once returned.
	$.ajaxSetup( {
		dataFilter: function( raw_response, dataType ) {
			// We only want to work with JSON
			if ( 'json' !== dataType ) {
				return raw_response;
			}

			if ( lrm_is_valid_json( raw_response ) ) {
				return raw_response;
			} else {
				// Attempt to fix the malformed JSON
				var maybe_valid_json = raw_response.match( /{"success.*}/ );

				if ( null === maybe_valid_json ) {
					console.log( 'Unable to fix malformed JSON' );
				} else if ( lrm_is_valid_json( maybe_valid_json[0] ) ) {
					console.log( 'Fixed malformed JSON. Original:' );
					console.log( raw_response );
					raw_response = maybe_valid_json[0];
				} else {
					console.log( 'Unable to fix malformed JSON' );
				}
			}

			return raw_response;
		}
	} );


	function lrm_is_valid_json ( raw_json ) {
		try {
			var json = $.parseJSON( raw_json );

			return ( json && 'object' === typeof json );
		} catch ( e ) {
			return false;
		}
	}

	/**
	 * https://code.tutsplus.com/articles/using-the-included-password-strength-meter-script-in-wordpress--wp-34736
	 *
	 * @param $pass1
	 * @param $strengthResult
	 * @returns {*}
	 */
	function checkPasswordStrength( $pass1, $strengthResult ) {
		var pass1 = $pass1.val();

		$strengthResult.removeClass( 'short bad good strong' );

		// Extend our blacklist array with those from the inputs & site data
		var blacklistArray = ["querty", "password", "132"].concat( wp.passwordStrength.userInputBlacklist() )

		// Get the password strength
		var strength = wp.passwordStrength.meter( pass1, blacklistArray, pass1 );

		// Add the strength meter results
		switch ( strength ) {

			case 2:
				$strengthResult.addClass( 'bad' ).html( LRM.l10n.password_is_bad );
				break;

			case 3:
				$strengthResult.addClass( 'good' ).html( LRM.l10n.password_is_good );
				break;

			case 4:
				$strengthResult.addClass( 'strong' ).html( LRM.l10n.password_is_strong );
				break;
			//
			// case 5:
			// 	$strengthResult.addClass( 'short' ).html( pwsL10n.mismatch );
			// 	break;

			default:
				$strengthResult.addClass( 'short' ).html( LRM.l10n.password_is_short );

		}

		//console.log( "Pass strength: ", strength );

		return strength;
	}


	// Binding to trigger checkPasswordStrength
	$( 'body' ).on( 'keyup', '#signup-password',
		  function( event ) {
			  checkPasswordStrength(
					$("#signup-password"),         // First password field
					$(".lrm-pass-strength-result")           // Strength meter
			  );
		  }
	);


})(jQuery);


//credits http://css-tricks.com/snippets/jquery/move-cursor-to-end-of-textarea-or-input/
jQuery.fn.putCursorAtEnd = function() {
	return this.each(function() {
    	// If this function exists...
    	if (this.setSelectionRange) {
      		// ... then use it (Doesn't work in IE)
      		// Double the length because Opera is inconsistent about whether a carriage return is one character or two. Sigh.
      		var len = jQuery(this).val().length * 2;
      		this.focus();
      		this.setSelectionRange(len, len);
    	} else {
    		// ... otherwise replace the contents with itself
    		// (Doesn't work in Google Chrome)
			jQuery(this).val(jQuery(this).val());
    	}
	});
};