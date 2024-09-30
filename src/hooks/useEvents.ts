"use server";

export const getExhibitionList = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products?limit=5`
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getExhibitionUsersList = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/filter?key=role&value=user&limit=10&skip=30`
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getExhibitionFeedbackList = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/filter?key=role&value=user&limit=2&skip=50`
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getBannerList = async (token: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/banners/list`,
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

export const getBannerDetail = async (token: string, id: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/banner/${id}`,
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

export const createBanner = async (formdata: FormData) => {
  const image: File | null = (formdata.get("img") as unknown) as File;
  const formData2 = new FormData();
  const token = formdata.get("token") as string;
  formData2.append("title", "Garchig 1");
  if (image !== null) {
    formData2.append("img", image);
  }
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/banner/create`,
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

export const updateBanner = async (formdata: FormData) => {
  const image: File | null = (formdata.get("img") as unknown) as File;
  const formData2 = new FormData();
  const token = formdata.get("token") as string;
  formData2.append("id", formdata.get("id") as string);
  formData2.append("title", formdata.get("title") as string);
  if (image !== null) {
    formData2.append("img", image);
  }
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/banner/update`,
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

export const deleteBanner = async (token: string, id: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/banner/delete/${id}`,
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
