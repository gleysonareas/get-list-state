import { defineNuxtPlugin } from "nuxt/app";
import { defineRule } from 'vee-validate';
import { required, email, min } from '@vee-validate/rules';


export default defineNuxtPlugin((nuxtApp) => {
  defineRule('required', value => {
    if (!value || !value.length) {
      return 'Este campo deve ser preenchido';
    }
    return true;
  });

  defineRule('minLength', (value, [limit]) => {
    // The field is empty so it should pass
    if (!value || !value.length) {
      return true;
    }
    if (value.length < limit) {
      return `Este campo deve conter pelo menos ${limit} caracteres`;
    }
    return true;
  });

  defineRule('minMax', (value, [min, max]) => {
    // The field is empty so it should pass
    if (!value || !value.length) {
      return true;
    }
    const numericValue = Number(value);
    if (numericValue < min) {
      return `Este campo deve ser preenchido com o mínimo de ${min} caracteres`;
    }
    if (numericValue > max) {
      return `Este campo deve ser preenchido com o máximo de ${max} caracteres`;
    }
    return true;
  });
});