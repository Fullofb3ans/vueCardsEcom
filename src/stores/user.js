import { defineStore } from "pinia";
import { ref } from "vue";


export const useUserStore = defineStore('user', () => {
    const mail = ref(localStorage.getItem('mail') ? localStorage.getItem('mail') : '');
    const pass = ref(localStorage.getItem('pass') ? localStorage.getItem('pass') : '');
    const admin = ref(Boolean(localStorage.getItem('admin') ? localStorage.getItem('admin') : false));

    const logIn = (inputMail, inputpass) => {
        mail.value = inputMail;
        localStorage.setItem('mail', inputMail);
        pass.value = inputpass;
        localStorage.setItem('pass', inputpass);
        admin.value = true;
        localStorage.setItem('admin', true);
    }

    const logOut = () => {
        mail.value = '';
        localStorage.removeItem('mail');
        pass.value = '';
        localStorage.removeItem('pass');
        admin.value = false;
        localStorage.setItem('admin', false);
    }

    return { mail, pass, admin, logIn, logOut };
});