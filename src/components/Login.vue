<template>
    <div>
        <h1>Login</h1>
        <input v-model="name" type="text" placeholder="Enter your name" />
        <input v-model="pass" type="password" placeholder="Enter your password" />
        <button @click="login">Login</button>

        <div v-if="loginStatus">
            <p>{{ loginStatus }}</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: '',
            pass: '',
            loginStatus: '', // Store login status or message
        };
    },
    methods: {
        async login() {
            try {
                const requestBody = {
                    name: this.name,
                    pass: this.pass,
                };

                const response = await fetch('http://localhost:8080/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                });

                if (response.ok) {
                    // Use response.text() since we're expecting plain text, not JSON
                    const text = await response.text();
                    this.loginStatus = `Login successful! ${text}`;  // Display the plain text response
                    this.$emit('login-success'); // Emit the success event
                } else {
                    const errorText = await response.text();  // Handle error response as text
                    this.loginStatus = `Login failed: ${errorText || 'Unknown error'}`;
                }
            } catch (error) {
                this.loginStatus = `Error: ${error.message}`;
            }
        }

    },
};
</script>

<style scoped>
input {
    margin: 10px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #45a049;
}

p {
    margin-top: 20px;
    color: green;
}
</style>
