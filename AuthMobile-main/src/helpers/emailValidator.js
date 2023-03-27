export function emailValidator(email) {
  const re = /\S+@\S+\.\S+/
  if (!email) return "Email boş bırakılamaz."
  if (!re.test(email)) return 'Hata! Girdiğiniz Email Adresi Geçersiz.'
  return ''
}