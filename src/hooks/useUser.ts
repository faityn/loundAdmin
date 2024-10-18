"use server";

import { UserInfoType } from "@/types/adminType";

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
      },
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
      },
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
      },
    );

    const data = await response.json();

    return { status: response.ok, result: data };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getUsersList = async (
  token: string,
  searchUrl: string,
  page: number,
  size: number,
) => {
  const search = searchUrl;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/list?${search}&page=${page}&pageSize=${size}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        redirect: "follow",
      },
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getUsersDetail = async (token: string, id: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/user/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        redirect: "follow",
      },
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const deleteUser = async (token: string, id: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/user/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        redirect: "follow",
      },
    );

    const data = await response.text();
    return { status: response.ok, result: data };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getSearchOptionList = async (token: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/search_options`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          locale: "mn",
        },
        redirect: "follow",
      },
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const userDetailOptionList = async (token: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/options`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        redirect: "follow",
      },
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const userExhibitionList = async (
  token: string,
  id: number,
  word: string,
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/user/exhibition/list/${id}?search=${word}&page=1&pageSize=10`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        redirect: "follow",
      },
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const userExhibitionRating = async (
  token: string,
  id: number,
  exhibition: string,
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/user/exhibition/rating/${id}/${exhibition}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        redirect: "follow",
      },
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const updateUserInfo = async (token: string, formdata: UserInfoType) => {
  const raw = JSON.stringify({
    userId: formdata?.userId,
    name: formdata?.name,
    email: formdata.email,
    phone: formdata.phone,
    birthday: formdata.birthday,
    status: formdata.status,
  });

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/user/update_info`,
      {
        method: "POST",
        body: raw,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        redirect: "follow",
      },
    );

    const data = await response.text();
    return { status: response.ok, result: data };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const updateUserProfile = async (token: string, formdata: FormData) => {
  const image: File | null = formdata.get("img") as unknown as File;
  const formData2 = new FormData();

  formData2.append("userId", formdata.get("userId") as string);
  formData2.append("gender", formdata.get("gender") as string);
  formData2.append("roleId", formdata.get("roleId") as string);
  formData2.append("professionId", formdata.get("professionId") as string);
  formData2.append("companyName", formdata.get("companyName") as string);
  formData2.append("position", formdata.get("position") as string);
  formData2.append("description", formdata.get("description") as string);

  if (image !== null) {
    formData2.append("img", image);
  }
  console.log(formData2);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/user/update_profile`,
      {
        method: "POST",
        body: formData2,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        redirect: "follow",
      },
    );

    const data = await response.text();
    return { status: response.ok, result: data };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getExhibitionOrganizerList = async (
  token: string,
  searchUrl: string,
  page: number,
  size: number,
) => {
  const search = searchUrl;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/admin_exhibitions/list?${search}&page=${page}&pageSize=${size}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        redirect: "follow",
      },
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getExhibitionOrganizerDetail = async (
  token: string,
  id: number,
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/admin_exhibition/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        redirect: "follow",
      },
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const createExhibitionOrganizer = async (
  token: string,
  formdata: FormData,
) => {
  const formData2 = new FormData();

  formData2.append("username", formdata.get("username") as string);
  formData2.append("password", formdata.get("password") as string);
  formData2.append("firstName", formdata.get("firstName") as string);
  formData2.append("companyName", formdata.get("companyName") as string);
  formData2.append("email", formdata.get("email") as string);
  formData2.append("phone", formdata.get("phone") as string);
  formData2.append("status", formdata.get("status") as string);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/admin_exhibition/create`,
      {
        method: "POST",
        body: formData2,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        redirect: "follow",
      },
    );

    const data = await response.text();
    return { status: response.ok, result: data };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const updateExhibitionOrganizer = async (
  token: string,
  formdata: FormData,
) => {
  const formData2 = new FormData();
  formData2.append("adminId", formdata.get("adminId") as string);
  // if (formdata.get("password")) {
  //   formData2.append("password", formdata.get("password") as string);
  // }

  formData2.append("firstName", formdata.get("firstName") as string);
  formData2.append("companyName", formdata.get("companyName") as string);
  formData2.append("email", formdata.get("email") as string);
  formData2.append("phone", formdata.get("phone") as string);
  formData2.append("status", formdata.get("status") as string);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/admin_exhibition/update`,
      {
        method: "POST",
        body: formData2,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        redirect: "follow",
      },
    );

    const data = await response.text();
    return { status: response.ok, result: data };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getOrganizerSearchOptionList = async (token: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/admin_exhibitions/search_options`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          locale: "mn",
        },
        redirect: "follow",
      },
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const deleteOrganizer = async (token: string, ids: string) => {
  try {
    console.log(ids);

    const raw = JSON.stringify({
      ids: ids,
    });
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/admin_exhibition/delete_multy`,
      {
        method: "POST",
        body: raw,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        redirect: "follow",
      },
    );
    console.log(response);

    const data = await response.text();
    return { status: response.ok, result: data };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
