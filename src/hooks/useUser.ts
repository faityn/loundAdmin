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

export const getUsersAll = async (
  token: string,
  page: number,
  size: number
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/list?page=${page}&pageSize=${size}`,
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
export const getUsersList = async (
  token: string,
  searchUrl: string,
  page: number,
  size: number
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
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getOrgUsersList = async (
  token: string,
  searchUrl: string,
  page: number,
  size: number
) => {
  const search = searchUrl;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/exhibition/list?${search}&page=${page}&pageSize=${size}`,
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

export const exhibitionUsersDeleteMulti = async (
  token: string,
  exhibitionId: number,
  userIds: string
) => {
  try {
    const raw = JSON.stringify({
      exhibitionId: exhibitionId,
      ids: userIds,
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/exhibitions/users/delete_multy`,
      {
        method: "DELETE",
        body: raw,
        headers: {
          "Content-Type": "application/json",
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
      }
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
  word: string
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
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const userExhibitionLectureList = async (
  token: string,
  id: number,
  exhibition: number,
  word: string
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/user/exhibition/lecture/${id}/${exhibition}?search=${word}&page=1&pageSize=10`,
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

export const userExhibitionConferenceList = async (
  token: string,
  id: number,
  exhibition: number,
  word: string
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/user/exhibition/conference/${id}/${exhibition}?search=${word}&page=1&pageSize=10`,
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

export const userExhibitionConferenceListOwn = async (
  token: string,
  id: number,
  exhibition: number,
  word: string
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/user/exhibition/conference_own/${id}/${exhibition}?search=${word}&page=1&pageSize=10`,
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

export const userExhibitionRating = async (
  token: string,
  id: number,
  exhibition: string
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
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const userMessageActivity = async (
  token: string,
  id: number,
  exhibition: string
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/report/${id}/${exhibition}`,
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

export const checkUsername = async (
  token: string,
  userId: number,
  username: string
) => {
  try {
    const raw = JSON.stringify({
      username: username,
      userId: userId,
    });
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/user/check_username`,
      {
        method: "POST",
        body: raw,
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

export const updateUserInfo = async (token: string, formdata: UserInfoType) => {
  const raw = JSON.stringify({
    userId: formdata?.userId,
    name: formdata?.name,
    username: formdata?.username,
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
      }
    );

    const data = await response.text();
    return { status: response.ok, result: data };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const updateUserProfile = async (token: string, formdata: FormData) => {
  const image: File | null = (formdata.get("img") as unknown) as File;
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
      }
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
  size: number
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
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getExhibitionOrganizerDetail = async (
  token: string,
  id: number
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/company/${id}`,
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

export const createExhibitionOrganizer = async (
  token: string,
  name: string
) => {
  const raw = JSON.stringify({
    name: name,
  });

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/company/create`,
      {
        method: "POST",
        body: raw,
        headers: {
          "Content-Type": "application/json",
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

export const updateExhibitionOrganizer = async (
  token: string,
  id: number,
  name: string
) => {
  const raw = JSON.stringify({
    name: name,
  });

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/company/${id}/update`,
      {
        method: "POST",
        body: raw,
        headers: {
          "Content-Type": "application/json",
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
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const deleteOrganizer = async (token: string, ids: string) => {
  try {
    const raw = JSON.stringify({
      ids: ids,
    });
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/company/delete`,
      {
        method: "DELETE",
        body: raw,
        headers: {
          "Content-Type": "application/json",
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

export const getCompanyList = async (
  token: string,
  searchUrl: string,
  page: number,
  size: number
) => {
  const search = searchUrl;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/company/list?${search}&page=${page}&pageSize=${size}`,
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

export const getCompanyAllList = async (token: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/company/list?page=1&pageSize=500`,
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
