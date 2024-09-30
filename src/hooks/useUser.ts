"use server";

export const adminLogin = async (username: string, password: string) => {
  try {
    const raw = JSON.stringify({
      username: username,
      password: password,
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/auth/signin`,
      {
        method: "POST",
        body: raw,
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
      }
    );
    const data = await response.text();
    return { status: response.ok, result: data };
  } catch (error) {
    console.error("Error fetching data:", error);
    //return error;
  }
};

export const userLogin = async (username: string, password: string) => {
  try {
    const raw = JSON.stringify({
      username: username,
      password: password,
    });
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      {
        method: "POST",
        body: raw,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Request failed");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    //return error;
  }
};

export const getLoginData = async (token: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/auth/login_data`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        redirect: "follow",
      }
    );
    const data = await response.json();

    return { status: response.ok, result: data };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getUsersList = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/filter?key=role&value=user&limit=20`
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
