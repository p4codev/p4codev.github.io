/**
 * Formulario de contacto (GitHub Pages no ejecuta PHP).
 * Valida con bootstrap-validator y abre el cliente de correo con el mensaje
 * ya redactado (mailto:). No depende de ningún servicio externo.
 */
$(function () {
    "use strict";

    var CONTACT_EMAIL = "francisco-coral@outlook.com";

    var $form = $('#contact-form');
    $form.addClass('pristine').validator({ delay: 700, disable: false });
    // El plugin marca los campos vacíos al iniciar: limpiar hasta que el usuario escriba
    $form.find('.form-group').removeClass('has-error').find('.help-block').empty();
    $form.one('input change focusout', 'input, textarea', function () { $form.removeClass('pristine'); });

    $('#contact-form').on('submit', function (e) {
        e.preventDefault();
        $form.removeClass('pristine');
        if ($(this).find('.has-error').length) { return false; }

        var name = $('#InputName').val().trim();
        var email = $('#InputEmail').val().trim();
        var subject = $('#InputSubject').val().trim();
        var message = $('#InputMessage').val().trim();
        if (!name || !email || !subject || !message) { return false; }

        var body = message + "\n\n— " + name + " (" + email + ")";
        var href = "mailto:" + CONTACT_EMAIL +
            "?subject=" + encodeURIComponent("[Portafolio] " + subject) +
            "&body=" + encodeURIComponent(body);

        window.location.href = href;

        var lang = (window.languageSwitcher && window.languageSwitcher.getCurrentLanguage()) || 'es';
        var text = lang === 'en'
            ? 'Your email client should open with the message ready to send. If it does not, write to ' + CONTACT_EMAIL + '.'
            : 'Se abrirá tu cliente de correo con el mensaje listo para enviar. Si no se abre, escríbeme a ' + CONTACT_EMAIL + '.';
        var alertBox = '<div class="alert alert-success alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + text + '</div>';
        $('#contact-form').find('.messages').html(alertBox);
        return false;
    });
});
