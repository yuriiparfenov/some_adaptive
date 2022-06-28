const openFormButton = document.querySelector('.form-submit');
const closeFormButton = document.querySelector('.modal-close');
const modalForm = document.querySelector('.modal-window');
const formButtonSubmit = document.querySelector('.modal-form-submit');
const emailInput = document.getElementById('email');
const telInput = document.getElementById('phone');
const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
let emailFlag = false;

openFormButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  modalForm.classList.remove('visually-hidden');
})

closeFormButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  modalForm.classList.add('visually-hidden');
})

/* Валидация и маска ввода поля Телефон */

window.addEventListener("DOMContentLoaded", function () {
  [].forEach.call(document.querySelectorAll('.tel'), function (input) {
    var keyCode;
    function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      var pos = this.selectionStart;
      if (pos < 3) event.preventDefault();
      var matrix = "+7 (___) ___ ____",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, ""),
        new_value = matrix.replace(/[_\d]/g, function (a) {
          return i < val.length ? val.charAt(i++) || def.charAt(i) : a
        });
      i = new_value.indexOf("_");
      if (i != -1) {
        i < 5 && (i = 3);
        new_value = new_value.slice(0, i)
      }
      var reg = matrix.substr(0, this.value.length).replace(/_+/g,
        function (a) {
          return "\\d{1," + a.length + "}"
        }).replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
      if (event.type == "blur" && this.value.length < 5) this.value = ""
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false)
  });
});

/* Валидация e-mail */

function isEmailValid(value) {
 	return EMAIL_REGEXP.test(value);
}

function onInput() {
	if (isEmailValid(emailInput.value)) {
		emailInput.style.borderColor = 'green';
    emailFlag = true;
	} else {
		emailInput.style.borderColor = 'red';
	}
}

emailInput.addEventListener('input', onInput);

/* Валидация формы */

formButtonSubmit.addEventListener('click', (e) => {
  e.preventDefault();
  if (telInput.value.length === 17 && emailFlag) {
    alert('Form sucsess submit');
  }
})