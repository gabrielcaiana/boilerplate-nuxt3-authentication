import { defineRule } from 'vee-validate';
import { required, email, min, url } from '@vee-validate/rules';

export default defineNuxtPlugin((nuxtApp) => {
  defineRule('required', required);
  defineRule('email', email);
  defineRule('min', min);
  defineRule('url', url);

  // define custom rules
  defineRule('minMax', (value: string, [min, max]: any) => {
    // The field is empty so it should pass
    if (!value || !value.length) {
      return true;
    }
    if (value.length < min) {
      return `This field must be greater than ${min}`;
    }
    if (value.length > max) {
      return `This field must be less than ${max}`;
    }
    return true;
  });

  defineRule('confirmed', (value, [target]: any, ctx) => {
    if (value === ctx.form[target]) {
      return true;
    }
    return 'Passwords must match';
  });
});
