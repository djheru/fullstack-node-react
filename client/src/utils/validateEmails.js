const re =/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export default (emails) => {
  const invalidEmailsArray = emails
    .split(',')
    .map(email => email.trim())
    .filter(email => !!email)
    .filter(email => (re.test(email) === false || email === ''));

  if (invalidEmailsArray.length) {
    return `The following emails are invalid: ${invalidEmailsArray}`;
  }
}
