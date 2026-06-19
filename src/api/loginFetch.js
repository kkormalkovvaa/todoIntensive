const loginFetch = {
  login: async () => {
    const response = await fetch(`${import.meta.env.VITE_URL}/auth/login`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
  },
};

export default loginFetch;
