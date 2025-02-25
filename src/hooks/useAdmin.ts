"use server";

import { AdminPermittionType } from "@/types/adminType";

export const getAdminRoleList = async (token: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/admin_roles/list`,
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

export const getAdminList = async (token: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/admin_users/list`,
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

export const createAdmin = async (
  token: string,
  username: string,
  password: string,
  status: string,
  adminPermittionArray: AdminPermittionType[]
) => {
  try {
    const raw = JSON.stringify({
      username: username,
      password: password,
      status: status,
      menus: adminPermittionArray,
    });
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/admin_user/popupCreate`,
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

export const updateAdmin = async (
  token: string,
  adminId: number,
  username: string,
  password: string,
  status: string,
  adminPermittionArray: AdminPermittionType[]
) => {
  try {
    const raw =
      password !== ""
        ? JSON.stringify({
            adminId: adminId,
            username: username,
            password: password,
            status: status,
            menus: adminPermittionArray,
          })
        : JSON.stringify({
            adminId: adminId,
            username: username,
            status: status,
            menus: adminPermittionArray,
          });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/admin_user/popupUpdate`,
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

export const deleteAdmin = async (token: string, id: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/admin_user/delete/${id}`,
      {
        method: "DELETE",
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

export const getAdminDetail = async (token: string, id: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/admin_admin/${id}`,
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

export const getAdminMenu = async (token: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/admin_menus/list`,
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

export const checkRole = async (token: string, id: number) => {
  try {
    const raw = JSON.stringify({
      roleId: id,
    });
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/admin_role/check`,
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
export const deleteRole = async (token: string, id: number) => {
  try {
    const raw = JSON.stringify({
      roleId: id,
    });
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/admin_role/delete/${id}`,
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

export const getAdminMenuList = async (token: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/admin_menus/list`,
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
