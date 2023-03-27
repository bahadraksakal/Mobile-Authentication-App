export function passwordValidator(password) {
  if (!password) return "Şifre Boş Bırakılamaz."
  if (password.length < 5) return 'Şifreniz 5 Karekterden Uzun Olmalı!'
  return ''
}
