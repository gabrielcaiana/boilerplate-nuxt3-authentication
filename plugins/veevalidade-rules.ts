import { defineRule } from 'vee-validate';
import AllRules from '@vee-validate/rules';

export default defineNuxtPlugin((nuxtApp) => {
  // import all rules
  Object.keys(AllRules).forEach((rule) => {
    defineRule(rule, AllRules[rule]);
  });

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
