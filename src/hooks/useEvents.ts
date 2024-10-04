"use server";

export const getExhibitionList = async (
  token: string,
  page: number,
  size: number
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/exhibitions/list?page=${page}&pageSize=${size}`,
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

export const createExhibition = async (
  formdata: FormData,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  checkedInterests: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  checkedPurposes: any
) => {
  const image: File | null = (formdata.get("img") as unknown) as File;
  const formData2 = new FormData();
  const token = formdata.get("token") as string;

  formData2.append("title", formdata.get("title") as string);
  formData2.append("short_desc", formdata.get("short_desc") as string);
  formData2.append("startDate", formdata.get("startDate") as string);
  formData2.append("endDate", formdata.get("endDate") as string);
  formData2.append("description", formdata.get("description") as string);
  formData2.append("status", formdata.get("status") as string);
  formData2.append("interests", JSON.stringify(checkedInterests));
  formData2.append("purposes", JSON.stringify(checkedPurposes));
  if (image !== null) {
    formData2.append("img", image);
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/exhibition/create`,
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

export const updateExhibition = async (
  formdata: FormData,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  checkedInterests: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  checkedPurposes: any
) => {
  const image: File | null = (formdata.get("img") as unknown) as File;
  const formData2 = new FormData();
  const token = formdata.get("token") as string;

  formData2.append("exhibitionId", formdata.get("exhibitionId") as string);
  formData2.append("title", formdata.get("title") as string);
  formData2.append("short_desc", formdata.get("short_desc") as string);
  formData2.append("startDate", formdata.get("startDate") as string);
  formData2.append("endDate", formdata.get("endDate") as string);
  formData2.append("description", formdata.get("description") as string);
  formData2.append("status", formdata.get("status") as string);
  formData2.append("interests", JSON.stringify(checkedInterests));
  formData2.append("purposes", JSON.stringify(checkedPurposes));
  if (image !== null) {
    formData2.append("img", image);
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/exhibition/update`,
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

export const getExhibitionDetail = async (token: string, id: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/exhibition/${id}`,
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

export const deleteExhibition = async (token: string, id: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/exhibition/delete/${id}`,
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

export const getExhibitionLecturesList = async (
  token: string,
  page: number,
  size: number
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/exhibitions/lectures/list?page=${page}&pageSize=${size}`,
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
export const createExhibitionLectures = async (formdata: FormData) => {
  const formData2 = new FormData();
  const token = formdata.get("token") as string;

  formData2.append("exhibitionId", formdata.get("exhibitionId") as string);
  formData2.append("title", formdata.get("title") as string);
  formData2.append("short_desc", formdata.get("short_desc") as string);
  formData2.append("startDate", formdata.get("startDate") as string);
  formData2.append("endDate", formdata.get("endDate") as string);
  formData2.append("description", formdata.get("description") as string);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/exhibitions/lecture/create`,
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

export const updateExhibitionLectures = async (formdata: FormData) => {
  const formData2 = new FormData();
  const token = formdata.get("token") as string;

  formData2.append("lectureId", formdata.get("lectureId") as string);
  formData2.append("exhibitionId", formdata.get("exhibitionId") as string);
  formData2.append("title", formdata.get("title") as string);
  formData2.append("short_desc", formdata.get("short_desc") as string);
  formData2.append("startDate", formdata.get("startDate") as string);
  formData2.append("endDate", formdata.get("endDate") as string);
  formData2.append("description", formdata.get("description") as string);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/exhibitions/lecture/update`,
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

export const deleteExhibitionLectures = async (token: string, id: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/exhibitions/lecture/delete/${id}`,
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

export const getExhibitionLectureDetail = async (token: string, id: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/exhibitions/lecture/${id}`,
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
export const getExhibitionAll = async (token: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/exhibitions/list`,
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

export const uploadImage = async (formdata: FormData) => {
  const image: File | null = (formdata.get("file") as unknown) as File;
  const formData2 = new FormData();
  if (image !== null) {
    formData2.append("img", image);
  }
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/image/upload`,
      {
        method: "POST",
        body: formData2,
      }
    );

    const data = await response.json();

    return { status: response.ok, result: data };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};