let formData = '';
const userData = [];
const handleSubmit = (e) => {
    e.preventDefault();
    const email = document.getElementById('email');
    const pwd = document.getElementById('pwd');
    const emailError = validateEmail(email.value);
    const pwdError = validatePwd(pwd.value);
    document.getElementById('error').style.display = "none";
    const loader = document.getElementById('loader');
    const form = document.getElementById('form');
    if (!emailError && !pwdError) {
        //Service request to be sent to fetch userdata
        form.style.visibility = 'hidden';
        window.scrollTo(0, 0);
        loader.classList.remove('hide-loader');
        setTimeout(() => {
            //After response is received
            form.style.visibility = 'visible';
            loader.classList.add('hide-loader');
        }, 3000);
        const index = userData.findIndex(user => user.email === email.value);
        if (index >= 0 && userData[index].pwd === pwd.value) {
            setTimeout(() => window.open('../homepage/Homepage.html', '_self'), 2000);
        }
        else if (index === -1) {
            document.getElementById('error').style.display = "block";
            document.getElementById('error').innerHTML = 'This Email Id is not registered with us.Sign Up!'
        }
        else {
            document.getElementById('error').style.display = "block";
            document.getElementById('error').innerHTML = 'Username-Password combination is incorrect. Please try again';
        }
    }
}
const validateName = (value) => {
    const nameError = document.getElementById('name-error');
    if (!value.trim()) {
        nameError.innerHTML = "This is a required field";
        nameError.style.display = "block";
        return true;
    }
    else {
        nameError.style.display = "none";
        return false;
    }
}

const validateEmail = (value, exists = false) => {
    const emailError = document.getElementById('email-error');
    if (!value.trim()) {
        emailError.innerHTML = "This is a required field";
        emailError.style.display = "block";
        return true;
    }
    else if (!value.toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )) {
        emailError.innerHTML = "Please enter a valid email address.";
        emailError.style.display = "block";
        return true;
    }
    else if (exists) {
        emailError.innerHTML = "This Email Id is already registered with us. Try again.";
        emailError.style.display = "block";
        return true;
    }
    else {
        emailError.style.display = "none";
        return false;
    }
    return false;
}
const validatePwd = (value) => {
    const pwdError = document.getElementById('pwd-error');
    if (!value.trim()) {
        pwdError.innerHTML = "This is a required field";
        pwdError.style.display = "block";
        return true;
    }
    else if (value.length < 6) {
        pwdError.innerHTML = "Password should be atleast 6 characters long.";
        pwdError.style.display = "block";
        return true;
    }
    else {
        pwdError.style.display = "none";
        return false;
    }
    return false;

}
const signUp = () => {
    const loader = document.getElementById('loader');
    const form = document.getElementById('form');
    form.style.visibility = 'hidden';
    window.scrollTo(0, 0);
    loader.classList.remove('hide-loader');
    formData = form.innerHTML;
    form.innerHTML = `<div class="text-center">
    <h3>Sign Up</h3>
    </div>
    <div class="mb-3">
                <label for="nameSignUp" class="form-label">Name</label>
                <input type="text" class="form-control" id="nameSignUp" onchange="validateName(this.value)" onblur="validateName(this.value)">
                <p class="text-danger" id="name-error" style="display: none;"></p>
            </div>
    <div class="mb-3">
                <label for="emailSignUp" class="form-label">Email address</label>
                <input type="email" class="form-control" id="emailSignUp" onchange="validateEmail(this.value)" onblur="validateEmail(this.value)">
                <p class="text-danger" id="email-error" style="display: none;"></p>
            </div>
            <div class="mb-3">
                <label for="pwdSignUp" class="form-label">Password</label>
                <input type="password" class="form-control" onchange="validatePwd(this.value)" onblur="validatePwd(this.value)" id="pwdSignUp">
                <p class="text-danger" id="pwd-error" style="display: none;"></p>
            </div>
            <div class="text-end">
            <button type="button" class="btn btn-danger" onclick="saveData()">Sign Up</button>
            <button type="button" class="btn btn-outline-danger" onclick="logIn()">Log In</button>
            </div>
            </form>
            `;
    setTimeout(() => {
        form.style.visibility = 'visible';
        loader.classList.add('hide-loader');
    }, 1000);

}
const logIn = () => {
    const form = document.getElementById('form');
    form.innerHTML = formData;
    document.getElementById('error').style.display = "none";
}
const saveData = () => {
    const email = document.getElementById('emailSignUp');
    const pwd = document.getElementById('pwdSignUp');
    const name = document.getElementById('nameSignUp');

    const emailError = validateEmail(email.value);
    const pwdError = validatePwd(pwd.value);
    const nameError = validateName(name.value);
    const loader = document.getElementById('loader');
    const form = document.getElementById('form');
    if (!emailError && !pwdError && !nameError) {
        if (userData.find(user => user.email === email.value)) {
            validateEmail(email.value, true);
        } else {
            //Post data to the server
            userData.push({ name: name.value, email: email.value, pwd: pwd.value });
            form.style.visibility = 'hidden';
            window.scrollTo(0, 0);
            loader.classList.remove('hide-loader');
            form.innerHTML = formData;
            document.getElementById('error').style.display = "none";
            setTimeout(() => {
                form.style.visibility = 'visible';
                loader.classList.add('hide-loader');
            }, 1000);
        }
    }
}