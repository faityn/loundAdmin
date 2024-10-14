"use server";

import { SearchValueType } from "@/types/adminType";

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
    console.log(response);

    const data = await response.text();
    console.log(data);
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

    console.log(response);

    const data = await response.json();

    return { status: response.ok, result: data };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getUsersList = async (
  token: string,
  searchValue: SearchValueType,
  page: number,
  size: number
) => {
  console.log(searchValue);

  //const searchTypeParam = searchValue[0]?.searchType;
  const searchType =
    searchValue[0]?.searchType !== "" ? searchValue[0]?.searchType : "all";

  const searchWord =
    searchValue[0]?.searchWord !== null
      ? `&search=${searchValue[0]?.searchWord}`
      : "";
  const startDate =
    searchValue[0]?.startDate !== null
      ? `&startDate=${searchValue[0]?.startDate}`
      : "";
  // const endDate =
  //   searchValue[0]?.endDate !== "" ? `&endDate=${searchValue[0]?.endDate}` : "";
  // const status =
  //   searchValue[0]?.status !== "" ? `&status=${searchValue[0]?.status}` : "";
  const searchUrl = `searchType=${searchType}${searchWord}${startDate}`;
  //console.log(searchUrl);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/list?${searchUrl}page=${page}&pageSize=${size}`,
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
      }
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
      }
    );
    console.log(response);

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
